import React from 'react';
import { render } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';
import LearnMore from '../index';

describe('<LearnMore />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <BrowserRouter>
        <LearnMore />
      </BrowserRouter>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
