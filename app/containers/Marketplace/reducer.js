/*
 *
 * Available Golfer reducer
 *
 */
import produce from 'immer';

import { CLEAR_AVAILABLE } from '../Header/constants';

import {
  INCREMENT_MARKET_WATCHLIST,
  RECEIVED_BLOCKLETES_FOR_SALE,
  RECEIVED_GEAR_FOR_SALE
} from './constants';
import { DECREMENT_MARKET_WATCHLIST } from '../GolferDetails/constants';

export const initialState = {
  availableGolfers: [],
  availableGear: [],
};

const incrementMarketWatch = (currentGolfers, watchedGolfer) => {
  const foundIndex = currentGolfers.findIndex(
    x => x.tokenid === watchedGolfer.tokenid,
  );
  const newCount = currentGolfers[foundIndex].watchcount + 1;
  currentGolfers[foundIndex].watchcount = newCount; // eslint-disable-line

  return currentGolfers;
};

const decrementMarketWatch = (currentGolfers, watchedGolfer) =>
  currentGolfers.map(current => {
    if (current.tokenid === watchedGolfer.tokenid) {
      return {
        ...watchedGolfer,
        watchcount: watchedGolfer.watchcount - 1,
      };
    }
    return current;
  });

/* eslint-disable default-case, no-param-reassign */
const availableGolferReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RECEIVED_BLOCKLETES_FOR_SALE:
        draft.availableGolfers = action.golfers;
        break;
      case CLEAR_AVAILABLE:
        draft.availableGolfers = [];
        break;
      case INCREMENT_MARKET_WATCHLIST:
        draft.availableGolfers = incrementMarketWatch(
          state.availableGolfers,
          action.golfer,
        );
        break;
      case DECREMENT_MARKET_WATCHLIST:
        draft.availableGolfers = decrementMarketWatch(
          state.availableGolfers,
          action.golfer,
        );
        break;
      case RECEIVED_GEAR_FOR_SALE:
        console.log('[Marketplace | reducer] - RECEIVED_GEAR_FOR_SALE', action.gear);
        draft.availableGear = action.gear;
        break;
    }
  });

export default availableGolferReducer;
