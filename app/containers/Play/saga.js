import { takeLatest, call } from 'redux-saga/effects';
import axios from 'utils/axios';
import { GET_TOKEN_FOR_PLAY } from './constants';

export function* getTokenForPlay(dataForToken) {
  // Modify later.
  // Should pull based on the info passed in.
  const obj = {
    tokenId: dataForToken.tokenId,
    uuid: dataForToken.uuid,
  };

  yield call(axios.post, `/private/user/issuegameplaytoken`, obj)
    .then(res => res.text())
    .then(body => {
      localStorage.setItem('ItasArenaGolfGameToken', JSON.parse(body).token);
    });
}

export default function* GamePlaySaga() {
  yield takeLatest(GET_TOKEN_FOR_PLAY, getTokenForPlay);
}
