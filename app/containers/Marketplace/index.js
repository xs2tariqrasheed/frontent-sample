/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-prototype-builtins */
/* eslint-disable func-names */
/*
 * Marketplace
 *
 * This is the game's marketplace for purchasing golfers.
 *
 *  Will switch to use a selector class for the state props piece.
 *  The reason for this change is to build out filters and sorting
 *  into the selector.
 */

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { withRouter } from 'react-router-dom';
import saga from './saga';
import Layout from '../Layout';
import { NoGolferMessage, MsgWrapper, Wrapper, Header } from './styled';
import { filteredArtistGolfers, filteredAvailable } from './selectors';
import { loadBlockletesForSale, ClearGolferDetails, loadGearForSale } from './actions';
import AllGolfersView from './AllGolfersView';
import AllGearView from './AllGearView';
import FeaturedArtistsView from './FeaturedArtistsView';
import FilterSidebar from './FilterSidebar';
import Sorting from '../../components/MarketplaceSorting/Sorting';
const headerBGImg = 'https://www.blockletegames.com/images/Marketplace.png';
import { MobileFilter, CardTypeToggle } from './styled';
import filterIcon from '../../images/marketplace/icons-filter.svg';
import { FaChevronRight } from 'react-icons/fa';
import { FilterTab } from './FilterSidebar/styled';
import filter from '../../images/marketplace/purple-filter.png';

const Marketplace = props => {
  // const [newAccount, setNewAccount] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const [openPracticeModal, setOpenPracticeModal] = useState(false);
  const [openChooseGolferModal, setOpenChooseGolferModal] = useState(false);
  const [practiceTokenNumber, setPracticeTokenNumber] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [pageView, setPageView] = useState(false);
  const [filterSidebarChanged, setFilterSidebarChanged]  = useState(false);
  const [cardTypeActive, setCardTypeActive] = useState('golfers');
  const [isOpen, setIsOpen] = useState(false);
  const [desktopFullView, setDesktopFullView] = useState(false);
  const options = [
    'golfers',
    'gear',
  ];

  useInjectSaga({ key: 'marketplace', saga });

  useEffect(() => {
    props.dispatch(ClearGolferDetails());
    props.dispatch(loadBlockletesForSale());
    props.dispatch(loadGearForSale());
  }, []);

  useEffect(() => {
    if(pageView == false) {
      window.dataLayer.push({
        event: 'page view',
        page_name: 'marketplace',
        section: 'marketplace'
      })
      setPageView(true);
    }
  }, [])

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

  const onItemClick = (selected) => {
    setCardTypeActive(selected);
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Layout>      
        <Header className='flex justify-between pt-10 pb-10'>
          <p className='text-dark-indigo font-black text-5xl'>Marketplace</p>
          <div className='flex items-center'>
            <a className='text-dark-indigo font-bold text-sm'>Learn how to play your Golfers on the Blocklete App</a>
            <FaChevronRight className='text-dark-indigo ml-2 w-2 h-3'/>
          </div>
        </Header>

        <Wrapper className='bg-light-grey'>
          <div className="flex flex-wrap overflow-hidden inner-container ml-auto mr-auto">
            <FilterSidebar
              className={desktopFullView ? "hidden w-0 h-0" : "lg:w-1/4 xl:w-1/4 hidden xl:block lg:block xl:block xxl:block"}
              filterOpen={filterOpen}
              setFilterOpen={setFilterOpen}
              desktopFullView={desktopFullView}
              setDesktopFullView={setDesktopFullView}
              setFilterSidebarChanged={setFilterSidebarChanged}
              cardType={cardTypeActive}
            />
            <div
              className="w-full overflow-hidden"
              style={{ display: filterOpen ? 'block' : 'none' }}
            >
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
                <nav
                  style={{
                    boxShadow:
                      width < 1024
                        ? '0 3px 3px 0 rgba(188, 188, 188, 0.5)'
                        : 'none',
                  }}
                >
                  <div
                    className="xs:container xs:m-auto relative lg:p-3 flex flex-col lg:flex-row lg:justify-between lg:items-end"
                    // style={{ marginLeft: '12px', marginRight: '12px' }}
                  >
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
                      <div className="w-full flex justify-between items-center ">
                        <div className='ml-auto mr-auto flex'>
                          <CardTypeToggle
                            className={`
                              ${cardTypeActive === 'golfers' ? 'text-dark-indigo' : 'text-grey'} 
                              ${cardTypeActive === 'golfers' && 'border-b-4 border-dark-indigo'}
                              font-black
                              cursor-pointer
                              text-lg
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
                            `}
                            onClick={() => setCardTypeActive('gear')}
                          >
                            Gear
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
                {cardTypeActive === 'golfers' && (
                  <AllGolfersView
                    availableGolfers={props.availableRawGolfers}
                    userid={props.userid}
                    etherValue={props.etherValue}
                    detectedEth={props.detectedEth}
                    ethaddress={props.ethaddress}
                    setPracticeTokenNumber={data => setPracticeTokenNumber(data)}
                    setOpenPracticeModal={data => setOpenPracticeModal(data)}
                    setOpenChooseGolferModal={data =>
                      setOpenChooseGolferModal(data)
                    }
                    // filters={detailedFilters}
                    tempGolfers={props.availableRawGolfers}
                    filterChanged={filterSidebarChanged}
                    width={width}
                    desktopFullView={desktopFullView}
                  />
                )}
                {cardTypeActive === 'gear' && (
                  <AllGearView
                    availableGear={props.availableGear}
                    desktopFullView={desktopFullView}
                  />
                )} 
                {(!props.availableGolfers ||
                  props.availableGolfers.length === 0) && (
                    <MsgWrapper>
                      <NoGolferMessage>
                        Welcome to the Golfer Marketplace. New golfers loading...
                      </NoGolferMessage>
                    </MsgWrapper>
                  )}
              </div>
            </div>
          </div>
        </Wrapper>
      </Layout>
    </div>
  );
};
Marketplace.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  availableGolfers: PropTypes.array,
  artistGolfers: PropTypes.array,
  userid: PropTypes.string,
  etherValue: PropTypes.number,
  detectedEth: PropTypes.string,
  ethaddress: PropTypes.string,
  dispatch: PropTypes.func,
  settings: PropTypes.any, // eslint-disable-line
  availableRawGolfers: PropTypes.array,
  viewFeatured: PropTypes.bool,
  availableGear: PropTypes.array,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapProps(store) {
  return {
    userid: store.user.uuid,
    availableGolfers: filteredAvailable(store),
    artistGolfers: filteredArtistGolfers(store),
    availableRawGolfers: store.availableGolfers.availableGolfers,
    settings: store.marketplaceSettings,
    etherValue: +store.headerInfo.ethPrice,
    availableGear: store.availableGear.availableGear,
  };
}

export default withRouter(
  connect(
    mapProps,
    mapDispatchToProps,
  )(Marketplace),
);
