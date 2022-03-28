/*
 * Where a player can view a Golfer's Detail
 *
 *
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import saga from './saga';
import {
  makeSelectGolferDetails,
  makeSelectUserData,
  makeSelectMyWatchlist,
} from './selectors';
import Layout from '../Layout';
import {
  Container,
  StatsBlock,
  SaleHistory,
  PurchaseBlock,
  GolferHeader,
  GolferBackgroundImg,
  GolferContainer,
} from './styled';
import {
  getGolferDetails,
  addToWatchList,
  removeFromWatchlist,
} from './actions';
import P2PPurchaseBlock from './P2PPurchaseBlock';
import OwnerBlock from './OwnerBlock';
import { loadMyWatchList } from '../Header/actions';
import { getBadgeSvg, getPlayerType } from '../../utils/playerType';
import ProgressCard from '../../components/ProgressCard';
import RadialBarGraph from '../../components/RadialBarGraph';

const GolferDetails = props => {
  const [ownerOfTheToken, setOwnerOfTheToken] = useState(false);
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [pageView, setPageView] = useState(false);

  const playerType = getPlayerType(props.golfer.details);

  const salesHistory = props.golfer.details.saleHistory;

  // const clubhouse = +props.match.params.clubhouse === 1;
  const isGolferWatched = !!find(props.myWatchlist, {
    tokenid: props.golfer.details.tokenid,
  });
  const overallStatPoints =
    props.golfer.details.powertotal +
    props.golfer.details.accuracytotal +
    props.golfer.details.composuretotal +
    props.golfer.details.staminatotal;

  const potentialStatPoints =
    props.golfer.details.powerpeak +
    props.golfer.details.accuracypeak +
    props.golfer.details.composurepeak +
    props.golfer.details.staminapeak;

  const percentToPotential = Math.round(
    props.golfer.details.unlockedPotential * 100,
  );

  useInjectSaga({ key: 'golferdetails', saga });

  useEffect(() => {
    props.dispatch(getGolferDetails(props.match.params.id));
    if (props.user.uuid || !props.user.uuid === '') {
      // props.dispatch(loadMyWatchList(props.user.uuid));
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (pageView === false) {
      window.dataLayer.push({
        event: 'page view',
        page_name: 'marketplace_golferDetails',
        section: 'marketplace',
      });
      setPageView(true);
    }
  });

  useEffect(() => {
    let timer1;

    async function runEventCheck() {
      props.dispatch(getGolferDetails(props.match.params.id));

      timer1 = setTimeout(() => {
        runEventCheck();
      }, 30000);
    }

    async function startBlockCheck() {
      timer1 = setTimeout(() => {
        runEventCheck();
      }, 30000);
    }

    startBlockCheck();

    return () => {
      if (timer1) {
        clearTimeout(timer1);
        timer1 = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (
      props.user.flowaddress === props.golfer.details.owner ||
      (props.golfer.details.FlowGolfersForSale &&
        props.golfer.details.FlowGolfersForSale.flowaddress ===
          props.user.flowaddress)
    ) {
      setOwnerOfTheToken(true);
    } else {
      setOwnerOfTheToken(false);
    }
  }, [props.golfer.details]);

  if (!props.golfer.details.powertotal) {
    return <div />;
  }

  const collectibleType = props.golfer.details.GolfType.class;

  const renderGolferPaymentBlock = () => {
    if (ownerOfTheToken) {
      return (
        <OwnerBlock
          dispatch={props.dispatch}
          tokenId={props.golfer.details.tokenid}
          price={props.golfer.details.price}
          flowaddress={props.user.flowaddress}
        />
      );
    }
    if (props.golfer.details.forSale && props.golfer.details.price) {
      return (
        <P2PPurchaseBlock
          dispatch={props.dispatch}
          tokenId={props.golfer.details.tokenid}
          sellerFlowAddress={props.golfer.details.flowaddress}
          blockleteGolfer={props.golfer.details.itasGolfer}
          price={props.golfer.details.price.toFixed(2)}
          golferTier={collectibleType}
        />
      );
    }

    return <></>;
  };

  const GolferImage = JSON.parse(props.golfer.details.traits).image_url;

  const tokenPad = num => {
    const numStr = `${num}`;
    return numStr.padStart(5, '0');
  };

  return (
    <Layout>
      <article className="mx-auto">
        <Container
          className="
            left-0
            top-0
            pt-12
            lg:pb-4
            xs:pb-0
            lg:px-3
            bg-green-golf-green
          "
          tokenId={props.golfer.details.tokenid}
        >
          <div className="lg:container mx-auto md:grid-cols-12 grid grid-cols-1">
            <div className="relative md:col-span-2 flex flex-col items-end md:items-center col-span-1 xs:mr-4 xs:-mb-44 z-10">
              <img
                className="w-28"
                src={getBadgeSvg(collectibleType)}
                alt={`${playerType} player icon`}
              />
            </div>
            <GolferHeader className="relative md:col-span-5 flex flex-col justify-end xs:justify-start items-end md:justify-center md:items-center col-span-1 xs:w-full lg:mb-7">
              <img
                style={loaded ? {} : { display: 'none' }}
                src={GolferImage}
                alt="Golfer"
                onLoad={() => setLoaded(true)}
                className="xs:mr-auto xl:m-auto xl:w-full md:mr-initial"
              />
            </GolferHeader>
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
                    className={`inline-block relative w-4/12 ${props.golfer.details.GolfType.class.toLowerCase()}`}
                    style={{ height: '80px', padding: '5px' }}
                  >
                    <GolferBackgroundImg className="items-start rounded-t-xl m-auto">
                      <div className="golferImgHolder">
                        <img src={GolferImage} alt="golfer" />
                      </div>
                    </GolferBackgroundImg>
                  </GolferContainer>
                  <div className="inline-block align-top w-4/12">
                    <p className="font-display text-xs mb-0">Series 2</p>
                    <div className="inline-block text-center font-display text-3xl font-bold w-1/3 leading-8">
                      #{tokenPad(props.golfer.details.tokenid)}
                    </div>
                  </div>
                  <div className="inline-block align-top w-4/12 font-number font-black text-center text-3xl italic float-right">
                    <RadialBarGraph percent={percentToPotential} />
                  </div>
                </div>
                <div className="text-center py-3">
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
                      peak={props.golfer.details.powerpeak}
                      total={props.golfer.details.powertotal}
                      tierComparison={props.golfer.details.powerTierComparison}
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
                      peak={props.golfer.details.accuracypeak}
                      total={props.golfer.details.accuracytotal}
                      tierComparison={
                        props.golfer.details.accuracyTierComparison
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
                      peak={props.golfer.details.composurepeak}
                      total={props.golfer.details.composuretotal}
                      tierComparison={
                        props.golfer.details.composureTierComparison
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
                      peak={props.golfer.details.staminapeak}
                      total={props.golfer.details.staminatotal}
                      tierComparison={
                        props.golfer.details.staminaTierComparison
                      }
                    />
                  </div>
                </div>
              </section>
              <section className="md:p-0">
                <PurchaseBlock className="xs:my-8 md:my-0 p-4">
                  <div className="col-span-2 md:col-span-3 xl:col-span-2 -mb-12">
                    {renderGolferPaymentBlock()}
                  </div>
                  <div className="text-white mt-10 font-display text-sm inline-block">
                    <span className="block">Sold by </span>
                    <a className="text-white" href="http://placeholder.it">
                      {props.golfer.details.owner}
                    </a>
                  </div>
                  <div className="mt-8 inline-block float-right">
                    {!ownerOfTheToken && !isGolferWatched && (
                      <button
                        type="button"
                        className="lg:slim mb-2 font-display font-medium text-white text-base text-center rounded-3xl watch-button"
                        onClick={() => {
                          if (!props.user.uuid || props.user.uuid === '') {
                            props.history.push('/signin');
                          } else {
                            props.dispatch(
                              addToWatchList({
                                userId: props.user.uuid,
                                tokenId: props.golfer.details.tokenid,
                                golfer: props.golfer.details,
                              }),
                            );
                            setAddedToWatchlist(true);
                          }
                        }}
                      >
                        Watch
                      </button>
                    )}

                    {!ownerOfTheToken && isGolferWatched && (
                      <button
                        type="button"
                        className="lg:slim mb-2 font-display font-medium text-white text-base text-center rounded-3xl watch-button"
                        onClick={() => {
                          if (!props.user.uuid || props.user.uuid === '') {
                            props.history.push('/signin');
                          } else {
                            props.dispatch(
                              removeFromWatchlist({
                                userId: props.user.uuid,
                                tokenId: props.golfer.details.tokenid,
                                golfer: props.golfer.details,
                              }),
                            );
                            setAddedToWatchlist(false);
                          }
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </PurchaseBlock>
              </section>
            </StatsBlock>
          </div>
        </Container>

        <div>
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
                      {props.golfer.details.saleHistory.length === 0 && (
                        <tr className="font-display no-sales">
                          <td className="py-4 xs:p-0 md:pl-0">
                            No Sales Activity
                          </td>
                        </tr>
                      )}
                      {props.golfer.details.saleHistory.length > 0 && (
                        <>
                          {salesHistory.map(history => (
                            <tr className="font-display">
                              <td className="py-4 xs:p-0 md:pl-0">
                                {history.date}
                              </td>
                              <td className="py-4 xs:p-0 md:pl-0">
                                #{tokenPad(props.golfer.details.tokenid)}
                              </td>
                              <td className="py-4 xs:p-0 ">{history.owner}</td>
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
      </article>
    </Layout>
  );
};

GolferDetails.propTypes = {
  golfer: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.any,
  match: PropTypes.any,
  // eslint-disable-next-line react/no-unused-prop-types
  onClick: PropTypes.func,
  myWatchlist: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  golfer: makeSelectGolferDetails(),
  user: makeSelectUserData(),
  myWatchlist: makeSelectMyWatchlist(),
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

export default compose(withConnect)(GolferDetails);
