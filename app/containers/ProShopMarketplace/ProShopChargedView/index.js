import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { withRouter } from 'react-router-dom';
import ChargedCard from '../../../components/Golfers/ChargedCard';
import Paginate from 'components/Pagination';

const ProShopChargedView = props => {
  const [haveAvailableGear, setHaveAvailableGear] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  //if availableGear is present, and there are no filters applied yet, then load all of the gear on the page
  useEffect(() => {
    console.log('[AllGearView]', props.availableGear);
    if (props.availableGear.length > 0) {
      setHaveAvailableGear(true)
    }
    // props.dispatch(updateCurrentFilters({ pageLoad: true }));
  }, [props.availableGear]);

  const indexOfLastGear = currentPage * itemsPerPage;
  const indexOfFirstGear = indexOfLastGear - itemsPerPage;
  const currentGear = props.availableGear.slice(indexOfFirstGear, indexOfLastGear);

  const sharedClasses = 'z-10 relative grid sm:grid-cols-2 md:grid-cols-2 gap-x-sm gap-y-sm md:mx-5';
  const containerClassName = "lg:grid-cols-3 xl:grid-cols-3";
  const fullViewContainerClassName = "lg:grid-cols-4 xl:grid-cols-4";
  
  return (
    <div className="mx-0 mb-10 lg:pr-1 lg:pb-10">
      <div className="xs:container xs:m-auto lg:ml-auto">
        {haveAvailableGear && (
          <>
          <div className={`${sharedClasses}` + (props.desktopFullView ? `${fullViewContainerClassName}` : `${containerClassName}`)}>
            {currentGear &&
              currentGear.length > 0 &&
              currentGear
                .map((gear, i) => {
                  if (gear) {
                    return (
                      <ChargedCard
                        gear={gear}
                        key={gear.tokenid ? gear.tokenid : i}
                      />
                    );
                  }
              return <></>;
            })}
          </div>
          <Paginate
            itemsPerPage={itemsPerPage}
            totalItems={props.availableGear.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            className='mt-10'
          />
          </>
        )}
      </div>
    </div>
  );
};

/*eslint-disable */
ProShopChargedView.propTypes = {
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
  )(ProShopChargedView),
);