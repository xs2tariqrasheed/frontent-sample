/**
 *
 * HeadingLabel
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function HeadingLabel({ children, className }) {
  return (
    <div className={`flex mb-5 border-b-4 border-cornflower ${className}`}>
      <h1 className="tracking-wide text-sml p-2 uppercase bg-cornflower text-white">
        {children}
      </h1>
    </div>
  );
}

HeadingLabel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
};

export default memo(HeadingLabel);
