import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Packs state domain
 */

const selectPacksPageDomain = state => state.packsPage || initialState;

/**
 * Default selector used by PacksPage
 */

const makeSelectPacksPage = () =>
  createSelector(
    selectPacksPageDomain,
    substate => substate,
  );

export default makeSelectPacksPage;
export { makeSelectPacksPage };
