/* eslint-disable react/prop-types */
/* eslint-disable prefer-template */
/**
 *
 * ProgressCard
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PowerIcon from '../../images/marketplace/power.svg';
import AccuracyIcon from '../../images/marketplace/accuracy.svg';
import ComposureIcon from '../../images/marketplace/focus.svg';
import StaminaIcon from '../../images/marketplace/stamina.svg';

export const getStatIcon = type => {
  switch (type) {
    case 'Power':
      return PowerIcon;
    case 'Accuracy':
      return AccuracyIcon;
    case 'Composure':
      return ComposureIcon;
    case 'Stamina':
      return StaminaIcon;
    default:
      return '';
  }
};

function ProgressCard({ className, peak, total, statName, tierComparison }) {
  const progress = Math.round((total / peak) * 100);
  // const progressWidth = Math.round((progress * 270) / 100);
  const statPercent = (total / 1000) * 100;
  const potentialPercent = (peak / 1000) * 100;
  // const totalWidth = 100 - (statPercent + potentialPercent);
  return (
    <section
      className={classNames(
        'flex-col inline-block',
        className,
      )}
    >
      <div className="text-center font-display">
        <div>
          <img src={getStatIcon(statName)} alt="Golfer" className="m-auto" />
        </div>
        <div className="text-lg font-bold font-number">{total}</div>
        <header className="">
          {statName === 'Composure' && (
            <div className="text-xs text-gray-400">Focus</div>
          )}
          {statName !== 'Composure' && (
            <div className="text-xs text-gray-400">{statName}</div>
          )}
        </header>
        <div className="text-xs text-gray-400">Max {peak}</div>
      </div>
    </section>
  );
}

ProgressCard.propTypes = {
  className: PropTypes.string,
  peak: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  statName: PropTypes.string,
};

export default ProgressCard;
