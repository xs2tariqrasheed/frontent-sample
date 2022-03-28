import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PurchaseCard from 'components/Golfers/PurchaseCard/Loadable';
import InfiniteScroll from 'react-infinite-scroll-component';
import { withRouter } from 'react-router-dom';
import { increaseScrollIndex } from '../../Marketplace/actions';
import { updateWatchlistFilters } from '../actions'; 
import Paginate from '../../../components/Pagination';
import { loadMyWatchList } from '../../Header/actions';


const WatchlistGolfersView = props => {
  // const [haveAvailableGolfers, setHaveAvailableGolfers] = useState(false)
  const [haveUser, setHaveUser] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const indexOfLastGolfer = currentPage * itemsPerPage;
  const indexOfFirstGolfer = indexOfLastGolfer - itemsPerPage;
  const currentGolfers = props.updatedGolfers.slice(indexOfFirstGolfer, indexOfLastGolfer);

  const containerClassName= "z-10 relative grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-sm gap-y-sm md:mx-5";
  const fullViewContainerClassName= "z-10 relative grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-x-sm gap-y-sm md:mx-5";

  const getNextScrollIndex = () => {
    props.dispatch(increaseScrollIndex());
  };

  useEffect(() => {
    console.log('props.user?', props.user)
    if(props.user) {
      // props.dispatch(loadMyWatchList(props.user.uuid));
      // console.log(props.user)
      props.dispatch(updateWatchlistFilters({uuid: props.user.uuid}, {pageLoad: true}))
    }
  }, [props.user])



  const filteredGolfers = props.updatedGolfers;

  return (
    <div className="mx-0 mb-10 lg:pr-1 lg:pb-10">
      <div className="xs:container xs:m-auto lg:ml-auto">
        {filteredGolfers && props.width < 1024 && (
          <InfiniteScroll
          dataLength={props.currentScrollIndex}
          next={getNextScrollIndex}
          scrollThreshold={0.7}
          hasMore
        >
          <div className={`${containerClassName}`}>
            {filteredGolfers &&
              filteredGolfers.length > 0 &&
              filteredGolfers
                .map(golfer => {
                  if (golfer) { 
                    return (
                      <PurchaseCard
                        renderingForWatchlist={true}
                        availableGolfers={props.availableGolfers}
                        allAvailableGolfers={props.allAvailableGolfers}
                        playerGolfer={golfer.playerGolfer}
                        key={golfer.tokenId}
                        parentPushCallback={() => {
                          props.history.push(
                            `/golfer-details/0/${golfer.tokenId}`,
                          );
                        }}
                        practiceCallback={() => {
                          props.setPracticeTokenNumber(golfer.tokenId);
                          props.setOpenPracticeModal(true);
                        }}
                        etherValue={+props.etherValue}
                        golfer={golfer}
                        userid={props.userid}
                        userWallet={props.ethaddress}
                        clubhouseGolfer={false}
                        myWatchGolfer={false}
                      />
                    );
                  }
                  return <></>;
                })}
            {props.availableGolfers.length === 1 && props.availableGolfers.err && (
              <h1>{props.availableGolfers.err}</h1>
            )}
          </div>
        </InfiniteScroll>
        )} 
        {filteredGolfers && props.width > 1024 && (
        <>
          <div className={props.desktopFullView ? `${fullViewContainerClassName}` : `${containerClassName}`}>
          {currentGolfers &&
              currentGolfers.length > 0 &&
              currentGolfers
                .map(golfer => {
                  if (golfer) {
                    return (
                      <PurchaseCard
                        renderingForWatchlist={true}
                        availableGolfers={props.availableGolfers}
                        allAvailableGolfers={props.allAvailableGolfers}
                        playerGolfer={golfer.playerGolfer}
                        key={golfer.tokenId}
                        parentPushCallback={() => {
                          props.history.push(
                            `/golfer-details/0/${golfer.tokenId}`,
                          );
                        }}
                        practiceCallback={() => {
                          props.setPracticeTokenNumber(golfer.tokenId);
                          props.setOpenPracticeModal(true);
                        }}
                        etherValue={+props.etherValue}
                        golfer={golfer}
                        userid={props.userid}
                        userWallet={props.ethaddress}
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
WatchlistGolfersView.propTypes = {
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
    updatedGolfers: store.watchlist.filteredWatchlistGolfers,
    allAvailableGolfers: store.availableGolfers.availableGolfers,
    currentScrollIndex: store.marketplaceSettings.scrollIndex,
    user: store.user,
    myWatchlistArray: store.myGolfers.myWatchList
  };
}

export default withRouter(
  connect(
    mapProps,
    mapDispatchToProps,
  )(WatchlistGolfersView),
);
