// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import axios from 'utils/axios';
import {
  FETCH_EVENT_DETAILS,
  FETCH_EVENT_LEADERBOARD,
  FETCH_PRIVATE_EVENT_DETAILS,
  JOIN_PRIVATE_EVENT,
} from './constants';
import {
  fetchEventDetails,
  fetchEventLeaderboardFailed,
  receivedEventDetails,
  receivedEventLeaderboard,
  fetchEventLeaderboard,
  fetchPrivateEventDetails,
} from './actions';

function* fetchEventDetailsSaga({ contestId }) {
  try {
    const result = yield call(axios.get, `/public/contests/${contestId}`);
    yield put(receivedEventDetails(result.data.contest));
  } catch (error) {
    console.error(error);
    yield put(fetchEventDetails(error));
  }
}

function* fetchPrivateEventDetailsSaga({ payload }) {
  try {
    const result = yield call(
      axios.get,
      `/public/privatechallenge/${payload.contestUuid}/${payload.userUuid}`,
    );
    yield put(receivedEventDetails(result.data.contest));
    if (result.data.contest)
      yield put(fetchEventLeaderboard(result.data.contest.id));
  } catch (error) {
    console.error(error);
    yield put(fetchEventDetails(error));
  }
}

function* joinPrivateEvent({ payload }) {
  const obj = {
    privateCompetitionId: payload.contestUuid,
    tokenId: payload.token,
    uuid: payload.userUuid,
  };

  try {
    yield call(axios.post, `/private/pvpcompetitions/join`, obj);
    yield put(fetchPrivateEventDetails(payload.contestUuid, payload.userUuid));
  } catch (error) {
    console.error(error);
    yield put(fetchEventDetails(error));
  }
}

function* fetchEventLeaderboardSaga({ contestId }) {
  try {
    const result = yield call(
      axios.get,
      `/public/contesttopscores/${contestId}`,
    );
    yield put(receivedEventLeaderboard(result.data.competitions));
  } catch (error) {
    console.error(error);
    yield put(fetchEventLeaderboardFailed(error));
  }
}

export default function* eventDetailsSaga() {
  yield takeLatest(FETCH_EVENT_DETAILS, fetchEventDetailsSaga);
  yield takeLatest(FETCH_EVENT_LEADERBOARD, fetchEventLeaderboardSaga);
  yield takeLatest(FETCH_PRIVATE_EVENT_DETAILS, fetchPrivateEventDetailsSaga);
  yield takeLatest(JOIN_PRIVATE_EVENT, joinPrivateEvent);
}
