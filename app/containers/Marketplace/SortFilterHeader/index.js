/*
 * SortFilter Header View
 *
 * This is the SortFilter for the marketplace.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Consent } from './styled';
import { updateSort, setP2PGolfersFlag, setItasGolfersFlag } from '../actions';
import FilteringRow from '../../../components/FilteringRow';
import close from '../../../components/PracticeModal/canel-close-purp.svg';

const SortFilterHeader = props => {
  const { sortSetting, modalOpen, setOpenModal } = props;

  return (
    <>
      <button
        type="submit"
        className={`
        ${modalOpen ? 'block' : 'hidden'}
        modal-overlay 
        md:hidden z-20 fixed w-full h-full bg-black opacity-25 top-0 left-0 cursor-pointer`}
        onClick={() => setOpenModal(false)}
      >
        &nbsp;
      </button>
      <div
        className={`
      ${modalOpen ? 'block' : 'hidden'}
      modal
      z-50 
      bg-white 
      fixed 
      m-5 
      p-10 
      md:p-3
      top-0 
      h-full
      left-0
      md:static
      md:m-0
      md:w-auto
      md:h-auto
      md:block
      `}
      >
        <div className="bg-white">
          <div className="container mx-auto">
            <div className="md:grid md:flex md:items-center grid-cols-12 gap-10">
              <div className="col-span-2">
                <header className="md:hidden flex justify-between items-center">
                  <h1 className="mb-0 uppercase text-sm font-light tracking-wide">
                    Filter
                  </h1>
                  <button type="button" onClick={() => setOpenModal(false)}>
                    <img src={close} alt="Close button" />
                  </button>
                </header>
                <hr className="my-3 md:hidden" />
                <Consent>
                  <input
                    id="consent"
                    type="checkbox"
                    checked={props.itasGolferFlag}
                    onChange={() => {
                      const value = props.itasGolferFlag
                        ? 'filter inactive'
                        : 'filter active';

                      window.dataLayer.push({
                        filterStatus: value, // or 'filter active' if set back
                        filterName: 'credit', // enter filter activated/deactivated
                        event: 'set filter',
                      });

                      props.dispatch(setItasGolfersFlag());
                    }}
                  />
                  <span />
                  Credit card available
                </Consent>
                <Consent>
                  <input
                    id="consent"
                    type="checkbox"
                    checked={props.p2pGolferFlag}
                    onChange={() => {
                      const value = props.p2pGolferFlag
                        ? 'filter inactive'
                        : 'filter active';

                      window.dataLayer.push({
                        filterStatus: value, // or 'filter active' if set back
                        filterName: 'ptp', // enter filter activated/deactivated
                        event: 'set filter',
                      });

                      props.dispatch(setP2PGolfersFlag());
                    }}
                  />
                  <span />
                  Peer-to-peer sale
                </Consent>
              </div>
              <hr className="my-3 md:hidden" />
              <div className="lg:grid col-span-9 grid-cols-2 grid-rows-1 gap-5">
                <FilteringRow
                  title="Category"
                  ariaLabel="Filter Golfers by Category"
                  onSelect={key => props.dispatch(updateSort({ key }))}
                  sortSetting={sortSetting}
                  options={[
                    { value: 'tokenid', displayName: 'Token ID' },
                    { value: 'price', displayName: 'Price' },
                    { value: 'powerpeak', displayName: 'Power' },
                    { value: 'accuracypeak', displayName: 'Accuracy' },
                    { value: 'composurepeak', displayName: 'Composure' },
                    { value: 'staminapeak', displayName: 'Stamina' },
                  ]}
                />
                <hr className="my-3 md:hidden" />
                <FilteringRow
                  title="Sort"
                  ariaLabel="Sort Golfers by price"
                  sortSetting={sortSetting}
                  onSelect={order => props.dispatch(updateSort({ order }))}
                  options={[
                    { value: 'desc', displayName: 'High to Low' },
                    { value: 'asc', displayName: 'Low to High' },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SortFilterHeader.propTypes = {
  dispatch: PropTypes.func,
  p2pGolferFlag: PropTypes.bool,
  itasGolferFlag: PropTypes.bool,
  modalOpen: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  sortSetting: PropTypes.object,
};

function mapProps(store) {
  let p2pFlag = true;
  let itasFlag = true;

  if (store.marketplaceSettings) {
    p2pFlag = store.marketplaceSettings.p2pGolfersFlag;
    itasFlag = store.marketplaceSettings.itasGolfersFlag;
  }

  return {
    sortSetting: store.marketplaceSettings.sortSetting,
    p2pGolferFlag: p2pFlag,
    itasGolferFlag: itasFlag,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapProps,
  mapDispatchToProps,
)(SortFilterHeader);
