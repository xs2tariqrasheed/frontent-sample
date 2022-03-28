import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from './styled';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { connect } from 'react-redux';
import MultiRangeSlider from '../MultiRangeSlider'

const Price = props => {
  const [price, setPrice] = useState({
    minValue: 0,
    maxValue: 1000
  });
  const [intitalPrice, setInititalPrice] = useState(false);

  let timeout;
  const priceChange = function(e) {
    props.filterChanged(true);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      if(e.minVal) {
        setPrice({
          minValue: e.minVal,
          maxValue: price.maxValue
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minPrice: e.minVal,
            maxPrice: price.maxValue
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minPrice: e.minVal,
            maxPrice: price.maxValue
          }));
        }
      } else if(e.maxVal) {
        setPrice({
          minPrice: price.minValue,
          maxPrice: e.maxVal
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minPrice: price.minValue,
            maxPrice: e.maxVal
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minPrice: price.minValue,
            maxPrice: e.maxVal
          }));
        }
      } 
    }, 500);
  };

  useEffect(() => {
    if(intitalPrice === false) {
      if(props.watchlist) {
        props.dispatch(updateWatchlistFilters({
          minPrice: 0,
          maxPrice: 1000
        }))
      } else {
        props.dispatch(updateCurrentFilters({
          minPrice: 0,
          maxPrice: 1000
        }))
      }
    }
    setInititalPrice(true);
   }, [])

  return (
    <form className="flex flex-col pb-5 w-10/12 mx-auto">
      <MultiRangeSlider 
        min={0} 
        max={1000}
        type='price'
        label='priceLabel'
        onChange={priceChange}
        proShop={props.proShop}
      />
    </form>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default withRouter(connect(mapDispatchToProps)(Price));
