import React, { useState, useEffect } from 'react';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MultiRangeSlider from '../MultiRangeSlider'

const CurrentStamina = props => {
  const [stamina, setStamina] = useState({
    minValue: 0,
    maxValue: 1000
  });
  const [intitalStamina, setInititalStamina] = useState(false);

  let timeout;
  const staminaChange = e => {
    props.filterChanged(true);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      if(e.minVal) {
        setStamina({
          minValue: e.minVal,
          maxValue: stamina.maxValue
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minStamina: e.minVal,
            maxStamina: stamina.maxValue
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minStamina: e.minVal,
            maxStamina: stamina.maxValue
          }));
        }
      } else if(e.maxVal) {
        setStamina({
          minValue: stamina.minValue,
          maxValue: e.maxVal
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minStamina: stamina.minValue,
            maxStamina: e.maxVal
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minStamina: stamina.minValue,
            maxStamina: e.maxVal
          }));
        }
      } 
    }, 500);
  };

  useEffect(() => {
    if(intitalStamina === false) {
      if(props.watchlist) {
        props.dispatch(updateWatchlistFilters({
          minStamina: 0,
          maxStamina: 1000
        }))
      } else {
        props.dispatch(updateCurrentFilters({
          minStamina: 0,
          maxStamina: 1000
        }))
      }
    }
    setInititalStamina(true);
   }, [])

  return (
    <form className="flex flex-col pb-5 w-10/12 mx-auto">
      <MultiRangeSlider 
        min={0} 
        max={1000}
        type='stamina'
        label='staminaLabel'
        onChange={staminaChange}
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

export default withRouter(connect(mapDispatchToProps)(CurrentStamina));
