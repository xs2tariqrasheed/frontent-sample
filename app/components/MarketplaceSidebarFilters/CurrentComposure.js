import React, { useState, useEffect } from 'react';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MultiRangeSlider from '../MultiRangeSlider'

const CurrentComposure = props => {
  const [composure, setComposure] = useState({
    minValue: 0,
    maxValue: 1000
  });
  const [intitalComposure, setInititalComposure] = useState(false);

  let timeout;
  const composureChange = e => {
    props.filterChanged(true);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      if(e.minVal) {
        setComposure({
          minValue: e.minVal,
          maxValue: composure.maxValue
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minComposure: e.minVal,
            maxComposure: composure.maxValue
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minComposure: e.minVal,
            maxComposure: composure.maxValue
          }));
        }
      } else if(e.maxVal) {
        setComposure({
          minValue: composure.minValue,
          maxValue: e.maxVal
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minComposure: composure.minValue,
            maxComposure: e.maxVal
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minComposure: composure.minValue,
            maxComposure: e.maxVal
          }));
        }
      } 
    }, 500)
      
    
  };

  useEffect(() => {
    if(intitalComposure === false) {
      if(props.watchlist) {
        props.dispatch(updateWatchlistFilters({
          minComposure: 0,
          maxComposure: 1000
        }))
      } else {
        props.dispatch(updateCurrentFilters({
          minComposure: 0,
          maxComposure: 1000
        }))
      }
    }
    setInititalComposure(true);
   }, [])

  return (
    <form className="flex flex-col pb-5 w-10/12 mx-auto">
      <MultiRangeSlider 
        min={0} 
        max={1000}
        type='focus'
        label='focusLabel'
        onChange={composureChange}
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

export default withRouter(connect(mapDispatchToProps)(CurrentComposure));
