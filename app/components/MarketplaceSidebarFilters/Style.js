import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { connect } from 'react-redux';

const Style = props => {
    return (
        <div className='w-10/12 mx-auto'>Style</div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
      dispatch,
    };
  }
  
  export default withRouter(connect(mapDispatchToProps)(Style));