import React from 'react';
import PropTypes from 'prop-types';
import {
  TotalLine,
  CurrentSkill,
  PotentialSkill,
  SkillsWrapper,
} from './styled';

const StatsPercentStamina = ({ percent, potentialPercent }) => (
  <SkillsWrapper>
    <CurrentSkill width={percent} />
    <PotentialSkill width={potentialPercent} />
    <TotalLine width={100 - (percent + potentialPercent)} />
  </SkillsWrapper>
);

StatsPercentStamina.propTypes = {
  percent: PropTypes.number,
  potentialPercent: PropTypes.number,
};

export default StatsPercentStamina;
