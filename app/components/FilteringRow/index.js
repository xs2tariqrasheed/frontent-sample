/**
 *
 * FilteringRow
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from './styled';

// import styled from 'styled-components';

function FilteringRow({ title, options, onSelect, ariaLabel, sortSetting }) {
  return (
    <nav role="navigation" aria-label={ariaLabel}>
      <h1 className="text-sm uppercase text-itas-dark-purple track-wide mb-3">
        {title}
      </h1>
      <ul className="list-none">
        {options.map(option => (
          <li key={option.value} className="inline-block mb-3">
            <Button
              className={`
            ${sortSetting &&
              (option.value === sortSetting.order ||
                option.value === sortSetting.key) &&
              'active'}
        py-2
        px-4
        mr-2
        md:mb-auto
        border
        rounded`}
              onClick={() => onSelect(option.value)}
            >
              {option.displayName}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

FilteringRow.propTypes = {
  title: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }),
  ).isRequired,
  sortSetting: PropTypes.object,
  ariaLabel: PropTypes.string,
};

export default memo(FilteringRow);
