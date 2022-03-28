/*
 *
 * Pack Drops reducer
 *
 */
import produce from 'immer';
import {
  RETRIEVE_PACKS,
  RETRIEVE_PACKS_ERROR,
  RETRIEVE_PACKS_SUCCESS,
} from './constants';

export const initialState = {
  loadingPacks: false,
  packErrorText: '',
  packs: [],
};

/* eslint-disable default-case, no-param-reassign */
const PackReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RETRIEVE_PACKS:
        draft.loadingPacks = true;
        draft.packErrorText = '';
        break;
      case RETRIEVE_PACKS_SUCCESS:
        draft.loadingPacks = false;
        draft.packs = action.payload.packs;
        draft.packErrorText = '';
        break;
      case RETRIEVE_PACKS_ERROR:
        draft.loadingPacks = false;
        draft.packErrorText = action.payload.error;
        break;
    }
  });

export default PackReducer;
