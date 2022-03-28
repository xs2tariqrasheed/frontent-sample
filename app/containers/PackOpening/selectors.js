import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Pack Opening state domain
 */

const selectPackOpeningPageDomain = state =>
  state.packOpeningPage || initialState;

/**
 * Default selector used by Pack Opening Page
 */

const makeSelectPackOpeningPage = () =>
  createSelector(
    selectPackOpeningPageDomain,
    substate => substate,
  );

export default makeSelectPackOpeningPage;
export { makeSelectPackOpeningPage };
