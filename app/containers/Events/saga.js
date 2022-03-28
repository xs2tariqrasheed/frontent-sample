import { call, put, takeLatest } from '@redux-saga/core/effects';
import axios from 'utils/axios';
import {
  eventsReceived,
  fetchEventsFailed,
  privateEventsReceived,
  fetchPrivateEventsFailed,
  tournamentsReceived,
  fetchTournamentsFailed,
} from './actions';
import {
  FETCH_EVENTS,
  FETCH_PRIVATE_EVENTS,
  FETCH_TOURNAMENTS,
} from './constants';

function* fetchEventsSaga() {
  try {
    const result = yield call(axios.get, `/public/contests`);
    yield put(eventsReceived(result.data.contests));
  } catch (error) {
    console.error(error);
    yield put(fetchEventsFailed(error));
  }
}

function* fetchTournamentsSaga() {
  try {
    const result = yield call(axios.get, `/public/tournaments/getAll`);
    yield put(tournamentsReceived(result.data.contests));
  } catch (error) {
    console.error(error);
    yield put(fetchTournamentsFailed(error));
  }
}

function* fetchPrivateEventsSaga(payload) {
  try {
    const result = yield call(
      axios.get,
      `/private/pvpcompetitions/getbyuser/${
        payload.uuid
      }?token=${localStorage.getItem('ItasGolfToken')}`,
    );
    const contests = result.data.joined.concat(result.data.created);
    yield put(privateEventsReceived(contests));
  } catch (error) {
    console.error(error);
    yield put(fetchPrivateEventsFailed(error));
  }
}

export default function* eventsSaga() {
  yield takeLatest(FETCH_EVENTS, fetchEventsSaga);
  yield takeLatest(FETCH_TOURNAMENTS, fetchTournamentsSaga);
  yield takeLatest(FETCH_PRIVATE_EVENTS, fetchPrivateEventsSaga);
}
