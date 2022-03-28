import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { withRouter } from 'react-router-dom';
import saga from './saga';
import Layout from '../Layout';
import { NoGolferMessage, MsgWrapper, Wrapper, Header, InnerWrapper } from './styled';
import ProShopGearView from './ProShopGearView';
import ProShopChargedView from './ProShopChargedView';
import ProShopClothesView from './ProShopClothesView';
import FilterSidebar from '../Marketplace/FilterSidebar';
import Sorting from '../../components/MarketplaceSorting/Sorting';
import { MobileFilter, CardTypeToggle } from './styled';
import filterIcon from '../../images/marketplace/icons-filter.svg';
import { FaChevronRight } from 'react-icons/fa';
import { FilterTab } from '../Marketplace/FilterSidebar/styled';
import filter from '../../images/marketplace/ProShopFilter.png';

const ProShopMarketplace = props => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [pageView, setPageView] = useState(false);
  const [filterSidebarChanged, setFilterSidebarChanged]  = useState(false);
  const [cardTypeActive, setCardTypeActive] = useState('charged');
  const [isOpen, setIsOpen] = useState(false);
  const [desktopFullView, setDesktopFullView] = useState(false);
  const options = [
    'gear',
    'charged',
    'clothes'
  ];

//   useEffect(() => {
//     if(pageView == false) {
//       window.dataLayer.push({
//         event: 'page view',
//         page_name: 'marketplace',
//         section: 'marketplace'
//       })
//       setPageView(true);
//     }
//   }, [])

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
      <Wrapper>
        <Layout>      
          <Header className=''>
              <div className='inner-container flex justify-between pt-10 pb-10 mx-auto'>
                  <p className='text-white font-black text-5xl'>ProShop Marketplace</p>
                  <div className='flex items-center'>
                      <a className='text-white font-bold text-sm'>Learn how to play your Golfers on the Blocklete App</a>
                      <FaChevronRight className='text-white ml-2 w-2 h-3'/>
                  </div>
              </div>
          </Header>

          <InnerWrapper>
            <div className="flex flex-wrap overflow-hidden inner-container ml-auto mr-auto">
              <FilterSidebar
                className={desktopFullView ? "hidden w-0 h-0" : "lg:w-1/4 xl:w-1/4 hidden xl:block lg:block xl:block xxl:block"}
                filterOpen={filterOpen}
                setFilterOpen={setFilterOpen}
                desktopFullView={desktopFullView}
                setDesktopFullView={setDesktopFullView}
                setFilterSidebarChanged={setFilterSidebarChanged}
                cardType={cardTypeActive}
                proShop={true}
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
                  proShop={true}
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
                    >
                      {desktopFullView  && (
                        <FilterTab className="w-1/6 mr-0 flex justify-center cursor-pointer"
                          onClick={() => setDesktopFullView(!desktopFullView)}
                          outline='#867eff'
                        >
                          <img className='w-7 h-4 mt-auto mb-auto' src={filter} />
                          <p className="text-ps-lavender mb-0 text-center my-auto mx-2">
                            Filters
                          </p>
                        </FilterTab>
                      )}
                      <div
                        className="w-full flex justify-between lg:px-5 pt-3"
                        style={{ display: filterOpen ? 'none' : 'block' }}
                      >
                        <div className="w-full flex justify-between items-center ">
                          <div className='flex'>
                            <CardTypeToggle
                              className={`
                                ${cardTypeActive === 'gear' ? 'text-ps-lavender' : 'text-white'} 
                                ${cardTypeActive === 'gear' && 'border-b-4 border-ps-lavender'}
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
                                ${cardTypeActive === 'charged' ? 'text-ps-lavender' : 'text-white'} 
                                ${cardTypeActive === 'charged' && 'border-b-4 border-ps-lavender'}
                                font-black 
                                cursor-pointer
                                text-lg
                                mx-3
                              `}
                              onClick={() => setCardTypeActive('charged')}
                            >
                              Charged
                            </CardTypeToggle>
                            <CardTypeToggle
                              className={`
                                ${cardTypeActive === 'clothes' ? 'text-ps-lavender' : 'text-white'} 
                                ${cardTypeActive === 'clothes' && 'border-b-4 border-ps-lavender'}
                                font-black 
                                cursor-pointer
                                text-lg
                                mx-3
                              `}
                              onClick={() => setCardTypeActive('clothes')}
                            >
                              Clothes
                            </CardTypeToggle>
                          </div>
                          <div className="flex rounded-lg lg:w-60 w-32">
                            <Sorting proShop={true}/>
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
                  {cardTypeActive === 'gear' && (
                    <ProShopGearView 
                      availableGear={props.availableGear}
                      desktopFullView={desktopFullView}
                    />
                  )}
                  {cardTypeActive === 'charged' && (
                    <ProShopChargedView 
                      availableGear={props.availableGear}
                      desktopFullView={desktopFullView}
                    />
                  )} 
                  {cardTypeActive === 'clothes' && (
                    <ProShopClothesView />
                  )} 
                  {(!props.availableGolfers ||
                    props.availableGolfers.length === 0) && (
                      <MsgWrapper>
                        <NoGolferMessage>
                          Welcome to the ProShop Marketplace. New gear loading...
                        </NoGolferMessage>
                      </MsgWrapper>
                    )}
                </div>
              </div>
            </div>
          </InnerWrapper>
        </Layout>
      </Wrapper>
    </div>
  );
};
ProShopMarketplace.propTypes = {
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
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapProps(store) {
  return {
    availableGear: store.availableGear.availableGear,
    // userid: store.user.uuid,
    // availableGolfers: filteredAvailable(store),
    // artistGolfers: filteredArtistGolfers(store),
    // availableRawGolfers: store.availableGolfers.availableGolfers,
    // settings: store.marketplaceSettings,
    // etherValue: +store.headerInfo.ethPrice,
  };
}

export default withRouter(
  connect(
    mapProps,
    mapDispatchToProps,
  )(ProShopMarketplace),
);
