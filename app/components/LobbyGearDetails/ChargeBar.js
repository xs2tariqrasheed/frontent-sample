import React, { useState, useEffect } from 'react';
import { BsFillLightningFill } from 'react-icons/bs';
import { ChargeBarContainer } from './styled';

const ChargeBar = props => {
  return (
    <ChargeBarContainer className="flex justify-center">
      <div className="lightning">
        <BsFillLightningFill 
          className="h-5 w-5"
          style={{ color: '#3b338f' }}
        />
      </div>
      <div className="flex-col my-3 uppercase font-display">Charge</div>
      <div className="flex-col w-3/5">
        <div className="my-3 mx-1 h-1/3 relative flex items-center">
          <div className="bar-container relative w-full h-4">
            <div className="w-full overflow-hidden h-4 text-xs flex rounded-md bg-green-400">
              <div className="bar-division" />
              <div className="bar-division" />
              <div className="bar-division" />
              <div className="bar-division" />
              <div className="bar-division" />
            </div>
            <div className="">
              <div
                style={{ width: '100%' }}
                className="opacity-40 h-full absolute top-0 shadow-none rounded-md flex flex-col whitespace-nowrap"
              />
              <div
                style={{ width: '100%' }}
                className="h-full absolute top-0 shadow-none rounded-md flex flex-col whitespace-nowrap"
              />
            </div>
          </div>
        </div>
      </div>
    </ChargeBarContainer>
  );
};
export default ChargeBar;
