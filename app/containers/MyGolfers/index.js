/*
 * Where a player can view their golfers
 *
 * This is my golfer's page.
 *
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PracticeModal from 'components/PracticeModal';
import { useInjectSaga } from 'utils/injectSaga';
import Layout from '../Layout';
import { ClearGolferDetails, loadBlockletesForSale } from './actions';
import ClubhouseCard from 'components/Golfers/ClubhouseCard';
import PurchaseCard from 'components/Golfers/PurchaseCard/Loadable';
import { MarketplaceContainer, MobileFilter } from '../Marketplace/styled';
import { CardTypeToggle } from './styled';
import Sorting from 'components/MarketplaceSorting/Sorting';
import FilterSidebar from 'containers/Marketplace/FilterSidebar';
import saga from './saga';
import filterIcon from 'images/marketplace/icons-filter.svg';
import ChargedCard from '../../components/Golfers/ChargedCard';
import GearCard from '../../components/GearCard';

import { sortGolfers, updateCurrentFilters, updateFilteredGolfers } from './actions';
import { Dropdown } from 'react-bootstrap';
import { loadMyGolfers, loadMyGear } from '../Header/actions';

const headerImg = 'https://www.blockletegames.com/images/Clubhouse.png';
const headerImgMob = 'https://www.blockletegames.com/images/Clubhouse_mobile.png';

const MyGolfers = props => {
  useInjectSaga({ key: 'clubhousePage', saga });

  const [openPracticeModal, setOpenPracticeModal] = useState(false);
  const [tokenNumber, setTokenNumber] = useState(0);
  const [filterState, changeFilter] = useState('View All');
  const [desktopFullView, setDesktopFullView] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterSidebarChanged, setFilterSidebarChanged]  = useState(false);
  const [cardTypeActive, setCardTypeActive] = useState('golfers');
  const [listedGolfers, setListedGolfers] = useState([])
  const [userListedGolfers, setUserListedGolfers] = useState([]);

  const [isActive, setActive] = useState([1, 0, 0, 0, 0]);

  useEffect(() => {
    console.log('golfers?', props.updatedGolfers)
  }, [props.updatedGolfers])

  const changeFilterFunc = event => {
    const key = event.target.value;
    console.log('[MyGoflers - Desktop Input Selected]', key, event);
    props.dispatch(sortGolfers({ currentArray: filteredGolfers, sortBy: key }));
    changeFilter(event.currentTarget.textContent);
  };

  useEffect(() => {
    props.dispatch(loadMyGolfers(props.flowaddress));
    props.dispatch(loadMyGear(props.flowaddress));
  }, [props.flowaddress]);

  useEffect(() => {
    props.dispatch(ClearGolferDetails());
    props.dispatch(updateFilteredGolfers([]));
    props.dispatch(loadBlockletesForSale());
  }, []);

  const filteredGolfers = props.updatedGolfers;

  useEffect(() => {
    const tokenArray = [];
    for(let i = 0; i < props.availableGolfers.length; i ++) {
      tokenArray.push(i.tokenid)
    }
    setListedGolfers(tokenArray);
  }, [props.availableGolfers])

  useEffect(() => {
    const finalArray = [];
    if(listedGolfers.length > 1 && props.updatedGolfers) {
      for(let i = 0; i < listedGolfers.length; i ++) {
        for(let j = 0; j < props.updatedGolfers.length; j ++) {
          if(i === j.golfer.tokenid) {
            finalArray.push(j);
          }
        }
      }
    }
    setUserListedGolfers(finalArray)
  }, [listedGolfers])

  useEffect(() => {
    console.log('users listed golfers', userListedGolfers)
  }, [userListedGolfers])

  useEffect(() => {
    if ((!filteredGolfers || !filteredGolfers.length) && isActive[0]) {
      console.log('filteredGolfers does not exist', filteredGolfers);
      props.dispatch(updateCurrentFilters({ pageLoad: true }));
    }
    else {
      console.log('filteredGolfers exists!', filteredGolfers);
    }
  }, [props.myGolferArray]);


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

  console.log(props.myGearArray)

  return (
    <Layout>
      <PracticeModal
        onOpen={openPracticeModal}
        callbackClose={() => setOpenPracticeModal(false)}
        tokenId={tokenNumber}
        demo={false}
      />
      <MarketplaceContainer className="mx-0 md:pt-0 mb-20">
        <div className="mx-auto md:relative">
          <div
            className="flex justify-start lg:flex-col xs:h-1/2 text-white md:pl-20 xs:pl-5 mb-5"
            style={{
              backgroundImage:
                width > 768 ? `url(${headerImg})` : `url(${headerImgMob})`,
              backgroundSize: 'auto',
              backgroundPosition: 'center',
              height: width > 768 ? `480px` : `auto`,
            }}
          >
            <h1 className="z-10 relative text-white md:text-6xl xs:text-3xl md:mt-60 xs:mt-32 tracking-wide">
              Golfer Clubhouse
            </h1>
            <p className="text-xl md:mb-48 md:inline xs:hidden">
              Manage, play, and level up your golfers!
            </p>
          </div>
          <div className="container flex">
            <FilterSidebar
              className={desktopFullView ? "hidden w-0 h-0" : "lg:w-1/4 xl:w-1/4 hidden xl:block lg:block xl:block xxl:block"}
              filterOpen={filterOpen}
              setFilterOpen={setFilterOpen}
              desktopFullView={desktopFullView}
              setDesktopFullView={setDesktopFullView}
              setFilterSidebarChanged={setFilterSidebarChanged}
              cardType={cardTypeActive}
            />
            <div className="w-full overflow-hidden" style={{ display: filterOpen ? 'block' : 'none' }}>
              <FilterSidebar
                filterOpen={filterOpen}
                setFilterOpen={setFilterOpen}
                desktopFullView={desktopFullView}
                setDesktopFullView={setDesktopFullView}
                setFilterSidebarChanged={setFilterSidebarChanged}
                cardType={cardTypeActive}
              />
            </div>
            <div className={desktopFullView ? "w-full overflow-hidden" : "w-full overflow-hidden lg:w-3/4 xl:w-3/4"}>
              <div style={{ display: filterOpen ? 'none' : 'block' }}>
                <nav>
                  <div className="xs:container xs:m-auto relative lg:p-3 flex flex-col lg:flex-row lg:justify-between lg:items-end">
                    {desktopFullView  && (
                      <FilterTab className="w-1/6 mr-0 flex justify-center cursor-pointer"
                        onClick={() => setDesktopFullView(!desktopFullView)}
                      >
                        <img className='w-8 h-4 mt-auto mb-auto' src={filter} />
                        <p className=" text-dark-indigo mb-0 text-center my-auto mx-2">
                          Filters
                        </p>
                      </FilterTab>
                    )}
                    <div
                      className="w-full flex justify-between lg:px-5 pt-3"
                      style={{ display: filterOpen ? 'none' : 'block' }}
                    >
                      <div className="w-full flex justify-between items-center">
                        <div className='flex justify-center w-full'>
                        <CardTypeToggle
                            className={`
                              ${cardTypeActive === 'golfers' ? 'text-dark-indigo' : 'text-grey'} 
                              ${cardTypeActive === 'golfers' && 'border-b-4 border-dark-indigo'}
                              font-black
                              cursor-pointer
                              text-lg
                              mx-3
                            `}
                            onClick={() => setCardTypeActive('golfers')}
                          >
                            Golfers
                          </CardTypeToggle>
                          <CardTypeToggle
                            className={`
                              ${cardTypeActive === 'gear' ? 'text-dark-indigo' : 'text-grey'} 
                              ${cardTypeActive === 'gear' && 'border-b-4 border-dark-indigo'}
                              font-black
                              cursor-pointer
                              text-lg
                              mx-3
                            `}
                            onClick={() => setCardTypeActive('gear')}
                          >
                            Gear
                          </CardTypeToggle>
                          <CardTypeToggle
                            className={`
                              ${cardTypeActive === 'proShopGear' ? 'text-dark-indigo' : 'text-grey'} 
                              ${cardTypeActive === 'proShopGear' && 'border-b-4 border-dark-indigo'}
                              font-black
                              cursor-pointer
                              text-lg
                              mx-3
                            `}
                            onClick={() => setCardTypeActive('proShopGear')}
                          >
                           Pro Shop Gear
                          </CardTypeToggle>
                          <CardTypeToggle
                            className={`
                              ${cardTypeActive === 'listedGolfers' ? 'text-dark-indigo' : 'text-grey'} 
                              ${cardTypeActive === 'listedGolfers' && 'border-b-4 border-dark-indigo'}
                              font-black
                              cursor-pointer
                              text-lg
                              mx-3
                            `}
                            onClick={() => setCardTypeActive('listedGolfers')}
                          >
                            Listed Golfers
                          </CardTypeToggle>
                          <CardTypeToggle
                            className={`
                              ${cardTypeActive === 'listedGear' ? 'text-dark-indigo' : 'text-grey'} 
                              ${cardTypeActive === 'listedGear' && 'border-b-4 border-dark-indigo'}
                              font-black 
                              cursor-pointer
                              text-lg
                              mx-3
                            `}
                            onClick={() => setCardTypeActive('listedGear')}
                          >
                            Listed Gear
                          </CardTypeToggle>
                        </div>
                        <div className="flex rounded-lg border-2 lg:w-60 w-32 bg-white">
                          <Sorting />
                        </div>
                      </div>
                      <MobileFilter className="my-5 lg:hidden">
                        <button
                          type="submit"
                          className="cursor-pointer"
                          onClick={() => setFilterOpen(true)}
                        >
                          <img
                            className="my-0 inline text-white"
                            src={filterIcon}
                            alt="list icon"
                          />
                        </button>
                      </MobileFilter>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="z-10 relative md:mx-5 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-sm gap-y-sm">
              {cardTypeActive === 'gear' && props.myGearArray.map((gear, i) => {
                return gear.stable === true ? 
                  <GearCard clubhouseGear gear={gear} key={gear.tokenid ? gear.tokenid : i} />
                  : <ChargedCard clubhouseGear gear={gear} key={gear.tokenid ? gear.tokenid : i}/>
              })}
              {cardTypeActive === 'golfers' && props.updatedGolfers
                .map((golfer, i) => (
                  <PurchaseCard
                    playerGolfer
                    key={golfer.tokenid ? golfer.tokenid : i}
                    onClick={() => {
                      props.history.push(`/golfer-details/1/${golfer.tokenid}`);
                    }}
                    parentPushCallback={() => {
                      props.history.push(`/golfer-details/1/${golfer.tokenid}`);
                    }}
                    practiceCallback={() => {
                      setTokenNumber(golfer.tokenid);
                      setOpenPracticeModal(true);
                    }}
                    golfer={golfer}
                    userid={props.uuid}
                    userWallet={props.ethaddress}
                    clubhouseGolfer
                  />
                ))}
              {cardTypeActive === 'listedGolfers' && userListedGolfers.length > 1 && userListedGolfers
                .map((golfer, i) => (
                  <PurchaseCard
                    playerGolfer
                    key={golfer.tokenid ? golfer.tokenid : i}
                    onClick={() => {
                      props.history.push(`/golfer-details/1/${golfer.tokenid}`);
                    }}
                    parentPushCallback={() => {
                      props.history.push(`/golfer-details/1/${golfer.tokenid}`);
                    }}
                    practiceCallback={() => {
                      setTokenNumber(golfer.tokenid);
                      setOpenPracticeModal(true);
                    }}
                    golfer={golfer}
                    userid={props.uuid}
                    userWallet={props.ethaddress}
                    clubhouseGolfer
                  />
                ))
              }
            </div>
            </div>
          </div>
        </div>
      </MarketplaceContainer>
    </Layout>
  );
};

MyGolfers.propTypes = {
  ethaddress: PropTypes.string,
  flowaddress: PropTypes.string,
  dispatch: PropTypes.func,
  uuid: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  sortSetting: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapProps(store) {
  return {
    flowaddress: store.user.flowaddress,
    ethaddress: store.user.ethaddress,
    uuid: store.user.uuid,
    updatedGolfers: store.clubhouseSettings.filteredGolfers,
    myGolferArray: store.headerInfo.myGolfers,
    myGearArray: store.headerInfo.myGear,
    availableGolfers: store.availableGolfers.availableGolfers
  };
}

export default connect(
  mapProps,
  mapDispatchToProps,
)(MyGolfers);
