import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import { Panel, PanelBody, PanelHeader } from '../index';

describe('<Spinner />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Panel isLeftAligned={false}>
          <PanelHeader isLight>Header</PanelHeader>
          <PanelBody>Hello</PanelBody>
        </Panel>
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
