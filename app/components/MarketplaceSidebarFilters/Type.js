import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { connect } from 'react-redux';

const Type = props => {
    return (
        <div className='w-10/12 mx-auto'>Type</div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
      dispatch,
    };
  }
  
  export default withRouter(connect(mapDispatchToProps)(Type));