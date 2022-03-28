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
    const addressCheckUrl = `${apiLocation}/public/flowaddress/check/${payload.payload.flowaddress}`;
    const addressCheck = yield call(request, addressCheckUrl);

    if (addressCheck.used) {
      let msg = 'Flow address used with another account.';
      yield put(loginError(msg));
      return;
    }

    const user = yield call(
      rsf.auth.createUserWithEmailAndPassword,
      payload.payload.email,
      payload.payload.password,
    );
    const result = yield user.user.getIdTokenResult(true);

    const loginData = {
      token: result.token,
      username: payload.payload.username,
      email: user.user.email,
      flowaddress: payload.payload.flowaddress,
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

    //console.log('Blocklete USER = ', blockleteUser)

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
    let msg = 'Signup failured: Login if already have account.';
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
