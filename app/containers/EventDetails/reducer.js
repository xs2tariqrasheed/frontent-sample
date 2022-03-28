/*
 *
 * EventDetails reducer
 *
 */
import produce from 'immer';
import {
  EVENT_DETAILS_RECEIVED,
  EVENT_LEADERBOARD_RECEIVED,
} from './constants';
import { FETCH_EVENTS_FAILED } from '../Events/constants';

export const initialState = {
  eventDetails: {},
  competitions: [],
};

/* eslint-disable default-case, no-param-reassign */
const eventDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case EVENT_DETAILS_RECEIVED:
        draft.eventDetails = action.eventDetails;
        break;
      case FETCH_EVENTS_FAILED:
        draft.eventDetails = {};
        break;
      case EVENT_LEADERBOARD_RECEIVED:
        draft.competitions = action.competitions;
        break;
    }
  });

export default eventDetailsReducer;
