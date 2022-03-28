import {
  RETRIEVE_PACKS,
  RETRIEVE_PACKS_ERROR,
  RETRIEVE_PACKS_SUCCESS,
} from './constants';

export function retrievePacks() {
  return {
    type: RETRIEVE_PACKS,
  };
}

export function retrievePacksError(err) {
  return {
    type: RETRIEVE_PACKS_ERROR,
    payload: {
      error: err,
    },
  };
}
export function retrievePacksSuccess(packs) {
  return {
    type: RETRIEVE_PACKS_SUCCESS,
    payload: {
      packs,
    },
  };
}
