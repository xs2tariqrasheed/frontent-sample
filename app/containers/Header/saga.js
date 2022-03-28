/**
 * Gets the repositories of the user from Github
 */

import { select, call, put, takeLatest } from 'redux-saga/effects';
import md5 from 'md5';
import appboy from 'appboy-web-sdk';
import { getMyBlockletes, getMyGear } from 'utils/flow/flowConnector';
import axios from 'utils/axios';
import {
  LOAD_MY_GOLFERS,
  UPDATE_USER,
  LOAD_MY_WATCHLIST,
  CHECK_FOR_WALLET,
  GET_RANDOM_GOLFER,
  LOAD_MY_MEDALS,
  LOAD_MY_GEAR,
} from './constants';
import {
  availableLoadingError,
  myGolfersLoaded,
  myGolfersLoadingError,
  updateBrazeInfo,
  myWatchListLoaded,
  randomGolferForDemo,
  myMedalsLoaded,
  myGearLoaded,
} from './actions';

// TODO - Need to deprecate all this.
import { updateEthAddress } from '../UserModal/action';

export function* updateBrazeUserInfo() {
  try {
    console.log('[Header/saga | updateBrazeUserInfo');
    const {
      user: { email, username, consentOffers, consentAffiliates },
      myGolfers,
    } = yield select();
    const user = appboy.getUser();
    appboy.changeUser(md5(email));
    user.setEmail(email);
    user.setCustomUserAttribute('username', username);
    user.setCustomUserAttribute('signup_source', 'SITE');
    user.setCustomUserAttribute(
      'number_of_golfers',
      myGolfers.myGolfers.length,
    );
    user.setCustomUserAttribute('Offers Consent', consentOffers);
    user.setCustomUserAttribute('Affiliates Consent', consentAffiliates);
    user.addToCustomAttributeArray('golfers', myGolfers.myGolfers);
    yield put(updateBrazeInfo(user));
  } catch (err) {
    throw err;
  }
}

export function* getMyGolferDetails(golferArray) {
  // Modify later.
  // Should pull based on the info passed in.
  // console.log('getMyGolferDetails', golferArray)
  try {
    let finalGolferArray = [];
    // for (let chunk = 0; chunk < golferArray.length; chunk += 35) {
      // const reqArray = JSON.stringify(golferArray.slice(chunk, chunk + 35));
      const reqArray = JSON.stringify([623,624,591,491,391,234,345,456,444,333,222]);
      const golfers = yield call(
        axios.get,
        `/public/golftoken/golfTokenArray/${reqArray}`,
      );
      finalGolferArray = finalGolferArray.concat(golfers.data.golferArray);
    // }

    // console.log('Final Golfer Array3 - ', finalGolferArray)

    yield put(myGolfersLoaded(finalGolferArray));
  } catch (err) {
    yield put(availableLoadingError(err));
  }
}

export function* getMyGolfers(data) {
  try {
    console.log('Getting in the following for address = ', data.payload)
    const golfers = yield call(getMyBlockletes, data.payload.flowAddress);
    // const golfers = getMyBlockletes(data.payload.flowAddress)
    // console.log('golfers response getmygolfers', golfers)
    yield call(getMyGolferDetails, golfers);
  } catch (err) {
    yield put(myGolfersLoadingError(err));
  }
}

export function* getMyWatchlist(obj) {
  try {
    const dataObj = {
      uuid: obj.uuid,
    };
    const myList = yield call(
      axios.post,
      `/private/watchlist/getallmy`,
      dataObj,
    );

    yield put(myWatchListLoaded(myList.data));
  } catch (error) {
    // console.log(error)
  }
}

export function* getRandomGolfer() {
  // Call our request helper (see 'utils/request')
  const golfer = yield call(axios.get, `/public/itasrandomtoken`);
  yield put(randomGolferForDemo(golfer.data));
}

export function* getMedals() {
  const myMedals = yield call(axios.get, `/private/user/medalsaccount`);

  yield put(myMedalsLoaded(myMedals.data));
}

export function* getGear(data) {
  try {
    console.log('[gear] Getting in the following for address = ', data.payload)
    // const gear = yield call(getMyGear, data.payload.flowAddress);
    const gear = JSON.stringify([1,2,3,4,5,6,7,8,9,10]);
    console.log('gear response getMyGear', gear);
    yield call(getGearDetails, gear);
  }
  catch (err) {
    yield put(myGolfersLoadingError(err));
  }
}

export function* getGearDetails(gearArray) {
  console.log('getGearDetails', gearArray)
  try {
    let finalGearArray = [
      {tokenid: 1, stable: true, type:'driver', style:['founder', 'classic'], rarity:'novice', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Driver01.0001.png', accuracytotal: 10, composuretotal: 10, staminatotal: 0, powertotal: 0},
      {tokenid: 2, stable: false, type:'driver', style:['founder', 'classic'], rarity:'novice', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Driver01.0001.png', accuracytotal: 10, composuretotal: 10, staminatotal: 0, powertotal: 0},
      {tokenid: 3, stable: true, type:'driver', style:['founder', 'modern'], rarity:'pro', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Driver02.0001.png', accuracytotal: 10, composuretotal: 0, staminatotal: 10, powertotal: 0},
      {tokenid: 4, stable: true, type:'longiron', style:['founder', 'classic'], rarity:'elite', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Longiron01.0001.png', accuracytotal: 10, composuretotal: 0, staminatotal: 0, powertotal: 10},
      {tokenid: 5, stable: true, type:'longiron', style:['founder', 'modern'], rarity:'legend', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Longiron02.0001.png', accuracytotal: 0, composuretotal: 10, staminatotal: 10, powertotal: 0},
      {tokenid: 6, stable: true, type:'shortiron', style:['founder', 'classic'], rarity:'novice', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Shortiron01.0001.png', accuracytotal: 0, composuretotal: 10, staminatotal: 0, powertotal: 10},
      {tokenid: 7, stable: false, type:'shortiron', style:['founder', 'classic'], rarity:'novice', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Shortiron01.0001.png', accuracytotal: 0, composuretotal: 10, staminatotal: 0, powertotal: 10},
      {tokenid: 8, stable: true, type:'shortiron', style:['founder', 'modern'], rarity:'pro', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Shortiron02.0001.png', accuracytotal: 0, composuretotal: 0, staminatotal: 10, powertotal: 10},
      {tokenid: 9, stable: true, type:'wedge', style:['founder', 'classic'], rarity:'elite', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Wedge01.0001.png', accuracytotal: 10, composuretotal: 10, staminatotal: 0, powertotal: 0},
      {tokenid: 10, stable: true, type:'wedge', style:['founder', 'modern'], rarity:'legend', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Wedge02.0001.png', accuracytotal: 10, composuretotal: 0, staminatotal: 10, powertotal: 0},
      {tokenid: 11, stable: false, type:'wedge', style:['founder', 'modern'], rarity:'legend', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Wedge02.0001.png', accuracytotal: 10, composuretotal: 0, staminatotal: 10, powertotal: 0},
      {tokenid: 12, stable: true, type:'putter', style:['founder', 'classic'], rarity:'novice', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Putter01.0001.png', accuracytotal: 10, composuretotal: 0, staminatotal: 0, powertotal: 10},
      {tokenid: 13, stable: false, type:'putter', style:['founder', 'modern'], rarity:'pro', skin:'https://staging.blockletegames.com/images/gear/items/golf_clubs_master_v02_Putter02.0001.png', accuracytotal: 0, composuretotal: 10, staminatotal: 10, powertotal: 0},
    ];
    // let finalGearArray = [];
    // for (let chunk = 0; chunk < gearArray.length; chunk += 35) {
    //   const reqArray = JSON.stringify(gearArray.slice(chunk, chunk + 35));
    //   console.log('reqArray', reqArray);
    //   const gear = yield call(
    //     axios.get,
    //     `/public/golftoken/golfTokenArray/${reqArray}`,
    //   );
    //   finalGearArray = finalGearArray.concat(gear.data.golferArray);
    // }
    console.log('Final Gear Array - ', finalGearArray);
    yield put(myGearLoaded(finalGearArray));
  } catch (err) {
    yield put(availableLoadingError(err));
  }
}

export function* checkForWallet(action) {
  const obj = {
    userid: action.uuid,
  };
  const response = yield call(axios.post, `/private/wallet/find`, obj);

  if (response.data.wallet && response.data.wallet !== '') {
    yield put(updateEthAddress(response.data.wallet));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* founderData() {
  yield takeLatest(LOAD_MY_GOLFERS, getMyGolfers);
  yield takeLatest(UPDATE_USER, updateBrazeUserInfo);
  yield takeLatest(LOAD_MY_WATCHLIST, getMyWatchlist);
  yield takeLatest(CHECK_FOR_WALLET, checkForWallet);
  yield takeLatest(GET_RANDOM_GOLFER, getRandomGolfer);
  yield takeLatest(LOAD_MY_MEDALS, getMedals);
  yield takeLatest(LOAD_MY_GEAR, getGear);
}
