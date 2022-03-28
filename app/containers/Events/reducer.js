/*
 *
 * Events reducer
 *
 */
import {
  EVENTS_RECEIVED,
  EVENTS_PRIVATE_RECEIVED,
  CLEAR_PRIVATE_EVENTS,
  RECEIVED_TOURNAMENTS,
} from './constants';

export const initialState = {
  events: [],
  privateEvents: [],
  tournaments: [],
};

function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS_RECEIVED:
      return { ...state, events: action.events };
    case EVENTS_PRIVATE_RECEIVED:
      return { ...state, privateEvents: action.events };
    case CLEAR_PRIVATE_EVENTS:
      return { ...state, privateEvents: [] };
    case RECEIVED_TOURNAMENTS:
      return { ...state, tournaments: action.events };
    default:
      return state;
  }
}

export default eventsReducer;
