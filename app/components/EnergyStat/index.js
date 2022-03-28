/**
 *
 * EnergyStat
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import styled from 'styled-components';

function getRecovery(stamina, energy) {
  const recoveryPerPoint = (1200 - 1020 * (stamina / 1000)) / 60;
  const totalTime = (100 - energy) * recoveryPerPoint;
  if (totalTime === 0) {
    return 'Full Energy';
  }

  return `${Math.ceil(totalTime)} minutes`;
}

function EnergyStat({ energy, stamina, compact }) {
  return (
    <div className="mb-0">
      <h2 className="flex justify-between uppercase text-white text-lg w-full inline-block mb-1">
        Energy
        <span className={classNames({ 'w-full text-right text-xs': compact })}>
          {energy}/100
        </span>
      </h2>

      <div className="shadow w-full bg-grey-light mb-1 rounded">
        <div
          className={classNames(
            'bg-white text-xs leading-none text-center text-white rounded',
            {
              'h-2': !compact,
              'h-1': compact,
            },
          )}
          style={{ width: `${energy}%` }}
        />
      </div>
      {!compact && (
        <p className="mt-2 text-sml text-white flex justify-between opacity-50">
          Recovery Time{' '}
          <span className="text-right">{getRecovery(stamina, energy)}</span>
        </p>
      )}
    </div>
  );
}

EnergyStat.propTypes = {
  compact: PropTypes.bool,
  energy: PropTypes.number.isRequired,
  stamina: PropTypes.number.isRequired,
};

export default memo(EnergyStat);
