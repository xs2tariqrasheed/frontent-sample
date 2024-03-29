import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import EnergyStat from '../index';

describe('<EnergyStat />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <EnergyStat energy={60} stamina={244} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
