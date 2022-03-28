import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Golfer Details state domain
 */

const selectDetailsDomain = state => state.golferdetails || initialState;
const selectUserDomain = state => state.user;
const selectMyWatchlist = state => state.myGolfers.myWatchList;

const makeSelectGolferDetails = () =>
  createSelector(
    selectDetailsDomain,
    substate => substate,
  );

const makeSelectUserData = () =>
  createSelector(
    selectUserDomain,
    substate => substate,
  );

const makeSelectMyWatchlist = () =>
  createSelector(
    selectMyWatchlist,
    substate => substate,
  );

export { makeSelectGolferDetails, makeSelectUserData, makeSelectMyWatchlist };
