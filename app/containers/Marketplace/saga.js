import { call, takeLatest, put, select } from 'redux-saga/effects';
import axios from 'utils/axios';
import {
  LOAD_BLOCKLETES_FOR_SALE,
  SORT_GOLFERS,
  UPDATE_CURRENT_FILTERS,
  LOAD_GEAR_FOR_SALE,
} from './constants';
import { blockletesForSale, updateFilteredGolfers, gearForSale } from './actions';

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

/* When filterGolfers is dispatched from filter component, use array of currentFilters
  to return correct golfers
 */
function* filterGolfers(action) {
  try {
    // retrieve availableGolfers and array of filters from redux
    const availableGolfers = yield select();
    const marketplaceSettings = yield select();
    const sortingValue = marketplaceSettings.sortGolfers
      ? marketplaceSettings.sortGolfers
      : { tokenId : 'mostRecent' };

    let filter = marketplaceSettings.marketplaceSettings.currentFilters;

    //filter array of available golfers based on the current filters
    let filteredValues = availableGolfers.availableGolfers.availableGolfers.filter(
      golfer => {
        //CLEAR FILTERS
        if(filter.clear) {
          console.log('clear?')
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

        //GEAR TYPE
        if (filter.type) {

        }
        return true;
      },
    );

    const data = yield filteredValues;

    const sortInput = { filteredValues: data, ...sortingValue };
    //call the function sortGolfers to take into account any currently selected sorting values
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
    yield put(updateFilteredGolfers(finalValues));
  } else if (action.filteredValues) {
    // console.log('filters')
    let finalValues = [...action.filteredValues];
    const { price, tokenId, pageLoad } = action;
    // console.log('action', action)
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
      console.log('pageload?')
      finalValues = finalValues.sort((a, b) => {
        return b.tokenid - a.tokenid;
      });
    }
    yield put(updateFilteredGolfers(finalValues));
  }
}

function* fetchGearForSale() {
  try {
    // const golfers = yield call(axios.get, `/public/allgearforsale`);

    const availableGear = [
      {tokenid: 1, type:'driver', style:['founder', 'classic'], rarity:'novice', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Driver01.0001.png', accuracytotal: 10, composuretotal: 10, staminatotal: 0, powertotal: 0, price:169},
      {tokenid: 2, type:'driver', style:['founder', 'modern'], rarity:'pro', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Driver02.0001.png', accuracytotal: 10, composuretotal: 0, staminatotal: 10, powertotal: 0, price:282},
      {tokenid: 3, type:'longiron', style:['founder', 'classic'], rarity:'elite', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Longiron01.0001.png', accuracytotal: 10, composuretotal: 0, staminatotal: 0, powertotal: 10, price:35},
      {tokenid: 4, type:'longiron', style:['founder', 'modern'], rarity:'legend', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Longiron02.0001.png', accuracytotal: 0, composuretotal: 10, staminatotal: 10, powertotal: 0, price:43},
      {tokenid: 5, type:'shortiron', style:['founder', 'classic'], rarity:'novice', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Shortiron01.0001.png', accuracytotal: 0, composuretotal: 10, staminatotal: 0, powertotal: 10, price:990},
      {tokenid: 6, type:'shortiron', style:['founder', 'modern'], rarity:'pro', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Shortiron02.0001.png', accuracytotal: 0, composuretotal: 0, staminatotal: 10, powertotal: 10, price:113},
      {tokenid: 7, type:'wedge', style:['founder', 'classic'], rarity:'elite', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Wedge01.0001.png', accuracytotal: 10, composuretotal: 10, staminatotal: 0, powertotal: 0, price:66},
      {tokenid: 8, type:'wedge', style:['founder', 'modern'], rarity:'legend', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Wedge02.0001.png', accuracytotal: 10, composuretotal: 0, staminatotal: 10, powertotal: 0, price:293},
      {tokenid: 9, type:'putter', style:['founder', 'classic'], rarity:'novice', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Putter01.0001.png', accuracytotal: 10, composuretotal: 0, staminatotal: 0, powertotal: 10, price:459},
      {tokenid: 10, type:'putter', style:['founder', 'modern'], rarity:'pro', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Putter02.0001.png', accuracytotal: 0, composuretotal: 10, staminatotal: 10, powertotal: 0, price:137},
    ];
    console.log('[Marketplace | saga] - fetchGearForSale', availableGear);
    yield put(gearForSale(availableGear));
  } catch (err) {
    console.log(err);
  }
}

export default function* marketplaceSaga() {
  yield takeLatest(LOAD_BLOCKLETES_FOR_SALE, fetchBlockletesForSale);
  yield takeLatest(UPDATE_CURRENT_FILTERS, filterGolfers);
  yield takeLatest(SORT_GOLFERS, sortGolfers);
  yield takeLatest(LOAD_GEAR_FOR_SALE, fetchGearForSale);
 
}
