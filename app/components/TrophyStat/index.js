/**
 *
 * TrophyStat
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import medalIcon from '../../images/medal-icon.svg';

// import styled from 'styled-components';

function medalsCalc(currentVal, peakVal) {
  const ratio = (currentVal / peakVal) * 100;
  let trophyReq = null;
  if (ratio <= 25) {
    trophyReq = 5;
  } else if (ratio <= 50) {
    trophyReq = 10;
  } else if (ratio <= 75) {
    trophyReq = 15;
  } else {
    trophyReq = 20;
  }

  return (
    <p className="text-xs text-blueberry leading-snug">
      {trophyReq} medals to next point
    </p>
  );
}

function TrophyStat(props) {
  if (!props.details) {
    return <></>;
  }

  const totalTrophies =
    props.powerTrophies +
    props.accuracyTrophies +
    props.composureTrophies +
    props.staminaTrophies;

  return (
    <section className="grid grid-cols-3 text-blueberry text-sm font-semibold">
      <p className="col-span-1 uppercase text-sm text-center flex flex-col justify-center items-center border-r-2 border-pale-blue">
        Medals <br />
        Earned <br />
        <strong className="text-cornflower">
          {totalTrophies}{' '}
          <img className="inline-block" src={medalIcon} alt="medal icon" />
        </strong>
      </p>
      <ul className="col-span-2 grid grid-cols-2 grid-rows-2 text-center text-cornflower text-xl">
        <li className="flex flex-col">
          {props.powerTrophies}{' '}
          <span className="text-blueberry text-sm">Power</span>
          {medalsCalc(props.details.powertotal, props.details.powerpeak)}
        </li>
        <li className="flex flex-col">
          {props.composureTrophies} <br />
          <span className="text-blueberry text-sm">Composure</span>
          {medalsCalc(
            props.details.composuretotal,
            props.details.composurepeak,
          )}
        </li>
        <li className="flex flex-col">
          {props.accuracyTrophies} <br />
          <span className="text-blueberry text-sm">Accuracy</span>
          {medalsCalc(props.details.accuracytotal, props.details.accuracypeak)}
        </li>
        <li className="flex flex-col">
          {props.staminaTrophies} <br />
          <span className="text-blueberry text-sm">Stamina</span>
          {medalsCalc(props.details.staminatotal, props.details.staminapeak)}
        </li>
      </ul>
    </section>
  );
}

TrophyStat.propTypes = {
  details: PropTypes.object,
  powerTrophies: PropTypes.number,
  accuracyTrophies: PropTypes.number,
  composureTrophies: PropTypes.number,
  staminaTrophies: PropTypes.number,
};

export default memo(TrophyStat);
