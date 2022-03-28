/*
 *
 * Login actions
 *
 */

import {
  UPDATE_DETECTED_ETH_ADDRESS,
  UPDATE_AVAILABLE,
  CLEAR_AVAILABLE,
  LOAD_MY_GOLFERS,
  UPDATE_MY_GOLFERS,
  CLEAR_MY_GOLFERS,
  SALES_EVENTS_CHECK,
  UPDATE_AVAILABLE_SOLD,
  UPDATE_AVAILABLE_NEW_GOLFERS,
  SET_CONTRACT_PAUSED,
  UPDATE_BRAZE,
  LOAD_MY_WATCHLIST,
  WATCHLIST_LOADED,
  CHECK_FOR_WALLET,
  GET_RANDOM_GOLFER,
  SET_RANDOM_GOLFER,
  MEDALS_LOADED,
  LOAD_MY_MEDALS,
  LOAD_MY_GEAR,
  UPDATE_MY_GEAR,
} from './constants';

export function updateDetectedEthAddress(address) {
  return {
    type: UPDATE_DETECTED_ETH_ADDRESS,
    address,
  };
}

export function contractPaused(paused) {
  return {
    type: SET_CONTRACT_PAUSED,
    paused,
  };
}

export function getRandomGolfer() {
  return {
    type: GET_RANDOM_GOLFER,
  };
}

export function randomGolferForDemo(golfer) {
  return {
    type: SET_RANDOM_GOLFER,
    golfer,
  };
}

export function myMedalsLoaded(myMedals) {
  return {
    type: MEDALS_LOADED,
    myMedals,
  };
}

export function loadMyMedals() {
  return {
    type: LOAD_MY_MEDALS,
  };
}

export function updateBrazeInfo(user) {
  return {
    type: UPDATE_BRAZE,
    user,
  };
}

export function availableNewGolfer(newGolfers) {
  return {
    type: UPDATE_AVAILABLE_NEW_GOLFERS,
    newGolfers,
  };
}

export function removeAvailableGolfers(soldGolfers) {
  return {
    type: UPDATE_AVAILABLE_SOLD,
    soldGolfers,
  };
}

export function checkSalesEvents(action) {
  return {
    type: SALES_EVENTS_CHECK,
    action,
  };
}

export function loadMyGolfers(flowAddress) {
  console.log('Header/actions | loadMyGolfers');
  return {
    type: LOAD_MY_GOLFERS,
    payload: {
      flowAddress,
    },
  };
}

export function loadMyWatchList(uuid) {
  return {
    type: LOAD_MY_WATCHLIST,
    uuid,
  };
}

export function myWatchListLoaded(myList) {
  return {
    type: WATCHLIST_LOADED,
    myList,
  };
}

export function availableLoadingError(err) {
  return {
    type: CLEAR_AVAILABLE,
    err,
  };
}

export function clearOutAvailable() {
  return {
    type: CLEAR_AVAILABLE,
  };
}

export function availableLoaded(golfers) {
  return {
    type: UPDATE_AVAILABLE,
    golfers,
  };
}

export function myGolfersLoaded(golfers) {
  return {
    type: UPDATE_MY_GOLFERS,
    golfers,
  };
}

export function myGolfersLoadingError(error) {
  return {
    type: CLEAR_MY_GOLFERS,
    error,
  };
}

export function checkForWallet(uuid) {
  return {
    type: CHECK_FOR_WALLET,
    uuid,
  };
}

export function loadMyGear(flowAddress) {
  console.log('Header/actions | loadMyGear', flowAddress);
  return {
    type: LOAD_MY_GEAR,
    payload: {
      flowAddress,
    },
  };
}

export function myGearLoaded(gear) {
  return {
    type: UPDATE_MY_GEAR,
    gear,
  };
}
