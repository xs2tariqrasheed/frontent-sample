import axios from 'axios';
import qs from 'qs';
import { getSession, patchSession, clearSession } from './session';

// For common config
axios.defaults.headers.common['Content-Type'] = 'application/json';

const instance = axios.create({
  baseURL: `${process.env.API_LOCATION}`,
});

const refreshUrl = 'https://securetoken.googleapis.com/v1/token';

instance.interceptors.request.use(
  config => {
    // Merge auth headers so as not to overwrite config.headers.
    // Don't send auth header for session token refresh. It causes an error.
    if (config.url.indexOf(refreshUrl) < 0) {
      const authHeaders = getAuthHeaders();
      Object.keys(authHeaders).forEach(item => {
        if (config.headers) {
          // eslint-disable-next-line no-param-reassign
          config.headers[item] = authHeaders[item];
        }
      });
    }
    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.config.url.indexOf(refreshUrl) >= 0) {
      // If refresh failed then wipe out session and go to login page.
      clearSession();
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // If no response/status, it is probably a connection/network error. Return original error.
    if (!error.response || !error.response.status) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // Get status.
    const { status } = error.response;
    // If not auth-related just return original error.
    if (status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // Try to refresh.
    return getNewSessionToken()
      .then(token => {
        // Repeat original request with new token.
        const { config } = error;
        config.headers.Authorization = `Bearer ${token}`;
        // patch session token in local storage
        patchSession('itasToken', token);
        return new Promise((resolve, reject) => {
          axios
            .request(config)
            .then(response => {
              resolve(response);
            })
            .catch(err => {
              reject(err);
            });
        });
      })
      .catch(
        err =>
          new Promise((resolve, reject) => {
            reject(err);
          }),
      );
  },
);

function getAuthHeaders() {
  let headers = {};
  const session = getSession();
  if (session && session.itasToken) {
    headers = {
      Authorization: `Bearer ${session.itasToken}`,
    };
  }
  return headers;
}

function getRefreshToken() {
  let refreshTokenInt = '';
  const session = getSession();
  if (session && session.refreshToken) {
    refreshTokenInt = session.refreshToken;
  }
  return refreshTokenInt;
}

// Need to pull Google Session and then ItasGolf session.
function getNewSessionToken() {
  return new Promise(function checkRefresh(resolve, reject) {
    instance({
      method: 'post',
      url: refreshUrl,
      data: qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: getRefreshToken(),
      }),
      params: { key: 'AIzaSyA4OTDy3crqaCVlG1vXJEOOZNrQ7aY6tFw' },
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
      .then(async response => {
        if (response.status === 200) {
          await instance({
            method: 'post',
            url: `${process.env.API_LOCATION}/public/login`,
            data: JSON.stringify({
              token: response.data.access_token,
            }),
            headers: {
              'content-type': 'application/json',
            },
          }).then(resp => {
            if (resp.status === 200) {
              resolve(resp.data.token);
            } else {
              reject(new Error('unable to refresh session token'));
            }
          });
        } else {
          reject(new Error('unable to refresh session token'));
        }
      })
      .catch(() => {
        reject(new Error('unable to refresh session token'));
      });
  });
}

export default instance;
