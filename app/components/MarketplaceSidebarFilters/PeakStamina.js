import React, { useState, useEffect } from 'react';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MultiRangeSlider from '../MultiRangeSlider'

const PeakStamina = props => {
  const [PeakStamina, setPeakStamina] = useState({
    minValue: 0,
    maxValue: 1000
  });
  const [intitalPeakStamina, setInititalPeakStamina] = useState(false);

  let timeout;
  const peakStaminaChange = e => {
    props.filterChanged(true);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      if(e.minVal) {
        setPeakStamina({
          minValue: e.minVal,
          maxValue: PeakStamina.maxValue
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minPeakStamina: e.minVal,
            maxPeakStamina: PeakStamina.maxValue
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minPeakStamina: e.minVal,
            maxPeakStamina: PeakStamina.maxValue
          }));
        }
      } else if(e.maxVal) {
        setPeakStamina({
          minValue: Peakaccuracy.minValue,
          maxValue: e.maxVal
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minPeakStamina: PeakStamina.minValue,
            maxPeakStamina: e.maxVal
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minPeakStamina: PeakStamina.minValue,
            maxPeakStamina: e.maxVal
          }));
        }
      } 
    }, 500);
  };

  useEffect(() => {
    if(intitalPeakStamina === false) {
      if(props.watchlist) {
        props.dispatch(updateWatchlistFilters({
          minPeakStamina: 0,
          maxPeakStamina: 1000
        }))
      } else {
        props.dispatch(updateCurrentFilters({
          minPeakStamina: 0,
          maxPeakStamina: 1000
        }))
      }
    }
    setInititalPeakStamina(true);
   }, [])

  return (
    <form className="flex flex-col pb-5 w-10/12 mx-auto">
      <MultiRangeSlider 
        min={0} 
        max={1000}
        type='stamina'
        label='staminaLabel'
        onChange={peakStaminaChange}
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

export default withRouter(connect(mapDispatchToProps)(PeakStamina));
