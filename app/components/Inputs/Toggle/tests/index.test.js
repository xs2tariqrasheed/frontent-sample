import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import Toggle from '../index';

describe('<Toggle />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Toggle />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
