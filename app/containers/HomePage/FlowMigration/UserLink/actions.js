/*
 *
 * Header actions
 *
 */

import { SET_FLOW_ADDRESS, UPDATE_USER_FLOWADDRESS } from './constants';

export function setFlow(address) {
  return {
    type: SET_FLOW_ADDRESS,
    payload: {
      address,
    },
  };
}

export function updateFlowaddress(address) {
  return {
    type: UPDATE_USER_FLOWADDRESS,
    payload: {
      address,
    },
  };
}
