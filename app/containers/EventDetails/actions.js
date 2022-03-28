/*
 *
 * EventDetails actions
 *
 */

import {
  EVENT_DETAILS_RECEIVED,
  EVENT_LEADERBOARD_RECEIVED,
  FETCH_EVENT_DETAILS,
  FETCH_EVENT_LEADERBOARD,
  FETCH_PRIVATE_EVENT_DETAILS,
  JOIN_PRIVATE_EVENT,
} from './constants';
import { FETCH_EVENTS_FAILED } from '../Events/constants';

export function fetchEventDetails(contestId) {
  return { type: FETCH_EVENT_DETAILS, contestId };
}

export function receivedEventDetails(event) {
  return {
    type: EVENT_DETAILS_RECEIVED,
    eventDetails: event,
  };
}

export function fetchEventsFailed(error) {
  return {
    type: FETCH_EVENTS_FAILED,
    error,
  };
}

export function fetchEventLeaderboard(contestId) {
  return {
    type: FETCH_EVENT_LEADERBOARD,
    contestId,
  };
}

export function receivedEventLeaderboard(competitions) {
  return {
    type: EVENT_LEADERBOARD_RECEIVED,
    competitions,
  };
}

export function fetchEventLeaderboardFailed(error) {
  return {
    type: EVENT_LEADERBOARD_RECEIVED,
    error,
  };
}

export function fetchPrivateEventDetails(contestUuid, userUuid) {
  return {
    type: FETCH_PRIVATE_EVENT_DETAILS,
    payload: { contestUuid, userUuid },
  };
}

export function joinPrivateEvent(contestUuid, userUuid, token) {
  return {
    type: JOIN_PRIVATE_EVENT,
    payload: { contestUuid, userUuid, token },
  };
}
