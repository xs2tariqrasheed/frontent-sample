import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the user state domain
 */

const selectUserDomain = state => state.user || initialState;

/**
 * Default selector used by User
 */

const makeSelectUser = () =>
  createSelector(
    selectUserDomain,
    substate => substate,
  );

export default makeSelectUser;
export { makeSelectUser };
