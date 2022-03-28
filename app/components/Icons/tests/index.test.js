import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import {
  HamburgerIcon,
  ArenaGolfLogo,
  Key,
  Money,
  Train,
  Fast,
} from '../index';

describe('<HamburgerIcon />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <HamburgerIcon />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});

describe('<ArenaGolfLogo />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <ArenaGolfLogo />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});

describe('<Key />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Key />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});

describe('<Money />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Money />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});

describe('<Train />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Train />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});

describe('<Fast />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Fast />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
