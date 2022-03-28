import { call, takeLatest, put, select } from 'redux-saga/effects';
import axios from 'utils/axios';
import {
  SORT_GOLFERS,
  UPDATE_CURRENT_FILTERS,
  LOAD_BLOCKLETES_FOR_SALE,
} from './constants';
import { updateFilteredGolfers, blockletesForSale } from './actions';


function* sortGolfers(action) {
  if (action.sortBy) {
    const { currentArray, sortBy } = action.sortBy;
    const filteredValues = action.filteredValues ? action.filteredValues : [];
    let finalValues = [];
    if (filteredValues.length > 0) {
      finalValues = [...filteredValues];
    }
    else if (filteredValues.length == 0 && action.filtered) {
      finalValues = [];
    }
    else if (currentArray && currentArray.length > 0) {
      finalValues = [...currentArray];
    }
    finalValues = finalValues.sort((a, b) => {
      return b[sortBy] - a[sortBy];
    });
    yield put(updateFilteredGolfers(finalValues));
  }
}

function* filterGolfers(action) {
  try {
    const selectObj = yield select();
    const clubhouseSettings = selectObj.clubhouseSettings;
    const availableGolfers = selectObj.headerInfo.myGolfers;
    const sortingValue = clubhouseSettings.sortGolfers ? clubhouseSettings.sortGolfers : { '': '' };
    let filter = '';
    if (clubhouseSettings.currentFilters) {
      if (clubhouseSettings.currentFilters.filter) {
        filter = clubhouseSettings.currentFilters.filter;
      }
      else {
        filter = clubhouseSettings.currentFilters;
      }
    }
    else if (action.filter.pageLoad) {
      filter = action.filter;
    }
    else {
      filter = action.filter.filter;
    }
    let filteredValues = [];
    //filter array of available golfers based on the current filters
    if (filter == 'All' || filter.pageLoad || filter == '') {
      filteredValues = availableGolfers;
    }
    else {
      filteredValues = availableGolfers.filter(
        golfer => {
          if (filter.toLowerCase() == golfer.rarity) {
            return true;
          }
          else {
            return false;
          }
        }
      );
    }

    const data = yield filteredValues;
    console.log('[MyGolfer/Saga | filterGolfers] - data', data);
    const sortInput = { filteredValues: data, ...sortingValue, filtered: true };
    //call the function sortGolfers to take into account any currently selected sorting values
    yield call(sortGolfers, sortInput);
  } catch (err) {
    console.log(err);
  }
}

export function* getMyGolferDetails(golferArray) {
  // Modify later.
  // Should pull based on the info passed in.
  try {
    let finalGolferArray = [];
    for (let chunk = 0; chunk < golferArray.length; chunk += 35) {
      const reqArray = JSON.stringify(golferArray.slice(chunk, chunk + 35));
      const golfers = yield call(
        axios.get,
        `/public/golftoken/golfTokenArray/${reqArray}`,
      );
      finalGolferArray = finalGolferArray.concat(golfers.data.golferArray);
    }

    yield put(myGolfersLoaded(finalGolferArray));
  } catch (err) {
    yield put(availableLoadingError(err));
  }
}

function* fetchBlockletesForSale() {
  try {
    const golfers = yield call(axios.get, `/public/allblockletesforsale`);

    const availableGolfers = [];
    golfers.data.itas.map(golfer => {
      const traits = JSON.parse(golfer.GolferToken.traits);
      let price = +golfer.price;
      price = price.toFixed(2);
      const obj = {
        tokenid: golfer.tokenid,
        seller: golfer.flowaddress,
        playerGolfer: golfer.playergolfer,
        name: golfer.GolferToken.name,
        powertotal: golfer.GolferToken.powertotal,
        accuracytotal: golfer.GolferToken.accuracytotal,
        composuretotal: golfer.GolferToken.composuretotal,
        staminatotal: golfer.GolferToken.staminatotal,
        powerpeak: golfer.GolferToken.powerpeak,
        accuracypeak: golfer.GolferToken.accuracypeak,
        composurepeak: golfer.GolferToken.composurepeak,
        staminapeak: golfer.GolferToken.staminapeak,
        image_url: traits.image_url,
        specialability1: golfer.GolferToken.specialability1,
        specialability2: golfer.GolferToken.specialability2,
        specialability3: golfer.GolferToken.specialability3,
        dnaversion: golfer.GolferToken.dnaversion,
        reserved: golfer.GolferToken.reserved,
        shape: golfer.GolferToken.shape,
        skintone: golfer.GolferToken.skintone,
        hair: golfer.GolferToken.hair,
        eyes: golfer.GolferToken.eyes,
        nose: golfer.GolferToken.nose,
        mouth: golfer.GolferToken.mouth,
        eyebrows: golfer.GolferToken.eyebrows,
        shirt: golfer.GolferToken.shirt,
        pants: golfer.GolferToken.pants,
        shoes: golfer.GolferToken.shoes,
        hat: golfer.GolferToken.hat,
        driver: golfer.GolferToken.driver,
        lookattribute1: golfer.GolferToken.lookattribute1,
        lookattribute2: golfer.GolferToken.lookattribute2,
        lookattribute3: golfer.GolferToken.lookattribute3,
        lookattribute4: golfer.GolferToken.lookattribute4,
        lookattribute5: golfer.GolferToken.lookattribute5,
        watchcount: golfer.GolferToken.watchcount,
        GolferUpgrade: golfer.GolferToken.GolferUpgrade,
        price,
        class: golfer.GolferToken.GolfType
          ? golfer.GolferToken.GolfType.class
          : 'novice',
        type: golfer.GolferToken.GolfType
          ? golfer.GolferToken.GolfType.type
          : 'TBD',
        filtertags: golfer.GolferToken.GolferDescriptionDetails,
      };

      availableGolfers.push(obj);
      return obj;
    });

    golfers.data.p2p.map(golfer => {
      let price = +golfer.price;
      price = price.toFixed(2);
      const traits = JSON.parse(golfer.GolferToken.traits);

      const obj = {
        tokenid: golfer.tokenid,
        seller: golfer.flowaddress,
        playerGolfer: golfer.playergolfer,
        name: golfer.GolferToken.name,
        powertotal: golfer.GolferToken.powertotal,
        accuracytotal: golfer.GolferToken.accuracytotal,
        composuretotal: golfer.GolferToken.composuretotal,
        staminatotal: golfer.GolferToken.staminatotal,
        powerpeak: golfer.GolferToken.powerpeak,
        accuracypeak: golfer.GolferToken.accuracypeak,
        composurepeak: golfer.GolferToken.composurepeak,
        staminapeak: golfer.GolferToken.staminapeak,
        image_url: traits.image_url,
        specialability1: golfer.GolferToken.specialability1,
        specialability2: golfer.GolferToken.specialability2,
        specialability3: golfer.GolferToken.specialability3,
        dnaversion: golfer.GolferToken.dnaversion,
        reserved: golfer.GolferToken.reserved,
        shape: golfer.GolferToken.shape,
        skintone: golfer.GolferToken.skintone,
        hair: golfer.GolferToken.hair,
        eyes: golfer.GolferToken.eyes,
        nose: golfer.GolferToken.nose,
        mouth: golfer.GolferToken.mouth,
        eyebrows: golfer.GolferToken.eyebrows,
        shirt: golfer.GolferToken.shirt,
        pants: golfer.GolferToken.pants,
        shoes: golfer.GolferToken.shoes,
        hat: golfer.GolferToken.hat,
        driver: golfer.GolferToken.driver,
        lookattribute1: golfer.GolferToken.lookattribute1,
        lookattribute2: golfer.GolferToken.lookattribute2,
        lookattribute3: golfer.GolferToken.lookattribute3,
        lookattribute4: golfer.GolferToken.lookattribute4,
        lookattribute5: golfer.GolferToken.lookattribute5,
        watchcount: golfer.GolferToken.watchcount,
        GolferUpgrade: golfer.GolferToken.GolferUpgrade,
        price,
        class: golfer.GolferToken.GolfType
          ? golfer.GolferToken.GolfType.class
          : 'novice',
        type: golfer.GolferToken.GolfType
          ? golfer.GolferToken.GolfType.type
          : 'TBD',
        filtertags: golfer.GolferToken.GolferDescriptionDetails,
      };

      availableGolfers.push(obj);
      return obj;
    });
    yield put(blockletesForSale(availableGolfers));
  } catch (err) {
    console.log(err);
  }
}

export default function* packSaga() {
  yield takeLatest(SORT_GOLFERS, sortGolfers);
  yield takeLatest(UPDATE_CURRENT_FILTERS, filterGolfers);
  yield takeLatest(LOAD_BLOCKLETES_FOR_SALE, fetchBlockletesForSale);
}
