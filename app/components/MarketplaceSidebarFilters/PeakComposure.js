import React, { useState, useEffect } from 'react';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MultiRangeSlider from '../MultiRangeSlider'

const PeakComposure = props => {
  const [PeakComposure, setPeakComposure] = useState({
    minValue: 0,
    maxValue: 1000
  });
  const [intitalPeakComposure, setInititalPeakComposure] = useState(false);

  let timeout;
  const peakComposureChange = e => {
    props.filterChanged(true);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      if(e.minVal) {
        setPeakComposure({
          minValue: e.minVal,
          maxValue: PeakComposure.maxValue
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minPeakComposure: e.minVal,
            maxPeakComposure: PeakComposure.maxValue
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minPeakComposure: e.minVal,
            maxPeakComposure: PeakComposure.maxValue
          }));
        }
      } else if(e.maxVal) {
        setPeakComposure({
          minValue: PeakComposure.minValue,
          maxValue: e.maxVal
        })
        if(props.watchlist) {
          props.dispatch(updateWatchlistFilters({
            minPeakComposure: PeakComposure.minValue,
            maxPeakComposure: e.maxVal
          }));
        } else {
          props.dispatch(updateCurrentFilters({
            minPeakComposure: PeakComposure.minValue,
            maxPeakComposure: e.maxVal
          }));
        }
      } 
    }, 500);
  };

  useEffect(() => {
    if(intitalPeakComposure === false) {
      if(props.watchlist) {
        props.dispatch(updateWatchlistFilters({
          minPeakComposure: 0,
          maxPeakComposure: 1000
        }))
      } else {
        props.dispatch(updateCurrentFilters({
          minPeakComposure: 0,
          maxPeakComposure: 1000
        }))
      }
    }
    setInititalPeakComposure(true);
   }, []);

  return (
    <form className="flex flex-col pb-5 w-10/12 mx-auto">
      <MultiRangeSlider 
        min={0} 
        max={1000}
        type='focus'
        label='focusLabel'
        onChange={peakComposureChange}
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

export default withRouter(connect(mapDispatchToProps)(PeakComposure));
