/*
 * FilterSidebar
 *
 * This is the FilterSidebar for the marketplace.
 *
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, ClearAll, FilterTab } from './styled';
import { Card } from 'react-bootstrap';
import filter from '../../../images/marketplace/purple-filter.png';
import {
  Price,
  TokenID,
  Rarity,
  CurrentAccuracy,
  CurrentPower,
  CurrentComposure,
  CurrentStamina,
  PeakAccuracy,
  PeakPower,
  PeakComposure,
  PeakStamina,
  WindResistance,
  Type,
  Style
} from '../../../components/MarketplaceSidebarFilters';
// import { filterGolfers } from '../actions';
import { updateCurrentFilters } from '../actions';
import { updateWatchlistFilters } from '../../WatchlistMarket/actions';
import close from '../../../images/marketplace/icons-close.svg';
import ProShopClear from '../../../images/marketplace/ProShopClear.png';
import ProShopFilter from '../../../images/marketplace/ProShopFilter.png';
import clearAllFilters from '../../../images/marketplace/grey-clear.png'


const FilterSidebar = props => {
  const [clear, setClear] = useState(false);
  const [reRenderCount, setReRenderCount] = useState(0);
  const [tabs, setTabs] = useState([]);

  const updateTabs = useCallback(() => {
    console.log('update tabs?')
    setReRenderCount(reRenderCount + 1)
    setTabs([
      { id: 1, label: 'Price Range', body: <Price watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/>, borderBottom: true },
      { id: 2, label: 'Rarity', body: <Rarity watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/>, borderBottom: true },
      { id: 3, label: 'Token ID', body: <TokenID watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/>, borderBottom: true },
      { id: 6, label: 'Current Power', body: <CurrentPower watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
      { id: 7, label: 'Current Accuracy', body: <CurrentAccuracy watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
      { id: 8, label: 'Current Composure', body: <CurrentComposure watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
      { id: 9, label: 'Current Stamina', body: <CurrentStamina watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
      { id: 10, label: 'Peak Power', body: <PeakPower watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
      { id: 11, label: 'Peak Accuracy', body: <PeakAccuracy watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
      { id: 12, label: 'Peak Composure', body: <PeakComposure watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
      { id: 13, label: 'Peak Stamina', body: <PeakStamina watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
    ]);
  })
  useEffect(() => {
    if(props.cardType === 'gear' && !props.proShop) {
      setTabs([
        { id: 1, label: 'Price Range', body: <Price watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/>, borderBottom: true },
        { id: 2, label: 'Rarity', body: <Rarity watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/>, borderBottom: true },
        { id: 3, label: 'Token ID', body: <TokenID watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 4, label: 'Type', body: <Type watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 5, label: 'Style', body: <Style watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/>, borderBottom: true },
        { id: 6, label: 'Current Power', body: <CurrentPower watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 7, label: 'Current Accuracy', body: <CurrentAccuracy watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 8, label: 'Current Composure', body: <CurrentComposure watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 9, label: 'Current Stamina', body: <CurrentStamina watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 10, label: 'Wind Resistance', body: <WindResistance watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
      ])
    }
    if(props.cardType === 'gear' && props.proShop) {
      setTabs([
        { id: 1, label: 'Medals', body: <Price watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/>, borderBottom: true },
        { id: 2, label: 'Rarity', body: <Rarity watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/>, borderBottom: true },
        { id: 3, label: 'Token ID', body: <TokenID watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 4, label: 'Type', body: <Type watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 5, label: 'Style', body: <Style watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/>, borderBottom: true },
        { id: 6, label: 'Current Power', body: <CurrentPower watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 7, label: 'Current Accuracy', body: <CurrentAccuracy watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 8, label: 'Current Composure', body: <CurrentComposure watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 9, label: 'Current Stamina', body: <CurrentStamina watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 10, label: 'Wind Resistance', body: <WindResistance watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
      ])
    }
    if(props.cardType === 'golfers') {
      setTabs([
        { id: 1, label: 'Price Range', body: <Price watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/>, borderBottom: true },
        { id: 2, label: 'Rarity', body: <Rarity watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/>, borderBottom: true },
        { id: 3, label: 'Token ID', body: <TokenID watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/>, borderBottom: true },
        { id: 6, label: 'Current Power', body: <CurrentPower watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 7, label: 'Current Accuracy', body: <CurrentAccuracy watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 8, label: 'Current Composure', body: <CurrentComposure watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 9, label: 'Current Stamina', body: <CurrentStamina watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 10, label: 'Peak Power', body: <PeakPower watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 11, label: 'Peak Accuracy', body: <PeakAccuracy watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 12, label: 'Peak Composure', body: <PeakComposure watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
        { id: 13, label: 'Peak Stamina', body: <PeakStamina watchlist={props.watchlist} proShop={props.proShop} filterChanged={props.setFilterSidebarChanged}/> },
      ])
    }
  }, [props.cardType])

  const clearFilters = () => {
    if(props.watchlist) {
      props.dispatch(updateWatchlistFilters({ clear: true }));
    } else {
      props.dispatch(updateCurrentFilters({ clear: true })); 
    }
    updateTabs();
  }

  useEffect(() => {
    console.log('tabs re-render', reRenderCount)
  }, [reRenderCount])

  return (
    <Container style={props.style} className={props.className} backgroundColor={props.proShop ? '#181376' : 'white'}>
      <div
        className={props.desktopFullView ? "hidden w-0 h-0" : "flex-col my-3"}
        style={{ display: props.filterOpen ? 'flex' : 'none' }}
        className='flex justify-between'
      >
        <div className="flex items-center justify-between my-2">
          <div
            onClick={() => props.setFilterOpen(false)}
            className="flex items-center my-2"
          >
            <p className="mx-1 mb-0 text-dark-indigo">Done</p>
            <img className="mx-1" src={close} />
          </div>
        </div>
        <div className="w-1/4 mr-5 flex items-center cursor-pointer">
          <img className='w-8' src={props.proShop ? ProShopClear : clearAllFilters}/>
          <ClearAll
            onClick={() => clearFilters()}
            style={{whiteSpace: 'nowrap'}}
          >
            Clear Filters
          </ClearAll>
        </div>
      </div>

      <div
        className="flex flex-wrap justify-between w-full py-4 items-center"
        style={{ display: props.filterOpen ? 'none' : 'flex' }}
      >
        <FilterTab className="w-1/2 mr-0 flex justify-center cursor-pointer"
          onClick={() => props.setDesktopFullView(!props.desktopFullView)}
          outline={props.proShop ? '#867eff' : '#3a338f'}
        >
          <img className={`${props.proShop ? 'w-7' : 'w-8'} h-4 mt-auto mb-auto`} src={props.proShop ? ProShopFilter : filter} />
          <p className={`${props.proShop ? 'text-ps-lavender' : 'text-dark-indigo'} mb-0 text-center my-auto mx-2`}>
            Filters
          </p>
        </FilterTab>
        
        <div className="w-1/2 mr-0 flex items-center pl-3 cursor-pointer"
           onClick={() => clearFilters()}
        >
          <img src={props.proShop ? ProShopClear : clearAllFilters} className='w-6 h-5 m-0.5'/>
          <ClearAll
            className={props.proShop ? 'text-white' : 'text-grey'}
          >
            Clear Filters
          </ClearAll>
        </div>
      </div>
      {props.desktopFullView === false && (
        <div 
          className={`${props.proShop ? 'border-ps-lavender' : 'border-subtle-grey'} border-2 rounded-lg`}
          style={props.proShop ? {backgroundColor: '#181376'} : {backgroundColor: 'white'}}
        >
        {tabs.map(tab => {
          const { id } = tab;
          return (
            <>
              <Card className="card" style={props.proShop ? {backgroundColor: '#181376', border: 'none'} : {backgroundColor: 'white', border: 'none'}}>
                <Card.Header
                  eventkey={id}
                  className="header w-10/12 mx-auto px-0"
                >
                  <p className={`${props.proShop && 'text-white'} mr-auto mb-0 font-bold`}>
                    {tab.label}
                  </p>
                </Card.Header>
                  <Card.Body className="p-0 flex-col">
                    {tab.body}
                  </Card.Body>
              </Card>
              {tab.borderBottom && (
                <hr className={`${props.proShop && 'bg-ps-lavender'} mt-0 mb-0 ml-auto mr-auto w-10/12`}/>
              )}
            </>
          );
        })}
      </div>
      )}
    </Container>
  );
};

FilterSidebar.propTypes = {
  dispatch: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(FilterSidebar);
