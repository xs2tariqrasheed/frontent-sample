import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'utils/axios';
import { RETRIEVE_PACKS } from './constants';
import { retrievePacksError, retrievePacksSuccess } from './actions';

function* onFetchPacks() {
  try {
    const packs = yield call(axios.get, `/public/packs/getall`);
    yield put(retrievePacksSuccess(packs.data.packdrops));
  } catch (err) {
    console.log(err);
    yield put(retrievePacksError(err));
  }
}

export default function* packSaga() {
  yield takeLatest(RETRIEVE_PACKS, onFetchPacks);
}
