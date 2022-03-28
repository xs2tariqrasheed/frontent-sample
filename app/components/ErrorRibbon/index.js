/**
 *
 * ErrorRibbon
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Container, RibbonCap } from './styled';
import capLeft from './banner-edge-37-px-error.svg';
import capLeftYellow from './banner-edge-37-px-yellow.svg';

function ErrorRibbon({ children, className, error }) {
  return (
    <Container
      error={error}
      className={`relative text-center flex items-center justify-center ${className}`}
    >
      <RibbonCap
        src={error ? capLeft : capLeftYellow}
        alt="Ribbon cap"
        className="absolute"
      />
      <p className="text-sm">{children}</p>
      <RibbonCap
        src={error ? capLeft : capLeftYellow}
        flipped
        error
        alt="Ribbon cap"
        className="absolute"
      />
    </Container>
  );
}

ErrorRibbon.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  error: PropTypes.bool,
};

export default memo(ErrorRibbon);
