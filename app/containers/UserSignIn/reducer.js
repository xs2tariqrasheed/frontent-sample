/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import moment from 'moment-timezone';

import {
  UPDATE_UUID,
  UPDATE_ETH_ADDRESS,
  UPDATE_USER_FLOWADDRESS,
  UPDATE_USER,
  CLEAR_USER_DATA,
  CHECK_FOR_ADDRESS,
  LOGIN,
  SIGNUP,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAR_LOGIN,
  CLOSE_MODAL,
} from './constants';

export const initialState = {
  email: '',
  username: '',
  consentOffers: false,
  consentAffiliates: false,
  uuid: '',
  ethaddress: '',
  flowaddress: '',
  updateWallet: false,
  loading: false,
  successfulLogin: false,
  errorText: '',
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CLEAR_LOGIN:
        draft.loading = false;
        draft.successfulLogin = false;
        draft.errorText = '';
        break;
      case LOGIN:
      case SIGNUP:
        draft.loading = true;
        draft.successfulLogin = false;
        draft.errorText = '';
        break;
      case CLOSE_MODAL:
        draft.successfulLogin = true;
        draft.loading = false;
        draft.errorText = '';
        break;
      case LOGIN_SUCCESS:
        if (action.payload.user.email) {
          draft.email = action.payload.user.email;
        }
        if (action.payload.user.username) {
          draft.username = action.payload.user.username;
        }
        if (action.payload.user.ethaddress) {
          draft.ethaddress = action.payload.user.ethaddress;
        }
        if (action.payload.user.uuid) {
          draft.uuid = action.payload.user.uuid;
        }
        if (action.payload.user.flowaddress) {
          draft.flowaddress = action.payload.user.flowaddress;
        }
        break;
      case LOGIN_ERROR:
        draft.loading = false;
        draft.successfulLogin = false;
        draft.errorText = action.payload.err;
        break;
      case UPDATE_UUID:
        draft.uuid = action.uuid;
        break;
      case UPDATE_ETH_ADDRESS:
        draft.ethaddress = action.address;
        draft.updateWallet = false;
        break;
      case UPDATE_USER_FLOWADDRESS:
        draft.flowaddress = action.payload.address;
        break;
      case CHECK_FOR_ADDRESS:
        draft.updateWallet = true;
        break;
      case CLEAR_USER_DATA:
        draft.email = '';
        draft.username = '';
        draft.flowaddress = '';
        draft.uuid = '';
        draft.ethaddress = '';
        break;
      case UPDATE_USER:
        draft.email = action.user.email;
        draft.username = action.user.username;
        draft.consentOffers = action.user.consentOffers;
        draft.consentAffiliates = action.user.consentAffiliates;
        draft.uuid = action.user.uuid;
        draft.ethaddress = action.user.ethaddress;
        draft.flowaddress = action.user.flowaddress;
        draft.loadedAt = moment(); //eslint-disable-line
        draft.updateWallet = false;
        draft.betaavailable = action.user.BetaFeatureAccess
          ? action.user.BetaFeatureAccess.access
          : false;
        break;
    }
  });

export default userReducer;
