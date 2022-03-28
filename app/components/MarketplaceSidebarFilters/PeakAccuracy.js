import React, { useState, useEffect } from 'react';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MultiRangeSlider from '../MultiRangeSlider'

const PeakAccuracy = props => {
  const [PeakAccuracy, setPeakAccuracy] = useState({
    minValue: 0,
    maxValue: 1000
  });
  const [intitalPeakAccuracy, setInititalPeakAccuracy] = useState(false);

  let timeout;
  const peakAccuracyChange = e => {
    props.filterChanged(true);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      if(e.minVal) {
        setPeakAccuracy({
          minValue: e.minVal,
          maxValue: PeakAccuracy.maxValue
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minPeakAccuracy: e.minVal,
            maxPeakAccuracy: PeakAccuracy.maxValue
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minPeakAccuracy: e.minVal,
            maxPeakAccuracy: PeakAccuracy.maxValue
          }));
        }
      } else if(e.maxVal) {
        setPeakAccuracy({
          minValue: Peakaccuracy.minValue,
          maxValue: e.maxVal
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minPeakAccuracy: PeakAccuracy.minValue,
            maxPeakAccuracy: e.maxVal
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minPeakAccuracy: PeakAccuracy.minValue,
            maxPeakAccuracy: e.maxVal
          }));
        }
      } 
    }, 500);
  };

  useEffect(() => {
    if(intitalPeakAccuracy === false) {
      if(props.watchlist) {
        props.dispatch(updateWatchlistFilters({
          minPeakAccuracy: 0,
          maxPeakAccuracy: 1000
        }))
      } else {
        props.dispatch(updateCurrentFilters({
          minPeakAccuracy: 0,
          maxPeakAccuracy: 1000
        }))
      }
    }
    setInititalPeakAccuracy(true);
   }, [])

  return (
    <form className="flex flex-col pb-5 w-10/12 mx-auto">
      <MultiRangeSlider 
        min={0} 
        max={1000}
        type='accuracy'
        label='accuracyLabel'
        onChange={peakAccuracyChange}
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

export default withRouter(connect(mapDispatchToProps)(PeakAccuracy));
