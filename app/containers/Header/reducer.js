/*
 *
 * Login reducer
 *
 */
import produce from 'immer';

import {
  UPDATE_DETECTED_ETH_ADDRESS,
  SET_CONTRACT_PAUSED,
  SET_RANDOM_GOLFER,
  UPDATE_MY_GOLFERS,
  MEDALS_LOADED,
  UPDATE_MY_GEAR,
} from './constants';

export const initialState = {
  ethDetectedAddress: '',
  ethPrice: 1700,
  paused: false,
  demoGolfer: 0,
  medals: [],
  myGolfers: [],
  myGear: [],
};

/* eslint-disable default-case, no-param-reassign */
const headerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_MY_GOLFERS:
        draft.myGolfers = action.golfers;
        break;
      case UPDATE_DETECTED_ETH_ADDRESS:
        draft.ethDetectedAddress = action.address;
        break;
      case SET_CONTRACT_PAUSED:
        draft.paused = action.paused;
        break;
      case SET_RANDOM_GOLFER:
        draft.demoGolfer = action.golfer.golftoken.tokenid;
        break;
      case MEDALS_LOADED:
        draft.medals = action.myMedals;
        break;
      case UPDATE_MY_GEAR:
        console.log('[Header/Reducer | UPDATE_MY_GEAR');
        draft.myGear = action.gear;
        break;
    }
  });

export default headerReducer;
