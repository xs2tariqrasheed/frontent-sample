import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import Spinner from '../index';

describe('<Spinner />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Spinner />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
