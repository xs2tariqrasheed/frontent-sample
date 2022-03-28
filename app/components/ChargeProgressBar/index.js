import React from 'react';
import {
  Container,
  ProgressBarContainer,
  ProgressBarInnerContainer,
} from './styled';
import charged from '../../images/charged.png';

const ChargeProgressBar = props => {
  console.log(
    props.gear.times_degraded,
    'LLLLLLLLLLL',
    props.gear.charge_change_level,
  );
  const value1 = props.gear.charge_change_level * props.gear.plays_per_level;

  const value2 = props.gear.times_degraded
    ? props.gear.times_degraded
    : 1 * props.gear.charge_change_level;

  const value3 = value1 - value2;

  return (
    <Container className={`${props.gearCard && 'rounded-2xl'}`}>
      <div className="w-full flex py-1 items-center justify-center">
        <img src={charged} className="w-6 mx-2" />
        {!props.gearCard && (
          <p className="text-white font-bold text-xs mb-0 w-16 text-left leading-3">
            Charges remaining
          </p>
        )}
        <ProgressBarContainer
          className={`${
            props.gearCard ? 'w-2/3' : 'w-1/2'
          } rounded-2xl h-4 mx-1 relative my-0.5`}
          style={{ backgroundColor: '#e3e3e4' }}
        >
          <ProgressBarInnerContainer
            className={`absolute left-0 h-4 rounded-2xl w-${(value3 / value1) *
              100}`}
            style={{ backgroundColor: '#0cc781' }}
          />
        </ProgressBarContainer>
        <p className="text-white font-bold text-xs mb-0 mx-1 text-center">
          {value3}/{value1}
        </p>
      </div>
    </Container>
  );
};

export default ChargeProgressBar;
