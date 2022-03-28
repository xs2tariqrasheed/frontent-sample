import invariant from 'invariant';
import { isEmpty, isFunction, isString } from 'lodash';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import expireReducer from 'redux-persist-expire';
import createReducer from '../reducers';
import checkStore from './checkStore';

export function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    );

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    )
      return;

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign

    const persistConfig = {
      key: 'root',
      storage,
      blacklist: ['headerInfo', 'router', 'marketplaceSettings'],
      transforms: [
        expireReducer('user', {
          persistedAtKey: 'loadedAt',
          expireSeconds: 7200,
          expiredState: {
            email: '',
            username: '',
            uuid: '',
            ethaddress: '',
            loadedAt: '',
          },
        }),
      ],
    };
    const persistedReducer = persistReducer(
      persistConfig,
      createReducer(store.injectedReducers),
    );

    store.replaceReducer(persistedReducer);
  };
}

export default function getInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
