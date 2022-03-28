import React, { useState, useEffect } from 'react';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MultiRangeSlider from '../MultiRangeSlider'

const PeakPower = props => {
  const [PeakPower, setPeakPower] = useState({
    minValue: 0,
    maxValue: 1000
  });
  const [intitalPeakPower, setInititalPeakPower] = useState(false);

  let timeout;
  const peakPowerChange = e => {
    props.filterChanged(true);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      if(e.minVal) {
        setPeakPower({
          minValue: e.minVal,
          maxValue: PeakPower.maxValue
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minPeakPower: e.minVal,
            maxPeakPower: PeakPower.maxValue
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minPeakPower: e.minVal,
            maxPeakPower: PeakPower.maxValue
          }));
        }
      } else if(e.maxVal) {
        setPeakPower({
          minValue: PeakPower.minValue,
          maxValue: e.maxVal
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minPeakPower: PeakPower.minValue,
            maxPeakPower: e.maxVal
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minPeakPower: PeakPower.minValue,
            maxPeakPower: e.maxVal
          }));
        }
      } 
    }, 500);
  };

  useEffect(() => {
    if(intitalPeakPower === false) {
      if(props.watchlist) {
        props.dispatch(updateWatchlistFilters({
          minPeakPower: 0,
          maxPeakPower: 1000
        }))
      } else {
        props.dispatch(updateCurrentFilters({
          minPeakPower: 0,
          maxPeakPower: 1000
        }))
      }
    }
    setInititalPeakPower(true);
   }, [])

  return (
    <form className="flex flex-col pb-5 w-10/12 mx-auto">
       <MultiRangeSlider 
        min={0} 
        max={1000}
        type='power'
        label='powerLabel'
        onChange={peakPowerChange}
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

export default withRouter(connect(mapDispatchToProps)(PeakPower));
