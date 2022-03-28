import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Season Two Welcome state domain
 */

const selectSeasonTwoWelcomePageDomain = state =>
  state.flowmigration || initialState;

const selectUserData = state => state.user;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Season Two Welcome Page
 */

const makeSelectSeasonTwoWelcomePage = () =>
  createSelector(
    selectSeasonTwoWelcomePageDomain,
    substate => substate,
  );

const makeSelectUserData = () =>
  createSelector(
    selectUserData,
    substate => substate,
  );

export default makeSelectSeasonTwoWelcomePage;
export { makeSelectSeasonTwoWelcomePage, makeSelectUserData };
