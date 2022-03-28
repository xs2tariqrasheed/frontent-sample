import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { withRouter } from 'react-router-dom';
import { increaseScrollIndex } from '../actions';

const ProShopClothesView = props => {
  const [haveAvailableGear, setHaveAvailableGear] = useState(true)

  const getNextScrollIndex = () => {
    props.dispatch(increaseScrollIndex());
  };

 
  return (

    <div className="mx-0 mb-10 lg:pr-1 lg:pb-10">
        Clothes View
      <div className="xs:container xs:m-auto lg:ml-auto">
        {haveAvailableGear && (
          <InfiniteScroll
          dataLength='80'
          next={getNextScrollIndex}
          scrollThreshold={0.7}
          hasMore
        >
          <div 
            className={`
              z-10 
              relative 
              grid 
              sm:grid-cols-2 
              md:grid-cols-2
              ${!props.desktopFilterOpen ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}
              ${!props.desktopFilterOpen ? 'xl:grid-cols-4' : 'xl:grid-cols-3'} 
              xxl:grid-cols-5 
              gap-x-sm 
              gap-y-sm 
              md:mx-5
            `}
            >

          </div>
        </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

/*eslint-disable */
ProShopClothesView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  availableGolfers: PropTypes.array,
  userid: PropTypes.string,
  etherValue: PropTypes.number,
  detectedEth: PropTypes.string,
  ethaddress: PropTypes.string,
  dispatch: PropTypes.func,
  setPracticeTokenNumber: PropTypes.func,
  setOpenPracticeModal: PropTypes.func,
  filters: PropTypes.array,
};

/* eslint-enable */

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
function mapProps(store) {
  return {
    updatedGolfers: store.marketplaceSettings.filteredGolfers,
  };
}

export default withRouter(
  connect(
    mapProps,
    mapDispatchToProps,
  )(ProShopClothesView),
);