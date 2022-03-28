import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import Links from '../index';

describe('<Links />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Links />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
