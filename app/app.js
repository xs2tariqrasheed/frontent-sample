/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

import './index.css';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import appboy from 'appboy-web-sdk';
import TagManager from 'react-gtm-module';
import TwitterConvTrkr from 'react-twitter-conversion-tracker-plus';
import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const tagManagerArgs = {
  gtmId: process.env.GTM_ID,
  auth: process.env.GTM_AUTH,
  preview: process.env.GTM_PREVIEW,
};

TagManager.initialize(tagManagerArgs);

appboy.initialize(process.env.BRAZE_KEY, {
  baseUrl: 'https://sdk.iad-03.braze.com/api/v3',
  enableLogging: true,
});
appboy.display.automaticallyShowNewInAppMessages();
appboy.openSession();

TwitterConvTrkr.init('init', 'o4jfg');
TwitterConvTrkr.track('PageView');

const render = messages => {
  ReactDOM.render(
    <Provider store={store.store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// Adding some lifecycle management to the service worker to
// force a cache flush on new versions.

/*eslint-disable */

if (process.env.NODE_ENV === 'production') {
  var OfflinePlugin = require('offline-plugin/runtime');
  OfflinePlugin.install({
    onUpdating: () => {
      console.log('SW Event:', 'onUpdating');
    },
    onUpdateReady: () => {
      console.log('SW Event:', 'onUpdateReady');
      // Tells to new SW to take control immediately
      OfflinePlugin.applyUpdate();
    },
    onUpdated: () => {
      console.log('SW Event:', 'onUpdated');
      // Reload the webpage to load into the new version
      window.location.reload();
    },
    onUpdateFailed: () => {
      console.log('SW Event:', 'onUpdateFailed');
    },
  });

  /* eslint-enable */
}
