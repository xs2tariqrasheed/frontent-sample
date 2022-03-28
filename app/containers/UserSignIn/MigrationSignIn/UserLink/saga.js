/**
 * Header Saga for user login.
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'utils/axios';
import { SET_FLOW_ADDRESS } from './constants';
import { updateFlowaddress } from './actions';

export function* onUpdateFlowAddress(action) {
  yield call(axios.post, `/private/user/updateflowaddress`, action.payload);

  yield put(updateFlowaddress(action.payload.address));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* HeaderSaga() {
  yield takeLatest(SET_FLOW_ADDRESS, onUpdateFlowAddress);
}
