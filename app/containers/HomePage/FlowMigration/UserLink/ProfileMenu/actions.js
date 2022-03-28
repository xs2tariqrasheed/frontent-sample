/*
 *
 * Profile Menu actions
 *
 */

import { CLEAR_USER_DATA, CLEAR_MY_GOLFERS } from './constants';

export function clearUserData() {
  return {
    type: CLEAR_USER_DATA,
  };
}

export function clearMyGolfers() {
  return {
    type: CLEAR_MY_GOLFERS,
  };
}
