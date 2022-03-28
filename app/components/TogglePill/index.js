/**
 *
 * TogglePill
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import styled from 'styled-components';

function TogglePill({ options, activeIndex, setActiveIndex, className }) {
  console.log(className);
  return (
    <ul
      className={classNames(
        'mb-5 md:hidden rounded-lg container mx-auto p-2 bg-pale-blue flex justify-center items-center',
        className,
      )}
    >
      {options.map((option, i) => (
        <li
          key={option}
          className={`${
            i === activeIndex ? 'bg-white text-cornflower' : ''
          } w-full flex justify-center items-center text-center text-sm rounded inline-block p-2`}
        >
          <button type="button" onClick={() => setActiveIndex(i)}>
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
}

TogglePill.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  activeIndex: PropTypes.number,
  setActiveIndex: PropTypes.func,
};

export default memo(TogglePill);
