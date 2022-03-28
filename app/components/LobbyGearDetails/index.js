/**
 *
 * MyGolfersDetail
 *
 */

import React, { useEffect, useState } from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { MdStars } from 'react-icons/md';
import Layout from '../../containers/Layout';
import { getGolferDetails } from '../../containers/GolferDetails/actions';
import {
  makeSelectGolferDetails,
  makeSelectUserData,
} from '../../containers/GolferDetails/selectors';
import saga from '../../containers/GolferDetails/saga';
import eventsSaga from '../../containers/Events/saga';
import GolferImage from '../GolferImage';
import {
  fetchEventsAction,
  fetchPrivateEventsAction,
  fetchTournamentsAction,
} from '../../containers/Events/actions';
import {
  makeSelectUpcomingEvents,
  makeSelectGolferPastEvents,
  makeSelectActiveEvents,
} from '../../containers/Events/selectors';
import { getBadgeSvg, getPlayerType } from '../../utils/playerType';
import {
  checkIfMarketAccountAlreadySetup,
  cancelSaleOfBlocklete,
} from '../../utils/flow/flowConnector';
import {
  Industry,
  LevelUpGolfer,
  Parallelogram,
  ModalActionButton,
  StatsBlock,
  GolferContainer,
  GolferBackgroundImg,
  PurchaseBlock,
  SaleHistory,
  StatDifference,
} from './styled';
import PercentageMeter from '../Golfers/PurchaseCard/PercentageMeter';
import RadialBarGraph from '../RadialBarGraph';
import ChargeBar from './ChargeBar';
import ProgressCard from '../ProgressCard';
import LobbySaleModal from './LobbySaleModal';
import LobbyGiftModal from './LobbyGiftModal';
import Modal from '../Modal';
import close from '../../images/marketplace/icons-close.svg';
import GolfBall from '../../images/GolfBall.png';
import PowerIcon from '../../images/marketplace/power.svg';
import AccuracyIcon from '../../images/marketplace/accuracy.svg';
import ComposureIcon from '../../images/marketplace/focus.svg';
import StaminaIcon from '../../images/marketplace/stamina.svg';
const desktopBg =
  'https://www.blockletegames.com/images/GolfCourseBackground.png';
const desktopBgm =
  'https://www.blockletegames.com/images/Generic-Golfer-Mobile-Golfer-Details-Page.png';

function LobbyGolferDetails({ dispatch, golfer, match, user }) {
  const [openGiftModal, setOpenGiftModal] = useState(false);
  const [openSaleModal, setOpenSaleModal] = useState(false);
  const [openUnlistModal, setOpenUnlistModal] = useState(false);
  const [accountSetupMarket, setAccountSetupMarket] = useState(false);
  const [haveGolferDetails, setHaveGolferDetails] = useState(false);
  const [pageView, setPageView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [collectibleType, setCollectibleType] = useState('');
  const [playerType, setPlayerType] = useState('');

  const availableGolfers = useSelector(
    state => state.availableGolfers.availableGolfers,
  );
  const golfersInMarketplace = availableGolfers.map(g => {
    return g.tokenid;
  });
  const isGolferListed = golfersInMarketplace.includes(golfer.details.tokenid);

  useInjectSaga({ key: 'golferdetails', saga });
  useInjectSaga({ key: 'events', saga: eventsSaga });

  // console.log('golfer id?', match.params.golferId)
  useEffect(() => {
    dispatch(getGolferDetails(match.params.golferId));
    dispatch(fetchEventsAction());
    dispatch(fetchTournamentsAction());
  }, []);

  useEffect(() => {
    const checkMarketSetup = async () => {
      await checkIfMarketAccountAlreadySetup(user.flowaddress).then(status => {
        if (status) {
          setAccountSetupMarket(true);
        }
      });
    };

    checkMarketSetup();
  }, []);

  useEffect(() => {
    if (golfer.details && golfer.details.tokenid) {
      setCollectibleType(golfer.details.GolfType.class);
      setPlayerType(getPlayerType(golfer.details));
      setHaveGolferDetails(true);
    }
  }, [golfer.details]);

  useEffect(() => {
    if (user.uuid) {
      dispatch(fetchPrivateEventsAction(user.uuid));
    }
  }, [user]);

  useEffect(() => {
    if (pageView === false) {
      window.dataLayer.push({
        event: 'page view',
        page_name: 'clubhouse_golferdetails',
      });
      setPageView(true);
    }
  });

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions(),
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }
  const { width } = useWindowDimensions();

  let {
    powertotal,
    powerpeak,
    accuracytotal,
    accuracypeak,
    staminatotal,
    staminapeak,
    composuretotal,
    composurepeak,
    tokenid,
    traits,
  } = golfer.details;
  // console.log('[LobbyGolferDetails]', golfer);

  const overallScore =
    accuracytotal + composuretotal + staminatotal + powertotal;
  const potentialScore = accuracypeak + composurepeak + staminapeak + powerpeak;
  const overallPercentage = overallScore / potentialScore;

  const tokenPad = num => {
    const numStr = `${num}`;
    return numStr.padStart(5, '0');
  };

  const percentToPotential = Math.round(golfer.details.unlockedPotential * 100);

  return (
    <>
      {!haveGolferDetails && <p>loading...</p>}
      {haveGolferDetails && (
        <Layout className="overflow-hidden">
          {golfer.details && (
            <div className="flex flex-wrap overflow-hidden">
              <LobbySaleModal
                callbackClose={() => setOpenSaleModal(false)}
                tokenId={tokenid}
                onOpen={openSaleModal}
                completeSaleList={() => dispatch(getGolferDetails(tokenid))}
                golferDetails={golfer.details}
                large={width > 1024}
                background={desktopBg}
              />
              <LobbyGiftModal
                onOpen={openGiftModal}
                tokenId={tokenid}
                callbackClose={() => setOpenGiftModal(false)}
                completeGiftProcess={() => dispatch(getGolferDetails(tokenid))}
                golferDetails={golfer.details}
                large={width > 1024}
                background={desktopBg}
              />
              <Modal
                title="Unlist Your Golfer"
                onOpen={openUnlistModal}
                callbackClose={() => setOpenUnlistModal(false)}
                lobbyModal={true}
              >
                <div className="grid gap-4">
                  <div className="flex justify-between mx-5 mt-4">
                    <p className="text-dark-indigo text-2xl font-black m-0">
                      Unlist Your Golfer
                    </p>
                    <img
                      onClick={() => {
                        setOpenUnlistModal(false);
                      }}
                      src={close}
                    />
                  </div>
                  <div
                    className="w-full overflow-hidden"
                    style={{
                      backgroundImage: { desktopBg },
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                      minHeight: '300px',
                    }}
                  >
                    <img
                      src={getBadgeSvg(collectibleType)}
                      alt={`${playerType} player icon`}
                      className="ml-auto mt-5 mr-5 w-20 h-16"
                    />
                    <div className="h-2/3 mx-auto">
                      {golfer.details && (
                        <GolferImage
                          image_url={traits ? JSON.parse(traits).image_url : ''}
                          style={{ left: '100px', top: '-50px', width: '30%' }}
                        />
                      )}
                    </div>
                  </div>
                  <p
                    className={
                      width > 1024
                        ? 'font-light text-sm mx-auto mb-0'
                        : 'font-light text-sm ml-5 mr-5'
                    }
                  >
                    Please Confirm that you would like to remove your golfer
                    from the marketplace
                  </p>
                  <div className="flex flex-col items-center mb-2">
                    <ModalActionButton className="text-center m-auto">
                      <a
                        onClick={async () => {
                          return cancelSaleOfBlocklete(tokenid)
                            .then(() => {
                              window.dataLayer.push({
                                event: 'unlist golfer',
                                event_source_page: window.location.href,
                                event_version: 'v2',
                                golfer_type: collectibleType,
                                item_description: 'golfer ' + collectibleType,
                              });
                              dispatch(getGolferDetails(tokenid));
                            })
                            .then(() => {
                              setOpenUnlistModal(false);
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }}
                      >
                        <div className="inner-circle" />
                        <div className="inner-shadow" />
                        <p className="button-text text-white text-lg font-bold">
                          Confirm
                        </p>
                      </a>
                    </ModalActionButton>
                  </div>
                </div>
              </Modal>
              <div
                className="
              w-full 
              overflow-hidden 
              flex 
              flex-wrap
            "
                style={{
                  backgroundImage:
                    width > 1024
                      ? 'linear-gradient(89deg,#0e0a51 0%,rgba(58, 51, 143, 0) 65%), url(' +
                        desktopBg +
                        ')'
                      : 'url(' + desktopBgm + ')',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  height: width < 1024 ? '1030px' : '650px',
                }}
              >
                <div className="w-full h-4 xs:flex justify-between sm:hidden">
                  <Parallelogram className="bg-dark-indigo w-24 h-10 text-center">
                    <Industry className="mt-2 text-white font-bold text-lg">
                      {golfer.details.tokenid}
                    </Industry>
                  </Parallelogram>
                </div>
                <>
                  <div className="w-full flex h-full justify-between pb-10 md:grid-cols-12 grid grid-cols-1">
                    <div className="relative md:col-span-2 sm:flex flex-col items-end md:items-center col-span-1 xs:mr-4 xs:-mb-44 z-10 xs:hidden">
                      <img
                        src={getBadgeSvg(collectibleType)}
                        alt={`${playerType} player icon`}
                        className="mt-5 ml-5 w-32 h-24"
                      />
                    </div>
                    <div className="relative md:col-span-5 flex flex-col justify-end xs:justify-start items-end md:justify-center md:items-center col-span-1 xs:w-full xs:h-2/3 lg:mb-7 lg:mt-40">
                      <img
                        style={loaded ? {} : { display: 'none' }}
                        src={GolfBall}
                        alt="GolfBall"
                        onLoad={() => setLoaded(true)}
                        className="xs:m-auto xl:w-1/2 md:mr-initial"
                      />
                    </div>
                    <StatsBlock
                      className="
                        col-span-1
                        flex
                        flex-col
                        items-start
                        md:col-span-4
                        lg:col-span-4
                        sm:col-span-12
                        md:p-5
                        md:pt-10
                        "
                    >
                      <section
                        className="md:container xs:mt-6 xs:mb-4 bg-white stats"
                        aria-label="Golfer's skills and stats"
                      >
                        <div className="px-2 py-3 top-half">
                          <GolferContainer
                            className={`inline-block relative w-4/12 ${golfer.details.GolfType.class.toLowerCase()}`}
                            style={{ height: '80px', padding: '5px' }}
                          >
                            <GolferBackgroundImg className="items-start rounded-t-xl m-auto">
                              <div className="gearImgHolder">
                                <img src={GolfBall} alt="golfball" />
                              </div>
                            </GolferBackgroundImg>
                          </GolferContainer>
                          <div className="inline-block align-top w-4/12">
                            <p className="font-display text-xs mb-0">
                              Series 2
                            </p>
                            <div className="inline-block text-center font-display text-3xl font-black leading-8">
                              Golf Ball
                            </div>
                          </div>
                          {/* <div className="inline-block align-top w-4/12 font-number font-black text-center text-3xl italic float-right">
                            <RadialBarGraph percent={percentToPotential} />
                          </div> */}
                        </div>
                        <div className="text-center py-3">
                          <StatDifference>
                            <div className="uppercase">
                              Equipping this item will add
                            </div>
                            <div className="uppercase stat">
                              <img
                                src={AccuracyIcon}
                                alt="Accuracy"
                                className="inline-block"
                              />
                              +700 Accuracy
                            </div>
                            <div className="uppercase stat">
                              <img
                                src={ComposureIcon}
                                alt="Focus"
                                className="inline-block"
                              />
                              +700 Focus
                            </div>
                          </StatDifference>
                          <ChargeBar/>
                        </div>
                      </section>
                      <section className="md:p-0 md:container">
                        <PurchaseBlock className="xs:my-8 md:my-0">
                          {/* <div className="inline-block align-top">
                            <div className="text-white font-display font-black">
                              <div className="uppercase">Latest Price</div>
                              <div className="text-4xl">
                                ${golfer.details.price.toFixed(2)}
                              </div>
                            </div>
                            <div className="text-white font-display text-xs">
                              <span className="block uppercase">Owned by </span>
                              <a
                                className="text-white"
                                href="http://placeholder.it"
                              >
                                {user.username} (YOU)
                              </a>
                            </div>
                          </div> */}
                          <div className="">
                            {!isGolferListed && (
                              <button
                                type="button"
                                className="button block"
                                onClick={() => setOpenSaleModal(true)}
                              >
                                <div className="inner-circle" />
                                <div className="inner-shadow" />
                                <p className="button-text">Place For Sale</p>
                              </button>
                            )}

                            {isGolferListed && (
                              <button
                                type="button"
                                className="button block"
                                onClick={() => setOpenSaleModal(true)}
                              >
                                <div className="inner-circle" />
                                <div className="inner-shadow" />
                                <p className="button-text">Unlist Golfer</p>
                              </button>
                            )}
                            <button
                              type="button"
                              className="button gift block"
                              onClick={() => setOpenGiftModal(true)}
                            >
                              <div className="inner-circle" />
                              <div className="inner-shadow" />
                              <p className="button-text">Gift Item</p>
                            </button>
                            {/* <div className="text-center">
                              <div className="font-display text-sm text-center text-white inline-block">
                                {golfer.details.watchcount} People Watching
                              </div>
                              <div
                                className="inline-block ml-2 align-middle"
                                style={{ color: '#0ac47e' }}
                              >
                                <MdStars />
                              </div>
                            </div> */}
                          </div>
                        </PurchaseBlock>
                      </section>
                    </StatsBlock>
                  </div>
                </>
              </div>
              <div className="w-full">
                <div className="mx-auto">
                  <SaleHistory>
                    <div className="md:container md:mx-auto md:px-20 xs:px-0 xs:mx-4">
                      <h1 className="mb-8 xs:mb-6 md:mx-0 text-blueberry font-display font-black text-3xl col-span-12">
                        Sales Activity
                      </h1>

                      <div className="md:grid-cols-12 xs:grid-cols-6 grid grid-cols-2 table-border">
                        <table className="md:col-span-12 xs:col-span-6 text-left mb-10 xs:mb-6">
                          <tbody>
                            <tr className="font-display font-black">
                              <th className="py-4 xs:p-0 md:pl-0 md:col-span-2 xs:col-span-1">
                                Date
                              </th>
                              <th className="py-4 xs:p-0 md:pl-0 md:col-span-2 xs:col-span-1">
                                Token ID
                              </th>
                              <th className="py-4 xs:p-0 md:col-span-6 xs:col-span-3">
                                Sold By
                              </th>
                              <th className="py-4 xs:p-0 md:col-span-2 xs:col-span-1">
                                Price
                              </th>
                            </tr>
                            {golfer.details.saleHistory.length === 0 && (
                              <tr className="font-display no-sales">
                                <td className="py-4 xs:p-0 md:pl-0">
                                  No Sales Activity
                                </td>
                              </tr>
                            )}
                            {golfer.details.saleHistory.length > 0 && (
                              <>
                                {golfer.details.salesHistory.map(history => (
                                  <tr className="font-display">
                                    <td className="py-4 xs:p-0 md:pl-0">
                                      {history.date}
                                    </td>
                                    <td className="py-4 xs:p-0 md:pl-0">
                                      #{tokenPad(golfer.details.tokenid)}
                                    </td>
                                    <td className="py-4 xs:p-0 ">
                                      {history.owner}
                                    </td>
                                    <td className="py-4 xs:p-0 price">
                                      ${history.price}
                                    </td>
                                  </tr>
                                ))}
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </SaleHistory>
                </div>
              </div>
            </div>
          )}
        </Layout>
      )}
    </>
  );
}

LobbyGolferDetails.propTypes = {
  golfer: PropTypes.object,
  dispatch: PropTypes.func,
  match: PropTypes.object,
  activeEvents: PropTypes.array,
  golferPastEvents: PropTypes.array,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  golfer: makeSelectGolferDetails(),
  user: makeSelectUserData(),
  upcomingEvents: makeSelectUpcomingEvents(),
  activeEvents: makeSelectActiveEvents(),
  golferPastEvents: makeSelectGolferPastEvents(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LobbyGolferDetails);
