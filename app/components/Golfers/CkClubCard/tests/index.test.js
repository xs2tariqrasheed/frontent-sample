import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import configureStore from '../../../../configureStore';
import CkClubCard from '../index';

describe('<CkClubCard />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store.store}>
        <IntlProvider locale="en">
          <CkClubCard
            golfer={{
              tokenid: 1,
              powertotal: 30,
              accuracytotal: 71,
              composuretotal: 43,
              staminatotal: 99,
              powerpeak: 30,
              accuracypeak: 71,
              composurepeak: 43,
              staminapeak: 99,
              sex: 0,
              driverIndex: 1,
              skinToneIndex: 1,
              eyeIndex: 1,
              noseIndex: 1,
              mouthIndex: 1,
              eyebrowIndex: 1,
              hairIndex: 1,
              hatIndex: 1,
              pantsIndex: 1,
              shirtIndex: 1,
              shoeIndex: 1,
            }}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
