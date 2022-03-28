import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import SiteHome from '../index';

describe('<SiteHome />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <BrowserRouter>
        <IntlProvider locale="en">
          <SiteHome />
        </IntlProvider>
      </BrowserRouter>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
