/*
 *
 * Season Two Welcome actions
 *
 */

import {
  WALLET_SETUP_BLOCKLETES,
  MIGRATE_GOLFERS,
  MIGRATE_GOLFERS_SUCCESS,
  MIGRATE_GOLFERS_FAILURE,
  SET_FLOW_ADDRESS_USER,
  SET_FLOW_ADDRESS_USER_SUCCESS,
  SET_FLOW_ADDRESS_USER_FAILURE,
  SET_TOTAL_GOLFERS_OWNED,
  UPDATE_USER,
  UPDATE_UUID,
  RESET_VIEW,
} from './constants';

export function resetView() {
  return {
    type: RESET_VIEW,
  };
}

export function setWalletConnectedBlockletes() {
  return {
    type: WALLET_SETUP_BLOCKLETES,
  };
}

export function migrateSeasonTwoGolfers() {
  return {
    type: MIGRATE_GOLFERS,
  };
}

export function migrateSeasonTwoGolfersSuccess(response) {
  // console.log('response', response)
  return {
    type: MIGRATE_GOLFERS_SUCCESS,
    payload: {
      jobId: response.jobId
    },
  };
}

export function migrateSeasonTwoGolfersFailure(err) {
  return {
    type: MIGRATE_GOLFERS_FAILURE,
    payload: {
      err,
    },
  };
}

export function setUserFlowAddress(flowaddress, email, password) {
  return {
    type: SET_FLOW_ADDRESS_USER,
    payload: {
      flowAddress: flowaddress,
      email,
      password,
    },
  };
}

export function setFlowAddressUserSuccess() {
  return {
    type: SET_FLOW_ADDRESS_USER_SUCCESS,
  };
}

export function setFlowAddressUserFailure(err) {
  return {
    type: SET_FLOW_ADDRESS_USER_FAILURE,
    payload: {
      err,
    },
  };
}

export function setUserTotalGolfers(golfers) {
  return {
    type: SET_TOTAL_GOLFERS_OWNED,
    payload: {
      golfers,
    },
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user,
  };
}

export function updateUuid(uuid) {
  return {
    type: UPDATE_UUID,
    uuid,
  };
}
