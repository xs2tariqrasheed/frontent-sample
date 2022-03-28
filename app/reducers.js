/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import userReducer from 'containers/UserModal/reducer';
import availableGolferReducer from 'containers/Marketplace/reducer';
import availableGearReducer from 'containers/Marketplace/reducer';
import settingsReducer from 'containers/Marketplace/settingsReducer';
import myGolferReducer from 'containers/MyGolfers/reducer';
import clubhouseSettingsReducer from 'containers/MyGolfers/settingsReducer';
import headerReducer from 'containers/Header/reducer';
import golferDetailsReducer from 'containers/GolferDetails/reducer';
import gearDetailsReducer from 'containers/GearDetails/reducer';
import eventsReducer from './containers/Events/reducer';
import eventDetailsReducer from './containers/EventDetails/reducer';
import watchlistReducer from './containers/WatchlistMarket/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    user: userReducer,
    availableGolfers: availableGolferReducer,
    availableGear: availableGearReducer,
    marketplaceSettings: settingsReducer,
    myGolfers: myGolferReducer,
    clubhouseSettings: clubhouseSettingsReducer,
    golferdetails: golferDetailsReducer,
    gearDetails: gearDetailsReducer,
    eventDetails: eventDetailsReducer,
    events: eventsReducer,
    router: connectRouter(history),
    headerInfo: headerReducer,
    watchlist: watchlistReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
