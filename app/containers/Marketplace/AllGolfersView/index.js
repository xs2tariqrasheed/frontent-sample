/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
/*
 * Marketplace
 *
 * This is the game's marketplace for purchasing golfers.
 *
 *  Will switch to use a selector class for the state props piece.
 *  The reason for this change is to build out filters and sorting
 *  into the selector.
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PurchaseCard from 'components/Golfers/PurchaseCard/Loadable';
import InfiniteScroll from 'react-infinite-scroll-component';
import { withRouter } from 'react-router-dom';
import { increaseScrollIndex, updateCurrentFilters } from '../actions';
import Paginate from '../../../components/Pagination';


const AllGolfersView = props => {
  const [haveAvailableGolfers, setHaveAvailableGolfers] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const getNextScrollIndex = () => {
    props.dispatch(increaseScrollIndex());
  };

  //if availableGolfers is present, and there are no filters applied yet, then load all of the golfers on the page
  useEffect(() => {
    if(props.availableGolfers.length > 0) {
      setHaveAvailableGolfers(true)
    }
    props.dispatch(updateCurrentFilters({ pageLoad: true }));
    setPageLoaded(true);
  }, [props.availableGolfers]);

  const indexOfLastGolfer = currentPage * itemsPerPage;
  const indexOfFirstGolfer = indexOfLastGolfer - itemsPerPage;
  const currentGolfers = props.updatedGolfers.slice(indexOfFirstGolfer, indexOfLastGolfer);

  const containerClassName= "z-10 relative grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-sm gap-y-sm md:mx-5";
  const fullViewContainerClassName= "z-10 relative grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-x-sm gap-y-sm md:mx-5";


  return (
    <div className="mb-10 lg:pr-1 lg:pb-10">
      <div className="xs:container xs:m-auto lg:mx-auto">
        {haveAvailableGolfers && props.width < 1024 && (
          <InfiniteScroll
            dataLength={props.currentScrollIndex}
            next={getNextScrollIndex}
            hasMore={true}
            loader={
              props.updatedGolfers && props.updatedGolfers.length == 0 && pageLoaded && !props.filterChanged ?
              (<h4>Loading golfers...</h4>) :
              (<h4>No Golfers fit your criteria</h4>)
            }
            scrollThreshold={0.7}
            className={`${containerClassName}`}
          >
            {props.updatedGolfers &&
              props.updatedGolfers.length > 0 &&
              props.updatedGolfers
                .map(golfer => {
                  if (golfer) {
                    return (
                      <PurchaseCard
                        playerGolfer={golfer.playerGolfer}
                        key={golfer.tokenid}
                        practiceCallback={() => {
                          props.setPracticeTokenNumber(golfer.tokenid);
                          props.setOpenPracticeModal(true);
                        }}
                        etherValue={+props.etherValue}
                        golfer={golfer}
                        userid={props.userid}
                        clubhouseGolfer={false}
                        myWatchGolfer={false}
                      />
                    );
                  }
                  return <></>;
                })}
        </InfiniteScroll>
        )}
        {haveAvailableGolfers && props.width > 1024 && (
        <>
          <div className={props.desktopFullView ? `${fullViewContainerClassName}` : `${containerClassName}`}>
          {currentGolfers &&
              currentGolfers.length > 0 &&
              currentGolfers
                .map(golfer => {
                  if (golfer) {
                    return (
                      <PurchaseCard
                        playerGolfer={golfer.playerGolfer}
                        key={golfer.tokenid}
                        practiceCallback={() => {
                          props.setPracticeTokenNumber(golfer.tokenid);
                          props.setOpenPracticeModal(true);
                        }}
                        etherValue={+props.etherValue}
                        golfer={golfer}
                        userid={props.userid}
                        clubhouseGolfer={false}
                        myWatchGolfer={false}
                      />
                    );
                  }
              return <></>;
            })}
          </div>
        </>
        )}
      </div>
      <Paginate
        itemsPerPage={itemsPerPage}
        totalItems={props.updatedGolfers.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageNumberLimit={pageNumberLimit}
        maxPageNumberLimit={maxPageNumberLimit}
        setMaxPageNumberLimit={setMaxPageNumberLimit}
        setMinPageNumberLimit={setMinPageNumberLimit}
        minPageNumberLimit={minPageNumberLimit}
        className='mt-10'
      >
      </Paginate>
    </div>
  );
};

/*eslint-disable */
AllGolfersView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  availableGolfers: PropTypes.array,
  userid: PropTypes.string,
  etherValue: PropTypes.number,
  detectedEth: PropTypes.string,
  dispatch: PropTypes.func,
  setPracticeTokenNumber: PropTypes.func,
  setOpenPracticeModal: PropTypes.func,
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
    currentScrollIndex: store.marketplaceSettings.scrollIndex,
  };
}

export default withRouter(
  connect(
    mapProps,
    mapDispatchToProps,
  )(AllGolfersView),
);
