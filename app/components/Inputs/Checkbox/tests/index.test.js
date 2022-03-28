import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import Checkbox from '../index';

describe('<Checkbox />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Checkbox />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
