import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import Drawer from '../index';

describe('<Drawer />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Drawer isOpen isRight isLarge />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
