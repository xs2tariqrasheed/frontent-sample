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
  setupAccount,
  checkIfMarketAccountAlreadySetup,
  cancelSaleOfBlocklete,
} from '../../utils/flow/flowConnector';
import {
  PlayButton,
  Industry,
  GolferDetailsBackground,
  LevelUpGolfer,
  OutlinedButton,
  Parallelogram,
  Subheading,
  ModalActionButton,
  StatsBlock,
  GolferContainer,
  GolferBackgroundImg,
  PurchaseBlock,
  SaleHistory,
} from './styled';
import PercentageMeter from '../Golfers/PurchaseCard/PercentageMeter';
import LobbyProgressCard from './LobbyProgressCard/LobbyProgressCard';
import RadialBarGraph from '../RadialBarGraph';
import ProgressCard from '../ProgressCard';
import LobbySaleModal from './LobbySaleModal';
import LobbyGiftModal from './LobbyGiftModal';
import LevelUpGolferModal from './LevelUpGolferModal';
import LevelUpGolferSection from './LevelUpGolferSection';
import Modal from '../Modal';
import close from '../../images/marketplace/icons-close.svg';
const spbg =
  'https://www.blockletegames.com/images/SuperPunch-Golfer-Details-Desktop.png';
const spbgm =
  'https://www.blockletegames.com/images/SuperPunch-Golfer-Details-Mobile.png';
const ckbg =
  'https://www.blockletegames.com/images/Cryptokitties-Golfer-Details-Desktop.png';
const ckbgm =
  'https://www.blockletegames.com/images/Cryptokitties-Golfer-Details-Mobile.png';
const fndbg =
  'https://www.blockletegames.com/images/Founder-Golfer-Detail-Desktop.png';
const fndbgm =
  'https://www.blockletegames.com/images/Founder-Golfer-Details-Mobile.png';
const tommyLegend =
  'https://www.blockletegames.com/images/Tommy-Wilson-Legend-Golfer-Details-Desktop.png';
const tommyLegendm =
  'https://www.blockletegames.com/images/Tommy-Wilson-Legend-Golfer-Details-Mobile.png';
const tommyElite =
  'https://www.blockletegames.com/images/Tommy-Wilson-Elite-Golfer-Details-Desktop.png';
const tommyElitem =
  'https://www.blockletegames.com/images/Tommy-Wilson-Elite-Golfer-Details-Mobile.png';
const tommyPro =
  'https://www.blockletegames.com/images/Tommy-Wilson-Pro-Golfer-Details-Desktop.png';
const tommyProm =
  'https://www.blockletegames.com/images/Tommy-Wilson-Pro-Golfer-Details-Mobile.png';
const boyaPro =
  'https://www.blockletegames.com/images/GeorgeBoya-Pro-Desktop-Details-Page.png';
const boyaProm =
  'https://www.blockletegames.com/images/GeorgeBoya-Pro-Mobile-Details-Page.png';
const boyaElite =
  'https://www.blockletegames.com/images/GeorgeBoya-Elite-Golfer-Details-Desktop.png';
const boyaElitem =
  'https://www.blockletegames.com/images/GeorgeBoya-Elite-Golfer-Details-Mobile.png';
const boyaL1900 =
  'https://www.blockletegames.com/images/GeorgeBoya-Legend-1900-Golfer-Details-Desktop.png';
const boyaL1900m =
  'https://www.blockletegames.com/images/GeorgeBoya-Legend-1900-Golfer-Details-Mobile.png';
const boyaL1901 =
  'https://www.blockletegames.com/images/GeorgeBoya-Legend-1901-Golfer-Details-Desktop.png';
const boyaL1901m =
  'https://www.blockletegames.com/images/GeorgeBoya-Legend-1901-Golfer-Details-Mobile.png';
const rarePro =
  'https://www.blockletegames.com/images/RareDesigner-Pro-Golfer-Details-Desktop.png';
const rareProm =
  'https://www.blockletegames.com/images/RareDesigner-Pro-Golfer-Details-Mobile.png';
const rareElite =
  'https://www.blockletegames.com/images/RareDesigner-Elite-Golfer-Details-Desktop.png';
const rareElitem =
  'https://www.blockletegames.com/images/RareDesigner-Elite-Golfer-Details-Mobile.png';
const rareLegend =
  'https://www.blockletegames.com/images/RareDesigner-Legend-Golfer-Details-Desktop.png';
const rareLegendm =
  'https://www.blockletegames.com/images/RareDesigner-Legend-Golfer-Details-Mobile.png';
const season1 =
  'https://www.blockletegames.com/images/Season-1-Golfer-Details-Desktop.png';
const season1m =
  'https://www.blockletegames.com/images/Season-1-Golfer-Details-Mobile.png';
const desktopBg =
  'https://www.blockletegames.com/images/GolfCourseBackground.png';
const desktopBgm =
  'https://www.blockletegames.com/images/Generic-Golfer-Mobile-Golfer-Details-Page.png';

function LobbyGolferDetails({ dispatch, golfer, match, user }) {
  const [openGiftModal, setOpenGiftModal] = useState(false);
  const [openSaleModal, setOpenSaleModal] = useState(false);
  const [openUnlistModal, setOpenUnlistModal] = useState(false);
  const [openLevelUpModal, setOpenLevelUpModal] = useState(false);
  const [openLevelUpSection, setOpenLevelUpSection] = useState(false);
  const [accountSetupMarket, setAccountSetupMarket] = useState(false);
  const [haveGolferDetails, setHaveGolferDetails] = useState(false);
  const [pageView, setPageView] = useState(false);

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

  function determineBackground() {
    if (tokenid < 502 || (tokenid > 1239 && tokenid < 1248)) {
      return width > 834 ? fndbg : fndbgm;
    } else if (tokenid > 501 && tokenid < 1240) {
      return width > 834 ? ckbg : ckbgm;
    } else if (
      (tokenid > 1247 && tokenid < 1465) ||
      (tokenid > 1545 && tokenid < 1801)
    ) {
      return width > 834 ? season1 : season1m;
    } else if (tokenid > 1464 && tokenid < 1546) {
      return width > 834 ? spbg : spbgm;
    } else if (tokenid == 1850 || tokenid == 1851) {
      return width > 834 ? tommyLegend : tommyLegendm;
    } else if (tokenid > 1839 && tokenid < 1850) {
      return width > 834 ? tommyElite : tommyElitem;
    } else if (tokenid > 1800 && tokenid < 1840) {
      return width > 834 ? tommyPro : tommyProm;
    } else if (tokenid > 1851 && tokenid < 1890) {
      return width > 834 ? boyaPro : boyaProm;
    } else if (tokenid > 1889 && tokenid < 1900) {
      return width > 834 ? boyaElite : boyaElitem;
    } else if (tokenid == 1900) {
      return width > 834 ? boyaL1900 : boyaL1900m;
    } else if (tokenid == 1901) {
      return width > 834 ? boyaL1901 : boyaL1901m;
    } else if (tokenid > 1901 && tokenid < 1940) {
      return width > 834 ? rarePro : rareProm;
    } else if (tokenid > 1939 && tokenid < 1950) {
      return width > 834 ? rareElite : rareElitem;
    } else if (tokenid > 1949 && tokenid < 1952) {
      return width > 834 ? rareLegend : rareLegendm;
    } else {
      return width > 834 ? desktopBg : desktopBgm;
    }
  }

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
                background={determineBackground()}
              />
              <LobbyGiftModal
                onOpen={openGiftModal}
                tokenId={tokenid}
                callbackClose={() => setOpenGiftModal(false)}
                completeGiftProcess={() => dispatch(getGolferDetails(tokenid))}
                golferDetails={golfer.details}
                large={width > 1024}
                background={determineBackground()}
              />
              {/* <LevelUpGolferModal
                onOpen={openLevelUpModal}
                tokenId={tokenid}
                callbackClose={() => setOpenLevelUpModal(false)}
                completeLevelUpProcess={() =>
                  dispatch(getGolferDetails(tokenid))
                }
                golferDetails={golfer.details}
                large={width > 1024}
                background={determineBackground()}
              /> */}
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
                      backgroundImage: 'url(' + determineBackground() + ')',
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                      minHeight: '300px',
                    }}
                  >
                    <img
                      src={getBadgeSvg(collectibleType)}
                      alt={`${playerType} player icon`}
                      className={'ml-auto mt-5 mr-5 w-20 h-16'}
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
                        determineBackground() +
                        ')'
                      : 'url(' + determineBackground() + ')',
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
                    <div className="relative md:col-span-5 flex flex-col justify-end xs:justify-start items-end md:justify-center md:items-center col-span-1 xs:w-full xs:h-2/3 lg:mb-7">
                      {golfer.details && (
                        <GolferImage
                          image_url={traits ? JSON.parse(traits).image_url : ''}
                        />
                      )}
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
                              <div className="golferImgHolder">
                                <GolferImage
                                  image_url={
                                    traits ? JSON.parse(traits).image_url : ''
                                  }
                                />
                              </div>
                            </GolferBackgroundImg>
                          </GolferContainer>
                          <div className="inline-block align-top w-4/12">
                            <p className="font-display text-xs mb-0">
                              Series 2
                            </p>
                            <div className="inline-block text-center font-display text-3xl font-bold w-1/3 leading-8">
                              #{tokenPad(golfer.details.tokenid)}
                            </div>
                          </div>
                          <div className="inline-block align-top w-4/12 font-number font-black text-center text-3xl italic float-right">
                            <RadialBarGraph percent={percentToPotential} />
                          </div>
                        </div>
                        <div
                          className="text-center py-3"
                          // style={{
                          //   borderBottom: '1px solid #d8d8d8',
                          // }}
                        >
                          {openLevelUpSection && (
                            <>
                              <LevelUpGolferSection
                                onOpen={openLevelUpSection}
                                tokenId={tokenid}
                                callbackClose={() =>
                                  setOpenLevelUpSection(false)
                                }
                                completeLevelUpProcess={() =>
                                  dispatch(getGolferDetails(tokenid))
                                }
                                golferDetails={golfer.details}
                              />
                            </>
                          )}
                          {!openLevelUpSection && (
                            <>
                              <div
                                style={{
                                  borderRight: '1px solid #d8d8d8',
                                  display: 'inline-block',
                                  padding: '0 25px',
                                  width: '25%',
                                }}
                              >
                                <ProgressCard
                                  statName="Power"
                                  peak={golfer.details.powerpeak}
                                  total={golfer.details.powertotal}
                                  tierComparison={
                                    golfer.details.powerTierComparison
                                  }
                                />
                              </div>
                              <div
                                style={{
                                  borderRight: '1px solid #d8d8d8',
                                  display: 'inline-block',
                                  padding: '0 25px',
                                  width: '25%',
                                }}
                              >
                                <ProgressCard
                                  statName="Accuracy"
                                  peak={golfer.details.accuracypeak}
                                  total={golfer.details.accuracytotal}
                                  tierComparison={
                                    golfer.details.accuracyTierComparison
                                  }
                                />
                              </div>
                              <div
                                style={{
                                  borderRight: '1px solid #d8d8d8',
                                  display: 'inline-block',
                                  padding: '0 25px',
                                  width: '25%',
                                }}
                              >
                                <ProgressCard
                                  statName="Composure"
                                  peak={golfer.details.composurepeak}
                                  total={golfer.details.composuretotal}
                                  tierComparison={
                                    golfer.details.composureTierComparison
                                  }
                                />
                              </div>
                              <div
                                style={{
                                  display: 'inline-block',
                                  padding: '0 25px',
                                  width: '25%',
                                }}
                              >
                                <ProgressCard
                                  statName="Stamina"
                                  peak={golfer.details.staminapeak}
                                  total={golfer.details.staminatotal}
                                  tierComparison={
                                    golfer.details.staminaTierComparison
                                  }
                                />
                              </div>
                            </>
                          )}
                        </div>
                        {openLevelUpSection && ''}
                        {!openLevelUpSection && (
                          <div
                            style={{
                              borderTop: '1px solid #d8d8d8',
                            }}
                          >
                            <LevelUpGolfer
                              onClick={() => setOpenLevelUpSection(true)}
                              className="rounded-3xl text-center p-1 font-black font-display mx-auto my-3"
                            >
                              Level Up Golfer
                            </LevelUpGolfer>
                          </div>
                        )}
                      </section>
                      {openLevelUpSection && ''}
                      {!openLevelUpSection && (
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
                      )}
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
