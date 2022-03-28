/*
 *
 * Header actions
 *
 */

import {
  SET_FLOW_ADDRESS,
  SET_FLOW_ADDRESS_NEW_USER,
  UPDATE_USER_FLOWADDRESS,
  LOAD_MY_MEDALS,
  MEDALS_LOADED,
} from './constants';

export function setFlow(address) {
  return {
    type: SET_FLOW_ADDRESS,
    payload: {
      address,
    },
  };
}

export function setFlowNewUser(address) {
  return {
    type: SET_FLOW_ADDRESS_NEW_USER,
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

export function myMedalsLoaded(myMedals) {
  return {
    type: MEDALS_LOADED,
    myMedals,
  };
}

export function loadMyMedals() {
  return {
    type: LOAD_MY_MEDALS,
  };
}
