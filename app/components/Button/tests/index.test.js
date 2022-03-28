import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import Button from '../index';

describe('<Button />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Button />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Button isOutline />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Button isLink />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Button isMuted />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Button isDanger />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
