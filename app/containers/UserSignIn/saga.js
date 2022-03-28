import { takeLatest, put, call } from 'redux-saga/effects';
import request from 'utils/request';
import { setSession } from 'utils/session';
import { LOGIN, SIGNUP } from './constants';
import { loginSuccess, loginError, dismissLogin } from './action';
import rsf from '../../rsf';
import { apiLocation } from '../../config';

export function* loginUser(payload) {
  try {
    const user = yield call(
      rsf.auth.signInWithEmailAndPassword,
      payload.payload.email,
      payload.payload.password,
    );
    const result = yield user.user.getIdTokenResult(true);

    const loginData = {
      token: result.token,
    };
    const loginObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    };

    const requestLoginURL = `${apiLocation}/public/login`;
    const blockleteUser = yield call(request, requestLoginURL, loginObj);

    // console.log('RR User = ', rrUser)

    window.dataLayer.push({
      event: 'sign in',
      event_source_page: window.location.href,
      event_version: 'v2',
      auth_status: 'authenticated'
    });

    setSession({
      id: blockleteUser.user.uuid,
      email: user.user.email,
      displayName: blockleteUser.user.username,
      googleToken: result.token,
      itasToken: blockleteUser.token,
      refreshToken: user.user.refreshToken,
    });

    yield put(dismissLogin());
    yield put(loginSuccess(blockleteUser.user));
  } catch (err) {
    let msg = 'Login failure.';
    if (err.response) {
      msg = yield err.response.text();
    }
    yield put(loginError(msg));
  }
}

export function* signupUser(payload) {
  try {
    const user = yield call(
      rsf.auth.signInWithEmailAndPassword,
      payload.payload.email,
      payload.payload.password,
    );
    const result = yield user.user.getIdTokenResult(true);

    const loginData = {
      token: result.token,
      username: payload.payload.username,
      email: user.user.email,
    };
    const loginObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    };

    const requestLoginURL = `${apiLocation}/public/register`;
    const blockleteUser = yield call(request, requestLoginURL, loginObj);

    // console.log('RR User = ', rrUser)

    window.dataLayer.push({
      event: 'signup user',
      event_source_page: window.location.href,
      event_version: 'v2',
      auth_status: 'authenticated'
    });

    setSession({
      id: blockleteUser.user.uuid,
      email: user.user.email,
      displayName: blockleteUser.user.username,
      googleToken: result.token,
      itasToken: blockleteUser.token,
      refreshToken: user.user.refreshToken,
    });

    yield put(dismissLogin());
    yield put(loginSuccess(blockleteUser.user));
  } catch (err) {
    let msg = 'Login failure.';
    if (err.response) {
      msg = yield err.response.text();
    }
    yield put(loginError(msg));
  }
}

export default function* rootSaga() {
  yield takeLatest(LOGIN, loginUser);
  yield takeLatest(SIGNUP, signupUser);
}
