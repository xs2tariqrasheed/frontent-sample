/*
 * Where a player can view a Gear's Detail
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
  makeSelectGearDetails,
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
  StatDifference,
} from './styled';
import {
  getGolferDetails,
  addToWatchList,
  removeFromWatchlist,
  getGearDetails,
} from './actions';
import P2PPurchaseBlock from './P2PPurchaseBlock';
import { loadMyWatchList } from '../Header/actions';
import { getBadgeSvg, getPlayerType } from '../../utils/playerType';
import ProgressCard from '../../components/ProgressCard';
import RadialBarGraph from '../../components/RadialBarGraph';
import GolfBall from '../../images/GolfBall.png';
import smallGolfIcon from '../../images/golfBall_2.png';
import PowerIcon from '../../images/marketplace/power.svg';
import AccuracyIcon from '../../images/marketplace/accuracy.svg';
import ComposureIcon from '../../images/marketplace/focus.svg';
import StaminaIcon from '../../images/marketplace/stamina.svg';
import WindIcon from '../../images/windSpeed.png';
import GearStyle from '../../components/GearStyle';
import ChargeProgressBar from '../../components/ChargeProgressBar';
import placeholderProfileImg from '../../images/exampleProfileImg.png';
import { PeakComposure } from '../../components/MarketplaceSidebarFilters';

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
    // props.dispatch(getGolferDetails(props.match.params.id));
    props.dispatch(getGearDetails(1));
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
  const { height, width } = useWindowDimensions();

  const collectibleType = props.golfer.details.GolfType.class;

  const renderGolferPaymentBlock = () => {
    if (props.golfer.details.forSale && props.golfer.details.price) {
      return (
        <P2PPurchaseBlock
          dispatch={props.dispatch}
          tokenId={props.golfer.details.tokenid}
          sellerFlowAddress={props.golfer.details.flowaddress}
          blockleteGolfer={props.golfer.details.itasGolfer}
          price={props.golfer.details.price.toFixed(2)}
          golferTier={collectibleType}
          width={width}
        />
      );
    }

    return <></>;
  };

  const GolferImage = JSON.parse(props.golfer.details.traits).image_url;

  const salesHistoryPlaceholder = [
    {
      date: '08/18/21',
      tokenId: '#01779',
      buyer: 'THENACHOSAMURAI',
      price: '349',
    },
    {
      date: '08/18/21',
      tokenId: '#01779',
      buyer: 'THENACHOSAMURAI',
      price: '349',
    },
    {
      date: '08/18/21',
      tokenId: '#01779',
      buyer: 'THENACHOSAMURAI',
      price: '349',
    },
  ];

  const tokenPad = num => {
    const numStr = `${num}`;
    return numStr.padStart(5, '0');
  };

  const gearDescriptors = {
    classOne: 'FOUNDER',
    classTwo: 'MODERN',
    classThree: 'DIAMOND',
  };
  console.log(props.gear, 'props.golfer11111111');
  let skills = [];
  if (
    props.gear.gear.starting_accuracy &&
    props.gear.gear.starting_accuracy !== 0 &&
    props.gear.gear.accuracy_charge
  ) {
    const skill = {};
    skill['accuracy_charge'] = props.gear.gear.accuracy_charge;
    skills.push(skill);
  }
  if (
    props.gear.gear.starting_power &&
    props.gear.gear.starting_power !== 0 &&
    props.gear.gear.power_charge
  ) {
    const skill = {};
    skill['power_charge'] = props.gear.gear.power_charge;
    skills.push(skill);
  }
  if (
    props.gear.gear.starting_composure &&
    props.gear.gear.starting_composure != 0 &&
    props.gear.gear.composure_charge
  ) {
    const skill = {};
    skill['composure_charge'] = props.gear.gear.composure_charge;
    skills.push(skill);
  }
  if (
    props.gear.gear.starting_stamina &&
    props.gear.gear.starting_stamina != 0 &&
    props.gear.gear.stamina_charge
  ) {
    const skill = {};
    skill['stamina_charge'] = props.gear.gear.stamina_charge;
    skills.push(skill);
  }
  console.log(skills, 'skills11212');
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
              {/* <img
                className="w-28"
                src={getBadgeSvg(collectibleType)}
                alt={`${playerType} player icon`}
              /> */}
            </div>
            <GolferHeader className="relative md:col-span-5 flex flex-col justify-end xs:justify-start items-end md:justify-center md:items-center col-span-1 xs:w-full lg:mb-7">
              <img
                style={loaded ? {} : { display: 'none' }}
                src={GolfBall}
                alt="GolfBall"
                onLoad={() => setLoaded(true)}
                className="xs:m-auto xl:w-1/2 md:mr-initial"
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
              {width < 1024 ? (
                <>
                  <section className="md:p-0" style={{ width: '100%' }}>
                    <PurchaseBlock
                      className="p-4 pb-4"
                      style={{ minHeight: '150px' }}
                    >
                      <div className="col-span-2 md:col-span-3 xl:col-span-2 -mb-12">
                        {renderGolferPaymentBlock()}
                      </div>
                      <div className="w-1/2 absolute top-0 right-0 flex mt-4">
                        <img
                          src={placeholderProfileImg}
                          className="w-10 h-10 mt-auto mr-1"
                        />
                        <div className="text-white inline-block ml-1">
                          <span className="block text-sm font-light text-white">
                            Owned By
                          </span>
                          <a
                            className="text-white text-sm font-bold"
                            href="http://placeholder.it"
                          >
                            {props.golfer.details.owner}
                          </a>
                        </div>
                      </div>
                    </PurchaseBlock>
                  </section>
                  <section
                    className="md:container bg-white"
                    aria-label="Golfer's skills and stats"
                    style={{ width: '100%' }}
                  >
                    <div className=" top-half w-full">
                      <div className="inline-block align-top w-3/4 ml-4 mb-4 mt-4">
                        {/* <p className="text-sm font-thin mb-0">Common (1/1000)</p> */}
                        <div className="inline-block text-center text-3xl font-black leading-8">
                          {/* Exclusive Golf Ball */}
                          {props.gear.gear.type}
                        </div>
                        <GearStyle
                          style={props.gear.gear.style}
                          descriptors={gearDescriptors}
                        />
                      </div>
                      <ChargeProgressBar gear={props.gear.gear} />
                      {/* <div className="inline-block align-top w-4/12 font-number font-black text-center text-3xl italic float-right">
                    <RadialBarGraph percent={percentToPotential} />
                  </div> */}
                    </div>
                    <div className="text-center">
                      <StatDifference
                        style={{ backgroundColor: '#f8f8f9' }}
                        className="pb-4 pt-4"
                      >
                        <div
                          className="text-lg tracking-wide font-light"
                          style={{ color: '#888888' }}
                        >
                          EQUIPPING THIS ITEM WILL ADD
                        </div>
                        <div className="flex justify-center mt-3">
                          <div className="stat mx-2 w-1/2 py-1 flex justify-center font-black text-xl bg-white">
                            <img
                              src={AccuracyIcon}
                              alt="Accuracy"
                              className="inline-block w-6"
                            />
                            {Object.values(skills[0])}
                          </div>
                          <div className="stat mx-2 w-1/2 py-1 flex justify-center font-black text-xl bg-white">
                            <img
                              src={WindIcon}
                              alt="Focus"
                              className="inline-block w-8"
                            />
                            {Object.values(skills[1])}
                          </div>
                        </div>
                      </StatDifference>
                    </div>
                  </section>
                </>
              ) : (
                <>
                  <section
                    className="md:container xs:mt-6 xs:mb-4 bg-white stats"
                    aria-label="Golfer's skills and stats"
                    style={{
                      width: '100%',
                      marginLeft: '5%',
                      marginRight: '5%',
                      borderRadius: '13px',
                    }}
                  >
                    <div className=" py-3 top-half w-full">
                      {/* <GolferContainer
                        className={`inline-block relative w-1/4 ${props.golfer.details.GolfType.class.toLowerCase()}`}
                        style={{ height: '80px', padding: '5px' }}
                      >
                        <GolferBackgroundImg className="items-start rounded-t-xl m-auto">
                          <div>
                            <img src={smallGolfIcon} alt="golfball" />
                          </div>
                        </GolferBackgroundImg>
                      </GolferContainer> */}
                      <div className="inline-block align-top w-3/4 px-2">
                        {/* <p className="text-xs font-thin mb-0">
                          Common (1/1000)
                        </p> */}
                        <div className="inline-block text-center text-2xl font-black leading-8">
                          {/* Exclusive Golf Ball */}
                          {props.gear.gear.type}
                        </div>
                        <GearStyle
                          descriptors={gearDescriptors}
                          style={props.gear.gear.style}
                        />
                      </div>
                      <ChargeProgressBar gear={props.gear.gear} />
                      {/* <div className="inline-block align-top w-4/12 font-number font-black text-center text-3xl italic float-right">
                      <RadialBarGraph percent={percentToPotential} />
                    </div> */}
                    </div>
                    <div className="text-center">
                      <StatDifference>
                        <div className="text-sm">
                          Equipping this item will add...
                        </div>
                        <div className="flex justify-center my-3">
                          <div className="stat mx-2 w-1/2 py-1 flex justify-center font-black text-xl">
                            <img
                              src={AccuracyIcon}
                              alt="Accuracy"
                              className="inline-block w-6"
                            />
                            {Object.values(skills[0])}
                          </div>
                          <div className="stat mx-2 w-1/2 py-1 flex justify-center font-black text-xl">
                            <img
                              src={WindIcon}
                              alt="Focus"
                              className="inline-block w-8"
                            />
                            {Object.values(skills[1])}
                          </div>
                        </div>
                      </StatDifference>
                    </div>
                  </section>
                  <section
                    className="md:p-0"
                    style={{
                      width: '100%',
                      marginLeft: '5%',
                      marginRight: '5%',
                      borderRadius: '13px',
                    }}
                  >
                    <PurchaseBlock
                      className="xs:my-8 md:my-0 p-4"
                      style={{ borderRadius: '13px' }}
                    >
                      <div className="col-span-2 md:col-span-3 xl:col-span-2 -mb-12">
                        {renderGolferPaymentBlock()}
                      </div>
                      <div className="inline-block">
                        <div className="flex \">
                          <img
                            src={placeholderProfileImg}
                            className="w-10 h-10 mt-auto mr-1"
                          />
                          <div className="text-white mt-10 inline-block ml-1">
                            <span className="block text-sm font-light text-white">
                              Owned By
                            </span>
                            <a
                              className="text-white text-sm font-bold"
                              href="http://placeholder.it"
                            >
                              {props.golfer.details.owner.substr(0, 8) +
                                '\u2026'}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="inline-block absolute top-16 right-6">
                        {!ownerOfTheToken && !isGolferWatched && (
                          <button
                            type="button"
                            className="lg:slim font-display font-medium text-white text-base text-center rounded-3xl watch-button"
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
                </>
              )}
            </StatsBlock>
          </div>
        </Container>

        <div>
          <div className="mx-auto">
            <SaleHistory backgroundColor={width < 1024 ? 'white' : '#f8f8f9'}>
              <div className="md:container md:mx-auto md:px-20 xs:px-0 xs:mx-4">
                <h1 className="mb-8 xs:mb-6 md:mx-0 text-blueberry font-display font-black xs:ml-4 md:ml-0 xs:text-xl md:text-3xl col-span-12">
                  Sales Activity
                </h1>

                <div className="md:grid-cols-12 xs:grid-cols-6 grid grid-cols-2 table-border">
                  <table className="md:col-span-12 xs:col-span-6 text-left mb-10 xs:mb-6">
                    <tbody>
                      <tr className="font-display font-black">
                        <th className="py-4 xs:p-0 xs:border-b-2 md:border-none md:pl-0 md:col-span-2 xs:col-span-1">
                          Date
                        </th>
                        {width > 1024 && (
                          <th className="py-4 xs:p-0 md:pl-0 md:col-span-2 xs:col-span-1">
                            Token ID
                          </th>
                        )}
                        <th className="py-4 xs:p-0 xs:border-b-2 md:border-none md:col-span-6 xs:col-span-3">
                          Buyer
                        </th>
                        <th className="py-4 xs:p-0 xs:border-b-2 md:border-none md:col-span-2 xs:col-span-1">
                          Price
                        </th>
                        {width > 1024 && (
                          <th className="py-4 xs:p-0 md:col-span-2 xs:col-span-1">
                            details
                          </th>
                        )}
                      </tr>

                      {/* {props.golfer.details.saleHistory.length === 0 && (
                        <tr className="font-display no-sales">
                          <td className="py-4 xs:p-0 md:pl-0">
                            No Sales Activity
                          </td>
                        </tr>
                      )} */}
                      {/* {props.golfer.details.saleHistory.length > 0 && ( */}
                      <>
                        {salesHistoryPlaceholder.map(history => (
                          <tr className="font-display">
                            <td className="py-4 xs:p-0 md:pl-0">
                              {history.date}
                            </td>
                            {width > 1024 && (
                              <td className="py-4 xs:p-0 md:pl-0">
                                {history.tokenId}
                              </td>
                            )}
                            <td className="py-4 xs:p-0 ">{history.buyer}</td>
                            <td className="py-4 xs:p-0 xs:font-bold  md:price">
                              ${history.price}
                            </td>
                            {width > 1024 && (
                              <td
                                className="py-4 text-xs font-light"
                                style={{ color: '#322c8f' }}
                              >
                                View on Flowscan
                              </td>
                            )}
                          </tr>
                        ))}
                      </>
                      {/* )} */}
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
  gear: makeSelectGearDetails(),
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
