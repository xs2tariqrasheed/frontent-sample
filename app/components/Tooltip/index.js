/**
 *
 * Tooltip
 *
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// import styled from 'styled-components';

function Tooltip({ show }) {
  return (
    <div
      className={classNames(
        'flex w-64 absolute transition-opacity duration-500 ease-in-out text-center',
        {
          'opacity-0': !show,
          'opacity-100': show,
        },
      )}
      style={{ top: '-57px', left: '-112px' }}
    >
      <div className="relative mx-2">
        <div
          className="bg-itas-lavender text-white text-xs rounded py-1 px-4 right-0"
          style={{ bottom: '100%' }}
        >
          This golfer’s price will continue to go down. It’s your chance to buy
          now at this price before someone else does.
          <svg
            className="absolute text-itas-lavender h-2 w-full left-0 top-full mt-1"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      </div>
    </div>
  );
}

Tooltip.propTypes = {
  show: PropTypes.bool,
};

export default Tooltip;
