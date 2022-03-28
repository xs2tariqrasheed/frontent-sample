/*
 *
 * Events actions
 *
 */

import {
  EVENTS_RECEIVED,
  FETCH_EVENTS,
  FETCH_EVENTS_FAILED,
  FETCH_PRIVATE_EVENTS,
  EVENTS_PRIVATE_RECEIVED,
  FETCH_PRIVATE_EVENTS_FAILED,
  CLEAR_PRIVATE_EVENTS,
  FETCH_TOURNAMENTS,
  RECEIVED_TOURNAMENTS,
  FETCH_FAILED_TOURNAMENTS,
} from './constants';

export function fetchPrivateEventsAction(uuid) {
  return {
    type: FETCH_PRIVATE_EVENTS,
    uuid,
  };
}

export function clearPrivateEventsAction() {
  return {
    type: CLEAR_PRIVATE_EVENTS,
  };
}

export function fetchPrivateEventsFailed(error) {
  return {
    type: FETCH_PRIVATE_EVENTS_FAILED,
    error,
  };
}

export function privateEventsReceived(events) {
  return {
    type: EVENTS_PRIVATE_RECEIVED,
    events,
  };
}

export function fetchEventsAction() {
  return {
    type: FETCH_EVENTS,
  };
}

export function fetchEventsFailed(error) {
  return {
    type: FETCH_EVENTS_FAILED,
    error,
  };
}

export function eventsReceived(events) {
  return {
    type: EVENTS_RECEIVED,
    events,
  };
}

export function fetchTournamentsAction() {
  return {
    type: FETCH_TOURNAMENTS,
  };
}

export function fetchTournamentsFailed(error) {
  return {
    type: FETCH_FAILED_TOURNAMENTS,
    error,
  };
}

export function tournamentsReceived(events) {
  return {
    type: RECEIVED_TOURNAMENTS,
    events,
  };
}

// export function fetchGolferEvents() {
//   return {
//     type: FETCH_GOLFER_EVENTS,
//     golferId,
//     competition
//   };
// }
//
// export function fetchGolferEventsFailed(error) {
//   return {
//     type: FETCH_GOLFER_EVENTS_FAILED,
//     error,
//   };
// }
//
// export function golferEventsReceived(events) {
//   return {
//     type: FETCH_GOLFER_EVENTS_RECEIVED,
//     events,
//   };
// }
