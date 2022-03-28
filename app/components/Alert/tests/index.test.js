import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import Alert from '../index';

describe('<Alert />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Alert />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});