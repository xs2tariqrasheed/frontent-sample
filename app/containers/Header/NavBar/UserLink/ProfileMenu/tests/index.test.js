import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import configureStore from '../../../../../../configureStore';

import ProfileMenu from '../index';

describe('<ProfileMenu />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <BrowserRouter>
        <Provider store={store.store}>
          <IntlProvider locale="en">
            <ProfileMenu />
          </IntlProvider>
        </Provider>
      </BrowserRouter>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
