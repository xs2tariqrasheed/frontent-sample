import produce from 'immer';
import {
    SORT_GOLFERS,
    UPDATE_FILTERED_GOLFERS,
} from './constants';

export const initialState = {
    sortGolfers: { sortBy: 'overallScore' },
    filteredGolfers: [],
};

/* eslint-disable default-case, no-param-reassign */
const clubhouseSettingsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SORT_GOLFERS:
        draft.sortGolfers = action.sortBy;
        break;
      case UPDATE_FILTERED_GOLFERS:
        draft.filteredGolfers = action.newGolfers;
        break;
    }
  });

export default clubhouseSettingsReducer;