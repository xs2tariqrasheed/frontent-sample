import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'utils/axios';
import { OPEN_PACK } from './constants';
import { openPackSuccess, openPackError } from './actions';

function* onOpenPack(action) {
  try {
    const pack = yield call(
      axios.post,
      `/private/pack/openpack`,
      action.payload,
    );
    yield put(openPackSuccess(pack.data));
  } catch (err) {
    console.log(err);
    yield put(openPackError(err));
  }
}

export default function* packOpeningSaga() {
  yield takeLatest(OPEN_PACK, onOpenPack);
}
