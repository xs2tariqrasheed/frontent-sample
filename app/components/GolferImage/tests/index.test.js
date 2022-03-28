import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import GolferImage from '../index';

describe('<GolferImage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <GolferImage
          sex={0}
          driverIndex={2}
          skinToneIndex={2}
          eyeIndex={3}
          noseIndex={2}
          mouthIndex={3}
          eyebrowIndex={3}
          hairIndex={3}
          hatIndex={3}
          pantsIndex={1}
          shirtIndex={2}
          shoeIndex={2}
        />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
