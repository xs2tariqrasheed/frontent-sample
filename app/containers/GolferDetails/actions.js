import {
  GET_GOLFER_DETAILS,
  SET_TOKEN_DETAILS,
  _WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  APPEND_TO_MY_WATCHLIST,
  INCREMENT_MARKET_WATCHLIST,
  DECREMENT_MARKET_WATCHLIST,
  SET_TOKEN_COMPETITION_HISTORY, 
  ADD_TO_WATCHLIST
} from './constants';

export function getGolferDetails(tokenId) {
  return {
    type: GET_GOLFER_DETAILS,
    tokenId,
  };
}

export function setTokenDetails(golfer) {
  return {
    type: SET_TOKEN_DETAILS,
    golfer,
  };
}

export function golferEventHistory(history) {
  return {
    type: SET_TOKEN_COMPETITION_HISTORY,
    history,
  };
}

export function IncrementMarketWatchlist(golfer) {
  return {
    type: INCREMENT_MARKET_WATCHLIST,
    golfer,
  };
}

export function DecrementMarketWatchlist(golfer) {
  return {
    type: DECREMENT_MARKET_WATCHLIST,
    golfer,
  };
}

export function AppendToMyWatchlist(golfer) {
  return {
    type: APPEND_TO_MY_WATCHLIST,
    golfer,
  };
}

export function RemoveFromMyWatchlist(golfer) {
  return {
    type: REMOVE_FROM_WATCHLIST,
    golfer,
  };
}

export function addToWatchList(dataObj) {
  return {
    type: ADD_TO_WATCHLIST,
    golfer: dataObj,
  };
} 

export function removeFromWatchlist(dataObj) {
  return {
    type: REMOVE_FROM_WATCHLIST,
    dataObj,
  };
}
