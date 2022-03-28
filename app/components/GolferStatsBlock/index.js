/**
 *
 * GolferStatsBlock
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Label,
  LabelWrapper,
  MainContainer,
  Stats,
  StatsBarWrapper,
  StatsColor,
} from './styled';
import StatsPercentPower from '../StatsPercentPower';
import StatsPercentStamina from '../StatsPercentStamina';
import StatsPercentAccuracy from '../StatsPercentAccuracy';
import StatsPercentComposure from '../StatsPercentComposure';

function GolferStatsBlock({
  powertotal,
  powerpeak,
  accuracytotal,
  accuracypeak,
  composurepeak,
  composuretotal,
  staminatotal,
  staminapeak,
  expandedView,
  callback,
  GolferUpgrade,
}) {
  const powerFinal =
    +powertotal + (GolferUpgrade ? +GolferUpgrade.powertotal : 0);
  const accuracyFinal =
    +accuracytotal + (GolferUpgrade ? +GolferUpgrade.accuracytotal : 0);
  const composureFinal =
    +composuretotal + (GolferUpgrade ? +GolferUpgrade.composuretotal : 0);
  const staminaFinal =
    +staminatotal + (GolferUpgrade ? +GolferUpgrade.staminatotal : 0);

  return (
    <MainContainer
      onClick={() => {
        if (callback) {
          callback();
        }
      }}
    >
      <LabelWrapper>
        <Label expandedView={expandedView}>Power</Label>
        <Stats expandedView={expandedView} style={{ color: '#219afe' }}>
          <StatsColor style={{ color: '#219afe' }}>{powerFinal}</StatsColor>/
          {powerpeak}
        </Stats>
      </LabelWrapper>
      <StatsBarWrapper expandedView={expandedView}>
        <StatsPercentPower
          percent={(powerFinal / 1000) * 100}
          potentialPercent={(powerpeak / 1000) * 100}
        />
      </StatsBarWrapper>
      <LabelWrapper>
        <Label expandedView={expandedView}>Accuracy</Label>
        <Stats expandedView={expandedView} style={{ color: '#ff4771' }}>
          <StatsColor style={{ color: '#ff4771' }}>{accuracyFinal}</StatsColor>/
          {accuracypeak}
        </Stats>
      </LabelWrapper>
      <StatsBarWrapper expandedView={expandedView}>
        <StatsPercentAccuracy
          percent={(accuracyFinal / 1000) * 100}
          potentialPercent={(accuracypeak / 1000) * 100}
        />
      </StatsBarWrapper>
      <LabelWrapper>
        <Label expandedView={expandedView}>Composure</Label>
        <Stats expandedView={expandedView} style={{ color: '#655bf5' }}>
          <StatsColor style={{ color: '#655bf5' }}>{composureFinal}</StatsColor>
          /{composurepeak}
        </Stats>
      </LabelWrapper>
      <StatsBarWrapper expandedView={expandedView}>
        <StatsPercentComposure
          percent={(composureFinal / 1000) * 100}
          potentialPercent={(composurepeak / 1000) * 100}
        />
      </StatsBarWrapper>
      <LabelWrapper>
        <Label expandedView={expandedView}>Stamina</Label>
        <Stats expandedView={expandedView} style={{ color: '#00bb75' }}>
          <StatsColor style={{ color: '#00bb75' }}>{staminaFinal}</StatsColor>/
          {staminapeak}
        </Stats>
      </LabelWrapper>
      <StatsBarWrapper expandedView={expandedView}>
        <StatsPercentStamina
          percent={(staminaFinal / 1000) * 100}
          potentialPercent={(staminapeak / 1000) * 100}
        />
      </StatsBarWrapper>
    </MainContainer>
  );
}

GolferStatsBlock.propTypes = {
  GolferUpgrade: PropTypes.object,
  powertotal: PropTypes.number.isRequired,
  powerpeak: PropTypes.number.isRequired,
  accuracytotal: PropTypes.number.isRequired,
  accuracypeak: PropTypes.number.isRequired,
  composurepeak: PropTypes.number.isRequired,
  composuretotal: PropTypes.number.isRequired,
  staminatotal: PropTypes.number.isRequired,
  staminapeak: PropTypes.number.isRequired,
  expandedView: PropTypes.bool,
  callback: PropTypes.func,
};

export default GolferStatsBlock;
