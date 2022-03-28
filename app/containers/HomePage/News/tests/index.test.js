import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter } from 'react-router-dom';
import configureStore from '../../../../configureStore';

import News from '../index';

describe('<About />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store.store}>
        <BrowserRouter>
          <IntlProvider locale="en">
            <News />
          </IntlProvider>
        </BrowserRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
