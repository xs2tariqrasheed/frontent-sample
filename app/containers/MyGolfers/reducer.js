import produce from 'immer';

import {
  UPDATE_MY_GOLFERS,
  CLEAR_MY_GOLFERS,
} from './constants';
import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST } from '../GolferDetails/constants';

export const initialState = {
  myGolfers: [],
  myWatchList: [],
};

const appendToMyWatchList = (currentWatchlist, golferToAdd) => {
  const newObj = {
    tokenid: golferToAdd.tokenId,
    GolferToken: golferToAdd,
  };

  return [...currentWatchlist, newObj];
};

/* eslint-disable default-case, no-param-reassign */
const myGolferReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_MY_GOLFERS:
        console.log('[MyGolfers/Reducer | UPDATE_MY_GOLFERS');
        draft.myGolfers = action.golfers;
        break;
      case CLEAR_MY_GOLFERS:
        draft.myGolfers = [];
        break;
      case ADD_TO_WATCHLIST:
        draft.myWatchList = appendToMyWatchList(
          state.myWatchList,
          action.golfer,
        );
        break;
      case REMOVE_FROM_WATCHLIST:
        draft.myWatchList = state.myWatchList.filter(
          watched => watched.tokenid !== action.dataObj.tokenId,
        );
        break;
    }
  });

export default myGolferReducer;

