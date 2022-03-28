import React from 'react';
import { render } from 'react-testing-library';

import StatsPercent from '../index';

describe('<StatsPercent percent={45} />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<StatsPercent percent={45} potentialPercent={100} />);
    expect(firstChild).toMatchSnapshot();
  });
});
