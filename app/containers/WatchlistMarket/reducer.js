import produce from 'immer';
import {
    UPDATE_WATCHLIST_FILTERS,
    UPDATE_WATCHLIST_GOLFERS,
    SORT_WATCHLIST_GOLFERS
} from './constants';

const initialState = {
    currentWatchlistFilters: {},
    filteredWatchlistGolfers: [],
    sortWatchlistGolfers: {}
}

const watchlistReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_WATCHLIST_FILTERS:
        draft.currentWatchlistFilters = {...state.currentWatchlistFilters, ...action.filter};
        break;
      case UPDATE_WATCHLIST_GOLFERS:
        draft.filteredWatchlistGolfers = action.newGolfers;
        break;
      case SORT_WATCHLIST_GOLFERS:
        draft.sortWatchlistGolfers = action.sortBy;
    }
  });

  export default watchlistReducer;