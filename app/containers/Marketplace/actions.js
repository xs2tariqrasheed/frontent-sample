import {
  SET_SORT,
  SET_SCROLL_INDEX,
  LOAD_BLOCKLETES_FOR_SALE,
  RECEIVED_BLOCKLETES_FOR_SALE,
  RECEIVED_GEAR_FOR_SALE,
  SET_P2P_GOLFER_FLAG,
  SET_ITAS_GOLFER_FLAG,
  CLEAR_GOLFER_DETAILS,
  FILTER_GOLFERS,
  UPDATE_FILTERED_GOLFERS,
  SORT_GOLFERS,
  UPDATE_CURRENT_FILTERS,
  LOAD_GEAR_FOR_SALE,
  // CREATE_MIN_MAX_PRICE
} from './constants';

export function increaseScrollIndex() {
  return {
    type: SET_SCROLL_INDEX,
  };
}

export function ClearGolferDetails() {
  return {
    type: CLEAR_GOLFER_DETAILS,
  };
}

/**
 * @param key String
 * @param order String
 * @returns {{type: *, sortSetting: {key: *, order: *}}}
 */
export function updateSort({ key, order }) {
  return {
    type: SET_SORT,
    sortSetting: {
      key,
      order,
    },
  };
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

export function setP2PGolfersFlag() {
  return {
    type: SET_P2P_GOLFER_FLAG,
  };
}

export function setItasGolfersFlag() {
  return {
    type: SET_ITAS_GOLFER_FLAG,
  };
}

export function filterGolfers(filter) {
  return {
    type: FILTER_GOLFERS,
    filter
  }
}

export function updateFilteredGolfers(filteredGolfers) {
  return {
    type: UPDATE_FILTERED_GOLFERS,
    newGolfers: filteredGolfers
  }
}

export function sortGolfers(sortBy) {
  return {
    type: SORT_GOLFERS,
    sortBy
  }
}

export function updateCurrentFilters(filter) {
  return {
    type: UPDATE_CURRENT_FILTERS,
    filter
  }
}

export function loadGearForSale() {
  return {
    type: LOAD_GEAR_FOR_SALE,
  };
}

export function gearForSale(gear) {
  console.log('[Marketplace | saga] - gearForSale', gear);
  return {
    type: RECEIVED_GEAR_FOR_SALE,
    gear,
  };
}
