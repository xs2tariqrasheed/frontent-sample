import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Clubhouse state domain
 */

const selectClubhousePageDomain = state => state.clubhousePage || initialState;

/**
 * Default selector used by ClubhousePage
 */

const makeSelectClubhousePage = () =>
  createSelector(
    selectClubhousePageDomain,
    substate => substate,
  );

export default makeSelectClubhousePage;
export { makeSelectClubhousePage };
