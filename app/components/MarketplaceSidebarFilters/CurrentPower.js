import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { connect } from 'react-redux';
import MultiRangeSlider from '../MultiRangeSlider'

const CurrentPower = props => {
  const [power, setPower] = useState({
    minValue: 0,
    maxValue: 1000
  });
  const [intitalPower, setInititalPower] = useState(false);
  
  let timeout;
  const powerChange = e => {
    props.filterChanged(true);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      if(e.minVal) {
        setPower({
          minValue: e.minVal,
          maxValue: power.maxValue
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minPower: e.minVal,
            maxPower: power.maxValue
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minPower: e.minVal,
            maxPower: power.maxValue
          }));
        }
      } else if(e.maxVal) {
        setPower({
          minValue: power.minValue,
          maxValue: e.maxVal
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minPower: power.minValue,
            maxPower: e.maxVal
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minPower: power.minValue,
            maxPower: e.maxVal
          }));
        }
      } 
    }, 500);
  };

  useEffect(() => {
    if(intitalPower === false) {
      if(props.watchlist) {
        props.dispatch(updateWatchlistFilters({
          minPower: 0,
          maxPower: 1000
        }))
      } else {
        props.dispatch(updateCurrentFilters({
          minPower: 0,
          maxPower: 1000
        }))
      }
    }
    setInititalPower(true);
   }, [])

  return (
    <form className="flex flex-col pb-5 w-10/12 mx-auto">
      <MultiRangeSlider 
        min={0} 
        max={1000}
        type='power'
        label='powerLabel'
        onChange={powerChange}
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

export default withRouter(connect(mapDispatchToProps)(CurrentPower));
