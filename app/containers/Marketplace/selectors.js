import { createSelector } from 'reselect';
import orderBy from 'lodash/orderBy';

const availableSelector = state => state.availableGolfers.availableGolfers;
const filterSelector = state => state.marketplaceSettings.filterSettings; // || [{attribute:'sex', value:1},{attribute:'hat', value:2}];
const sortSelector = state => state.marketplaceSettings.sortSetting;
const scrollSelector = state => state.marketplaceSettings.scrollIndex;

function sortFromFilter(mergedList, sortSetting, filterSettings, scrollIndex) {
  let results = orderBy(mergedList, sortSetting.key, sortSetting.order);

  if (filterSettings && filterSettings.length > 0) {
    filterSettings.forEach(setting => {
      switch (setting.attribute) {
        case 'sex':
          if (setting.value >= 0) {
            results = results.filter(
              golfer => golfer.reserved === setting.value,
            );
          }
          break;
        case 'hat':
          results = results.filter(golfer => golfer.hat === setting.value);
          break;
        default:
          break;
      }

      results = results.slice(0, scrollIndex);
    });
  }

  return results;
}

const filteredAvailable = createSelector(
  [availableSelector, filterSelector, sortSelector, scrollSelector],
  (availableGolfers, filterSettings, sortSetting, scrollIndex) => {
    let results = sortFromFilter(
      availableGolfers,
      sortSetting,
      filterSettings,
      scrollIndex,
    );
    results = results.slice(0, scrollIndex);
    return results;
  },
);

const filteredArtistGolfers = createSelector(
  [filteredAvailable],
  available => {
    if (available.length === 0) return [];
    return available.filter(
      el =>
        el &&
        el.type &&
        el.type !== 'TBD' &&
        el.type !== 'ckgolfer' &&
        el.type !== 'superpunch' &&
        el.type !== '',
    );
  },
);

export { filteredArtistGolfers, filteredAvailable };
