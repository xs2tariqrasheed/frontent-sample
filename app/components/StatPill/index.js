/**
 *
 * StatPill
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
function StatPill({ className, title, statNumber, subtext }) {
  return (
    <section
      className={classNames(
        'text-white bg-purple-300 rounded-2xl p-3',
        className,
      )}
    >
      <h1 className="text-sm opacity-50 uppercase mb-3 md:text-lg">{title}</h1>
      <p className="font-display text-4xl">{statNumber}</p>
      <p className="text-white opacity-50 text-sml leading-tight">{subtext}</p>
    </section>
  );
}

StatPill.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  classNames: PropTypes.string,
  title: PropTypes.string.isRequired,
  statNumber: PropTypes.number.isRequired,
  subtext: PropTypes.string.isRequired,
};

export default StatPill;
