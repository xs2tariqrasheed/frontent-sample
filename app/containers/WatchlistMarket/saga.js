import { call, takeLatest, put, select } from 'redux-saga/effects';
import {
    SORT_WATCHLIST_GOLFERS,
    UPDATE_WATCHLIST_FILTERS,
} from './constants';
import { updateWatchlistGolfers } from './actions';
import axios from 'utils/axios';

function* filterGolfers(action) {
    try {
      // retrieve availableGolfers and array of filters from redux
      const watchlist = yield select();
      const marketplaceSettings = yield select();
      const sortingValue = watchlist.watchlist.sortWatchlistGolfers 
        ? watchlist.watchlist.sortWatchlistGolfers
        : { tokenId : 'mostRecent' };

      // const myGolfers = yield select();

      let filter = watchlist.watchlist.currentWatchlistFilters;
      let myList = [];

      if(filter.uuid) {
        console.log('filter.uuid', filter.uuid)
        let dataObj = {
          uuid: filter.uuid
        }
         myList = yield call(
          axios.post,
          `/private/watchlist/getallmy`,
          dataObj,
        );
      }

      console.log('saga/watchlist/myList', myList)
      console.log('filter in saga', filter)

      const unfilteredGolfers = myList.data;
      // console.log('unfilteredGolfers', unfilteredGolfers)

      const unfilteredData = unfilteredGolfers.map(g => (g.GolferToken));
      const allAvailableGolfers = marketplaceSettings.availableGolfers.availableGolfers;

     const dataWithPrice =  unfilteredData.map(g => {
        let golfer = allAvailableGolfers.find(golfer => g.tokenid === golfer.tokenid);
        return golfer;
      })
      
      let filteredValues = dataWithPrice.filter(
        golfer => {
          //CLEAR FILTERS
          if(filter.clear || filter.pageLoad) {
            filter.minSkill = 0;
            filter.maxSkill = 4000;
            filter.minPrice = 0;
            filter.maxPrice = 100000;
            filter.minId = 0;
            filter.maxId = 100000;
            filter.pro = false;
            filter.novice = false;
            filter.legend = false;
            filter.elite = false;
            filter.minPower = 0;
            filter.maxPower = 1000;
            filter.minAccuracy = 0;
            filter.maxAccuracy = 1000;
            filter.minComposure = 0;
            filter.maxComposure = 1000;
            filter.minStamina = 0;
            filter.maxStamina = 1000;
            filter.minPeakPower = 0;
            filter.maxPeakPower = 1000;
            filter.minPeakAccuracy = 0;
            filter.maxPeakAccuracy = 1000;
            filter.minPeakComposure = 0;
            filter.maxPeakComposure = 1000;
            filter.minPeakStamina = 0;
            filter.maxPeakStamina = 1000;
            filter.clear = false;
            filter.pageLoad = false;
          }
          //PRICE
          if (filter.minPrice || filter.maxPrice) {
            if (filter.minPrice == '') filter.minPrice = 0;
            if (filter.maxPrice == '') filter.maxPrice = 100000;
            let priceMatch =
              parseInt(golfer.price) >= parseInt(filter.minPrice) &&
              parseInt(golfer.price) <= parseInt(filter.maxPrice);
            if (!priceMatch) return false;
          }
          //TOKENID
          if (filter.minId || filter.maxId) {
            if (filter.minId == '') filter.minId = 0;
            if (filter.maxId == '') filter.maxId = 100000;
            let idMatch =
              parseInt(golfer.tokenid) >= parseInt(filter.minId) &&
              parseInt(golfer.tokenid) <= parseInt(filter.maxId);
            if (!idMatch) return false;
          }
          //RARITY
          if (filter.pro || filter.novice || filter.legend || filter.elite) {
            let selectedCollectibles = [];
            // get collectible filter keys e.g. Pro, Novice etc.
            let objKeys = Object.keys(filter);
            // loop thru keys
            for (let i = 0, len = objKeys.length; i < len; i++) {
              // ensure each key is actually a collectible key AND is checked
              if (
                ['pro', 'novice', 'elite', 'legend'].includes(objKeys[i]) &&
                filter[objKeys[i]]
              ) {
                // push checked collectible keys to an array
                selectedCollectibles.push(objKeys[i]);
              }
            }
            // ensure current golfer's collectible type is incldued in what's currently selected/checked
            let collectibleMatch = selectedCollectibles.includes(
              golfer.class.split(' ')[0],
            );
            if (!collectibleMatch) return false;
          }
  
          
          //POWER
          if (filter.minPower || filter.maxPower) {
            let powerMatch =
              parseInt(golfer.powertotal) >= parseInt(filter.minPower) &&
              parseInt(golfer.powertotal) <= parseInt(filter.maxPower);
            if (!powerMatch) return false;
          }
  
          //ACCURACY
          if (filter.minAccuracy || filter.maxAccuracy) {
            let accuracyMatch =
              parseInt(golfer.accuracytotal) >= parseInt(filter.minAccuracy) &&
              parseInt(golfer.accuracytotal) <= parseInt(filter.maxAccuracy);
            if (!accuracyMatch) return false;
          }
  
        //COMPOSURE
        if (filter.minComposure || filter.maxComposure) {
          let focusMatch =
            parseInt(golfer.composuretotal) >= parseInt(filter.minComposure) &&
            parseInt(golfer.composuretotal) <= parseInt(filter.maxComposure);
          if (!focusMatch) return false;
        }

         //STAMINA
        if (filter.minStamina || filter.maxStamina) {
          let staminaMatch =
            parseInt(golfer.staminatotal) >= parseInt(filter.minStamina) &&
            parseInt(golfer.staminatotal) <= parseInt(filter.maxStamina);
          if (!staminaMatch) return false;
        }

        //PEAK POWER
        if (filter.minPeakPower || filter.maxPeakPower) {
          let peakPowerMatch =
            parseInt(golfer.powerpeak) >= parseInt(filter.minPeakPower) &&
            parseInt(golfer.powerpeak) <= parseInt(filter.maxPeakPower);
          if (!peakPowerMatch) return false;
        }

        //PEAK ACCURACY
        if (filter.minPeakAccuracy || filter.maxPeakAccuracy) {
          let peakAccuracyMatch =
            parseInt(golfer.accuracypeak) >= parseInt(filter.minPeakAccuracy) &&
            parseInt(golfer.accuracypeak) <= parseInt(filter.maxPeakAccuracy);
          if (!peakAccuracyMatch) return false;
        }

        //PEAK COMPOSURE
        if (filter.minPeakComposure || filter.maxPeakComposure) {
          let peakComposureMatch =
            parseInt(golfer.composurepeak) >= parseInt(filter.minPeakComposure) &&
            parseInt(golfer.composurepeak) <= parseInt(filter.maxPeakComposure);
          if (!peakComposureMatch) return false;
        }

        //PEAK STAMINA
        if (filter.minPeakStamina || filter.maxPeakStamina) {
          let peakStaminaMatch =
            parseInt(golfer.staminapeak) >= parseInt(filter.minPeakStamina) &&
            parseInt(golfer.staminapeak) <= parseInt(filter.maxPeakStamina);
          if (!peakStaminaMatch) return false;
        }
          return true;
        }
      )
  
      const data = yield filteredValues;

      const sortInput = { filteredValues: data, ...sortingValue };

      // call the function sortGolfers to take into account any currently selected sorting values
      yield call(sortGolfers, sortInput);
    } catch (err) {
      console.log(err);
    }
  }

  function* sortGolfers(action) {
    if (action.sortBy) {
      const { currentArray, price, tokenId } = action.sortBy;

      let finalValues = [...currentArray];
      if (price && price == 'lowToHigh') {
        finalValues = finalValues.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (price && price == 'highToLow') {
        finalValues = finalValues.sort((a, b) => {
          return b.price - a.price;
        });
      } else if (tokenId && tokenId == 'mostRecent') {
        finalValues = finalValues.sort((a, b) => {
          return parseInt(b.tokenid) - parseInt(a.tokenid);
        });
      } else if (tokenId && tokenId == 'leastRecent') {
        finalValues = finalValues.sort((a, b) => {
          return parseInt(a.tokenid) - parseInt(b.tokenid);
        });
      }
      yield put(updateWatchlistGolfers(finalValues));
    } else if (action.filteredValues) {
      let finalValues = [...action.filteredValues];
      const { price, tokenId, pageLoad } = action;
      if (price && price == 'lowToHigh') {
        finalValues = finalValues.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (price && price == 'highToLow') {
        finalValues = finalValues.sort((a, b) => {
          return b.price - a.price;
        });
      } else if (tokenId && tokenId == 'mostRecent') {
        finalValues = finalValues.sort((a, b) => {
          return b.tokenid - a.tokenid;
        });
      } else if (tokenId && tokenId == 'leastRecent') {
        finalValues = finalValues.sort((a, b) => {
          return a.tokenid - b.tokenid;
        });
      } else if (pageLoad) {
        finalValues = finalValues.sort((a, b) => {
          return b.tokenid - a.tokenid;
        });
      }
      yield put(updateWatchlistGolfers(finalValues));
    }
  }


export default function* watchlistSaga() {
    yield takeLatest( UPDATE_WATCHLIST_FILTERS, filterGolfers);
    yield takeLatest(SORT_WATCHLIST_GOLFERS, sortGolfers);
  }
  