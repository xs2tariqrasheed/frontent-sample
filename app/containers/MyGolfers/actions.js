import {
  SET_SORT,
  SORT_GOLFERS,
  UPDATE_FILTERED_GOLFERS,
  UPDATE_CURRENT_FILTERS,
  CLEAR_GOLFER_DETAILS,
  LOAD_BLOCKLETES_FOR_SALE,
  RECEIVED_BLOCKLETES_FOR_SALE,
} from './constants';

export function ClearGolferDetails() {
  return {
    type: CLEAR_GOLFER_DETAILS,
  };
}

export function updateSort({ key, order }) {
  return {
    type: SET_SORT,
    sortSetting: {
      key,
      order,
    },
  };
}

export function sortGolfers(sortBy) {
  return {
    type: SORT_GOLFERS,
    sortBy
  }
}

export function updateFilteredGolfers(filteredGolfers) {
  return {
    type: UPDATE_FILTERED_GOLFERS,
    newGolfers: filteredGolfers
  }
}

export function updateCurrentFilters(filter) {
  return {
    type: UPDATE_CURRENT_FILTERS,
    filter
  }
}

export function loadBlockletesForSale() {
  return {
    type: LOAD_BLOCKLETES_FOR_SALE,
  };
}

export function blockletesForSale(golfers) {
  return {
    type: RECEIVED_BLOCKLETES_FOR_SALE,
    golfers,
  };
}
