import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import configureStore from '../../../configureStore';

import LobbyGolferDetails from '../index';

describe('<LobbyGolferDetails />', () => {
  let store;
  const params = { params: { tokenId: 100 } };

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store.store}>
        <IntlProvider locale="en">
          <LobbyGolferDetails match={params} />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
