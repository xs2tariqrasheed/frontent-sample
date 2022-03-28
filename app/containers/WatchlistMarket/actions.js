import { filterGolfers } from '../Marketplace/actions';
import {
    UPDATE_WATCHLIST_FILTERS,
    UPDATE_WATCHLIST_GOLFERS,
    SORT_WATCHLIST_GOLFERS
} from './constants';

export function updateWatchlistGolfers(filteredGolfers) {
    return {
      type: UPDATE_WATCHLIST_GOLFERS,
      newGolfers: filteredGolfers
    }
  }
  
  export function sortWatchlistGolfers(sortBy) {
    return {
      type: SORT_WATCHLIST_GOLFERS,
      sortBy
    }
  }
  
  export function updateWatchlistFilters(filter) {
    return {
      type: UPDATE_WATCHLIST_FILTERS,
      filter
    }
  }