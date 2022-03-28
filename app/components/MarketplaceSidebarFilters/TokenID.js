import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from './styled';
import { updateCurrentFilters } from '../../containers/Marketplace/actions';
import { updateWatchlistFilters } from '../../containers/WatchlistMarket/actions';
import { connect } from 'react-redux';

const TokenID = props => {
  const [tokenId, updateTokenId] = useState({
    minValue: 0,
    maxValue: 10000,
  });

  //update tokenID state
  const tokenIdChange = function(e) {
    props.filterChanged(true);
    //if min-id was changed, update minValue with current target value and update maxValue with its current state
    if (e.target.name === 'min-id') {
      updateTokenId({
        minValue: e.target.value,
        maxValue: tokenId.maxValue,
      });
      if(props.watchlist) {
        props.dispatch(
          updateWatchlistFilters({
            minId: e.target.value,
            maxId: tokenId.maxValue,
          }),
        );
      } else {
        props.dispatch(
          updateCurrentFilters({
            minId: e.target.value,
            maxId: tokenId.maxValue,
          }),
        );
      }
    } else if (e.target.name === 'max-id') {
      //if max-id was changed, update maxValue with current target value and update min-Value with its current state
      updateTokenId({
        minValue: tokenId.minValue,
        maxValue: e.target.value,
      });
      if(props.watchlist) {
        props.dispatch(
          updateWatchlistFilters({
            maxId: e.target.value,
            minId: tokenId.minValue,
          }),
        );
      } else {
        props.dispatch(
          updateCurrentFilters({
            maxId: e.target.value,
            minId: tokenId.minValue,
          }),
        );
      }
    }
  };

  return (
    <Container className='w-10/12 mx-auto' proShop={props.proShop}>
      {/*<p className="font-light">The average price right now is ${avgPrice}</p>*/}
      <form className="flex">
        <fieldset className={`fieldset flex p-1 justify-center border-solid rounded-xl w-2/5 ${props.proShop ? 'border-ps-lavender' : 'border-subtle-grey'}`} style={props.proShop && {backgroundColor: '#322c8f'}}>
          <input
            placeholder='Min ID'
            aria-label="Min ID"
            name="min-id"
            id="min-id"
            onChange={tokenIdChange}
            className={`highlight-none w-3/4 m-auto input py-1 ${props.proShop && 'text-white'}`}
            style={props.proShop && {backgroundColor: '#322c8f'}}
          />
        </fieldset>
        <div className="my-auto mx-2 text-ps-lavender">-</div>
        <fieldset className={`fieldset flex p-1 justify-center border-solid rounded-xl w-2/5 ${props.proShop ? 'border-ps-lavender' : 'border-subtle-grey'}`} style={props.proShop && {backgroundColor: '#322c8f'}}>
          <input
            placeholder='Max ID'
            aria-label="Max ID"
            name="max-id"
            id="max-id"
            onChange={tokenIdChange}
            className="highlight-none w-3/4 m-auto input py-1"
            style={props.proShop && {backgroundColor: '#322c8f'}}
          />
        </fieldset>
      </form>
    </Container>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapProps(store) {
  return {
    availableGolfers: store.availableGolfers.availableGolfers,
  };
}

export default withRouter(
  connect(
    mapProps,
    mapDispatchToProps,
  )(TokenID),
);
