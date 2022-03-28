import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { connect } from 'react-redux';
import MultiRangeSlider from '../MultiRangeSlider'

const CurrentAccuracy = props => {
  const [accuracy, setAccuracy] = useState({
    minValue: 0,
    maxValue: 1000
  });
  const [intitalAccuracy, setInititalAccuracy] = useState(false);

  let timeout;
  const accuracyChange = e => {
    props.filterChanged(true);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      if(e.minVal) {
        setAccuracy({
          minValue: e.minVal,
          maxValue: accuracy.maxValue
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minAccuracy: e.minVal,
            maxAccuracy: accuracy.maxValue
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minAccuracy: e.minVal,
            maxAccuracy: accuracy.maxValue
          }));
        }
      } else if(e.maxVal) {
        setAccuracy({
          minValue: accuracy.minValue,
          maxValue: e.maxVal
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minAccuracy: accuracy.minValue,
            maxAccuracy: e.maxVal
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minAccuracy: accuracy.minValue,
            maxAccuracy: e.maxVal
          }));
        }
      } 
    }, 500);
  };

  useEffect(() => {
    if(intitalAccuracy === false) {
      if(props.watchlist) {
        props.dispatch(updateWatchlistFilters({
          minAccuracy: 0,
          maxAccuracy: 1000
        }))
      } else {
        props.dispatch(updateCurrentFilters({
          minAccuracy: 0,
          maxAccuracy: 1000
        }))
      }
    }
    setInititalAccuracy(true);
   }, [])

  return (
    <form className="flex flex-col pb-5 w-10/12 mx-auto">
      <MultiRangeSlider 
        min={0} 
        max={1000}
        type='accuracy'
        label='accuracyLabel'
        onChange={accuracyChange}
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

export default withRouter(connect(mapDispatchToProps)(CurrentAccuracy));
