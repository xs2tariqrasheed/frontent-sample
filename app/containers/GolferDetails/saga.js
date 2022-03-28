import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'utils/axios';
import {
  GET_GOLFER_DETAILS,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
} from './constants';
import {
  setTokenDetails,
  AppendToMyWatchlist,
  getGolferDetails as getGolferDetailsAction,
  golferEventHistory,
  removeFromWatchlist,
  addToWatchList
} from './actions';
// Re-work this pulling from backend on the sales even.  Can then get the ITAS or player selling it.

function* getGolferDetails(tokenId) {
  const tokenArray = [];
  tokenArray.push(tokenId.tokenId);
  const finalValue = JSON.stringify(tokenArray);

  const golfer = yield call(
    axios.get,
    `/public/golftoken/golfTokenArray/${finalValue}`,
  );

  // console.log('golfer details array/golferdetails saga', golfer)

  const golferSalesData = yield call(
    axios.get,
    `/public/golftoken/golfTokenSalesInfo/${tokenId.tokenId}`,
  );

  const golferSalesHistory = yield call(
    axios.get,
    `/public/salehistory/${tokenId.tokenId}`,
  );

  const golferSalesStats = yield call(
    axios.get,
    `/public/salestats/${golfer.data.golferArray[0].GolfType.class}`,
  );

  const newGolfer = golfer.data.golferArray[0];
  newGolfer.price = +golferSalesData.data.price;
  newGolfer.forSale = golferSalesData.data.forSale;
  newGolfer.owner = golferSalesData.data.owner
    ? golferSalesData.data.owner
    : golfer.data.golferArray[0].owner;
  newGolfer.itasGolfer = golferSalesData.data.itasGolfer;
  newGolfer.isAuction = golferSalesData.data.isAuction;
  newGolfer.flowaddress = golferSalesData.data.flowaddress;
  newGolfer.saleHistory = golferSalesHistory.data;
  newGolfer.saleStats = golferSalesStats.data[0];

  yield put(setTokenDetails(newGolfer));

  const eventHistory = yield call(
    axios.get,
    `/public/contests/golferresults/${tokenId.tokenId}`,
  );
  yield put(golferEventHistory(eventHistory.data));
}

function* addToMyWatchlist(watchData) {
  console.log('add to watchlist fired')
  try {
    const obj = {
      uuid: watchData.golfer.userId,
      tokenId: watchData.golfer.tokenId,
    };
    // Firing best effort.
    yield call(axios.post, `/private/watchlist/add`, obj);

    yield put(getGolferDetailsAction(obj.tokenId));

    const finalValue = JSON.stringify([obj.tokenId]);
    const golfer = yield call(
      axios.get,
      `/public/golftoken/golfTokenArray/${finalValue}`,
    );
   
    const golferData = golfer.data.golferArray[0];
    const collectibleType = golferData.GolfType.class;
    const golferSalesStats = yield call(
      axios.get,
      `/public/salestats/${collectibleType}`,
    );
    console.log('sales stats?', golferSalesStats)
    golferData.price = golferSalesStats.data.price;

    console.log(golferData)

    window.dataLayer.push({
      event: 'add to watchlist',
      event_source_page: window.location.href,
      event_version: 'v2',
      golfer_type: collectibleType,
      listed_price: golferData.itasGolfersSale.price,
      item_description: 'golfer ' + collectibleType,
    });
  } catch (error) {
    console.log(error)
  }
}

function* removeFromMyWatchlist(watchData) {
  console.log('in remove from watchlist saga')
  try {
    const obj = {
      uuid: watchData.dataObj.userId,
      tokenId: watchData.dataObj.tokenId,
    };

    // Firing best effort.
    yield call(axios.post, `/private/watchlist/remove`, obj);
    yield put(removeFromWatchList(watchData.golfer));

    yield put(getGolferDetailsAction(obj.tokenId));
  } catch (error) {
    // console.log(error);
  }
}

export default function* golferDetailsSaga() {
  yield takeEvery(GET_GOLFER_DETAILS, getGolferDetails);
  yield takeLatest(ADD_TO_WATCHLIST, addToMyWatchlist);
  yield takeLatest(REMOVE_FROM_WATCHLIST, removeFromMyWatchlist);
}
