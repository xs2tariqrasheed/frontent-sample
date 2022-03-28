/*
 *
 * Available Golfer reducer
 *
 */
import produce from 'immer';
import { FaDraft2Digital } from 'react-icons/fa';
import {
  SET_SORT,
  SET_SCROLL_INDEX,
  SET_P2P_GOLFER_FLAG,
  SET_ITAS_GOLFER_FLAG,
  UPDATE_FILTERED_GOLFERS,
  SORT_GOLFERS,
  UPDATE_CURRENT_FILTERS,
} from './constants';

export const initialState = {
  sortSetting: { key: 'tokenid', order: 'desc' },
  scrollIndex: 15,
  p2pGolfersFlag: true,
  itasGolfersFlag: true,
  filteredGolfers: [],
  sortGolfers: {},
  currentFilters: {},
};


/* eslint-disable default-case, no-param-reassign */
const settingsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_SORT:
        /* eslint-disable no-case-declarations */
        const { key, order } = action.sortSetting;
        draft.sortSetting = {
          key: key || state.sortSetting.key,
          order: order || state.sortSetting.order,
        };
        break;
      case SET_SCROLL_INDEX:
        draft.scrollIndex = state.scrollIndex + 15;
        break;
      case SET_P2P_GOLFER_FLAG:
        draft.p2pGolfersFlag = !state.p2pGolfersFlag;
        break;
      case SET_ITAS_GOLFER_FLAG:
        draft.itasGolfersFlag = !state.itasGolfersFlag;
        break;
      case UPDATE_FILTERED_GOLFERS:
        // console.log('[Marketplace | settingsReducer] - UPDATE_FILTERED_GOLFERS', action.newGolfers);
        draft.filteredGolfers = action.newGolfers;
        break;
      case SORT_GOLFERS:
        draft.sortGolfers = action.sortBy;
        break;
      case UPDATE_CURRENT_FILTERS:
        draft.currentFilters = {...state.currentFilters, ...action.filter};
        break;
    }
  });

export default settingsReducer;
