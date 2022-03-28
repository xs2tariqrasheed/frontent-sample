/*
 *
 * Login reducer
 *
 */
import produce from 'immer';

import {
  SET_TOKEN_DETAILS,
  SET_BITPAY_INVOICE,
  CLEAR_BITPAY_INVOICE,
  CLEAR_GOLFER_DETAILS,
  SET_TOKEN_COMPETITION_HISTORY,
  SET_AUCTION_PRICE,
  SET_GEAR_DETAILS,
} from './constants';

export const initialState = {
  tokenOwner: '',
  details: {},
  gear: {},
  newBpInvoice: false,
  bitpayInvoice: '',
  competitionHistory: [],
  auctionPrice: 30000000000000000000,
};

/* eslint-disable default-case, no-param-reassign */
const DetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    console.log(action.type, 'action.type', draft, 'draft');
    switch (action.type) {
      case SET_AUCTION_PRICE:
        draft.auctionPrice = action.price;
        break;
      case CLEAR_GOLFER_DETAILS:
        draft.tokenOwner = '';
        draft.details = {};
        draft.newBpInvoice = false;
        draft.bitpayInvoice = '';
        break;
      case SET_TOKEN_DETAILS:
        draft.details = action.golfer;
        break;
      case SET_GEAR_DETAILS:
        draft.gear = action.gear;
        break;
      case SET_TOKEN_COMPETITION_HISTORY:
        draft.competitionHistory = action.history.contests;
        break;
      case SET_BITPAY_INVOICE:
        draft.bitpayInvoice = action.invoice;
        draft.newBpInvoice = true;
        break;
      case CLEAR_BITPAY_INVOICE:
        draft.bitpayInvoice = '';
        draft.newBpInvoice = false;
        break;
    }
  });

export default DetailsReducer;
