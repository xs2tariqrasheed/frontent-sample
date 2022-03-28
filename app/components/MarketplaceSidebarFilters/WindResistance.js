import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from './styled';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { connect } from 'react-redux';
import MultiRangeSlider from '../MultiRangeSlider'

const WindResistance = props => {
  const [windResistance, setWindResistance] = useState({
    minValue: 0,
    maxValue: 100
  });
  const [intitalWindResistance, setInitialWindResistance] = useState(false);

  let timeout;
  const windResistanceChange = function(e) {
    props.filterChanged(true);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      if(e.minVal) {
        setWindResistance({
          minValue: e.minVal,
          maxValue: windResistance.maxValue
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minWindResistance: e.minVal,
            maxWindResistance: windResistance.maxValue
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minWindResistance: e.minVal,
            maxWindResistance: windResistance.maxValue
          }));
        }
      } else if(e.maxVal) {
        setWindResistance({
          minWindResistance: windResistance.minValue,
          maxWindResistance: e.maxVal
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minWindResistance: windResistance.minValue,
            maxWindResistance: e.maxVal
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minWindResistance: windResistance.minValue,
            maxWindResistance: e.maxVal
          }));
        }
      } 
    }, 500);
  };

  useEffect(() => {
    if(intitalWindResistance === false) {
      if(props.watchlist) {
        props.dispatch(updateWatchlistFilters({
          minWindResistance: 0,
          maxWindResistance: 100
        }))
      } else {
        props.dispatch(updateCurrentFilters({
          minWindResistance: 0,
          maxWindResistance: 100
        }))
      }
    }
    setInitialWindResistance(true);
   }, [])

  return (
    <form className="flex flex-col pb-5 w-10/12 mx-auto">
      <MultiRangeSlider 
        min={0} 
        max={100}
        type='price'
        label='priceLabel'
        onChange={windResistanceChange}
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

export default withRouter(connect(mapDispatchToProps)(WindResistance));