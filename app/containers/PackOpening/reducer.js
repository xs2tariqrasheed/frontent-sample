/*
 *
 * Pack Opening reducer
 *
 */
import produce from 'immer';
import { OPEN_PACK, OPEN_PACK_ERROR, OPEN_PACK_SUCCESS } from './constants';

export const initialState = {
  loadingPack: false,
  packErrorText: '',
  pack: null,
};

/* eslint-disable default-case, no-param-reassign */
const PackOpeningReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case OPEN_PACK:
        draft.loadingPack = true;
        draft.packErrorText = '';
        draft.pack = null;
        break;
      case OPEN_PACK_SUCCESS:
        draft.loadingPack = false;
        draft.pack = action.payload.pack;
        draft.packErrorText = '';
        break;
      case OPEN_PACK_ERROR:
        draft.loadingPack = false;
        draft.packErrorText = action.payload.error;
        draft.pack = null;
        break;
    }
  });

export default PackOpeningReducer;
