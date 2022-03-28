import { OPEN_PACK, OPEN_PACK_ERROR, OPEN_PACK_SUCCESS } from './constants';

export function openPack(packId) {
  return {
    type: OPEN_PACK,
    payload: {
      packId,
    },
  };
}

export function openPackError(err) {
  return {
    type: OPEN_PACK_ERROR,
    payload: {
      error: err,
    },
  };
}
export function openPackSuccess(golfers) {
  return {
    type: OPEN_PACK_SUCCESS,
    payload: {
      golfers,
    },
  };
}
