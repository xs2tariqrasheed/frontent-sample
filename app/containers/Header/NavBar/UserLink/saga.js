/**
 * Header Saga for user login.
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'utils/axios';
import {
  SET_FLOW_ADDRESS,
  SET_FLOW_ADDRESS_NEW_USER,
  LOAD_MY_MEDALS,
} from './constants';
import { updateFlowaddress, myMedalsLoaded } from './actions';

export function* onUpdateFlowAddress(action) {
  yield call(axios.post, `/private/user/updateflowaddress`, action.payload);

  yield put(updateFlowaddress(action.payload.address));
}

export function* onUpdateFlowAddressNewUser(action) {
  yield put(updateFlowaddress(action.payload.address));
}

export function* getMedals() {
  const myMedals = yield call(axios.get, `/private/user/medalsaccount`);

  yield put(myMedalsLoaded(myMedals.data));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* HeaderSaga() {
  yield takeLatest(SET_FLOW_ADDRESS, onUpdateFlowAddress);
  yield takeLatest(SET_FLOW_ADDRESS_NEW_USER, onUpdateFlowAddressNewUser);
  yield takeLatest(LOAD_MY_MEDALS, getMedals);
}

