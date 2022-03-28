import React from 'react';
import PropTypes from 'prop-types';
import {
  TotalLine,
  CurrentSkill,
  PotentialSkill,
  SkillsWrapper,
} from './styled';

const StatsPercentComposure = ({ percent, potentialPercent }) => (
  <SkillsWrapper>
    <CurrentSkill width={percent} />
    <PotentialSkill width={potentialPercent} />
    <TotalLine width={100 - (percent + potentialPercent)} />
  </SkillsWrapper>
);

StatsPercentComposure.propTypes = {
  percent: PropTypes.number,
  potentialPercent: PropTypes.number,
};

export default StatsPercentComposure;
