/*
 *
 * Login actions
 *
 */

import {
  UPDATE_USER,
  UPDATE_UUID,
  UPDATE_ETH_ADDRESS,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP,
  CLEAR_LOGIN,
  CLOSE_MODAL,
} from './constants';

export function clearLogin() {
  return {
    type: CLEAR_LOGIN,
  };
}

export function dismissLogin() {
  return {
    type: CLOSE_MODAL,
  };
}

export function updateUuid(uuid) {
  return {
    type: UPDATE_UUID,
    uuid,
  };
}

export function updateEthAddress(address) {
  return {
    type: UPDATE_ETH_ADDRESS,
    address,
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user,
  };
}

export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
    },
  };
}

export function loginError(err) {
  return {
    type: LOGIN_ERROR,
    payload: {
      err,
    },
  };
}

export function signup(payload) {
  return {
    type: SIGNUP,
    payload,
  };
}
