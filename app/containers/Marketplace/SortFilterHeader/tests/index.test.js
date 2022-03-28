import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter } from 'react-router-dom';
import SortFilterHeader from '../index';
import configureStore from '../../../../configureStore';

describe('<SortFilterHeader />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    let modalOpen = false;
    const {
      container: { firstChild },
    } = render(
      <Provider store={store.store}>
        <BrowserRouter>
          <SortFilterHeader
            modalOpen={modalOpen}
            setOpenModal={() => {
              modalOpen = true;
              return modalOpen;
            }}
          />
        </BrowserRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
