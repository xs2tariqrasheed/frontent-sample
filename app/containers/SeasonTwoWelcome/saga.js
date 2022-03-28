import { call, takeLatest, put, select } from 'redux-saga/effects';
import axios from 'utils/axios';
import appboy from 'appboy-web-sdk';
import { SET_FLOW_ADDRESS_USER, MIGRATE_GOLFERS } from './constants';
import {
  migrateSeasonTwoGolfersSuccess,
  migrateSeasonTwoGolfersFailure,
  setFlowAddressUserSuccess,
  setFlowAddressUserFailure,
  updateUuid,
  updateUser,
} from './actions';
import { authWithFirebase } from '../../utils/firebaseAuthUtil';

export function* onSetFlowAddress(data) {
  console.log('data from onSetFlowAdress', data);
  const firebaseUserData = yield call(
    authWithFirebase,
    data.payload.email,
    data.payload.password,
  );

  if (firebaseUserData.err) {
    yield put(setFlowAddressUserFailure(firebaseUserData.errMessage));
  }

  try {
    const mergedUser = yield call(
      axios.post,
      `/private/user/migrateuseraccounttoflow`,
      { uuid: firebaseUserData.uuid },
    );
    yield put(setFlowAddressUserSuccess());

    if (mergedUser.data.token) {
      localStorage.setItem('ItasGolfToken', mergedUser.data.token);
    }
    yield put(updateUuid(mergedUser.data.previousUser.uuid));
    yield put(updateUser(mergedUser.data.previousUser));
  } catch (err) {
    console.log(err);
    yield put(
      setFlowAddressUserFailure(
        'Unable to connect Flow wallet to account. Refresh and try again.',
      ),
    );
  }
}

export function* onMigrateGolfers() {
  try {
    const response = yield call(
      axios.post,
      `/private/user/migrategolferstoflow`,
    );

    yield put(migrateSeasonTwoGolfersSuccess(response.data));
  } catch (err) {
    console.log(err);
    yield put(
      migrateSeasonTwoGolfersFailure(
        'Migration of your golfers did not complete. They are still on the Ethereum Blockchain. Please reload and try again.',
      ),
    );
  }
}

export default function* SeasonTwoWelcomeSaga() {
  yield takeLatest(SET_FLOW_ADDRESS_USER, onSetFlowAddress);
  yield takeLatest(MIGRATE_GOLFERS, onMigrateGolfers);
}
