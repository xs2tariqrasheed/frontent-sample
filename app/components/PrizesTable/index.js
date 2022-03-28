/**
 *
 * PrizesTable
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import values from 'lodash/values';
import web3 from '../../utils/ethereum/web3';

const newKeyNames = [
  '1<sup>st</sup>',
  '2<sup>nd</sup>',
  '3<sup>rd</sup>',
  '4<sup>th</sup>',
  '5<sup>th</sup>',
  '6 – 10<sup>th</sup>',
  '11 – 20<sup>th</sup>',
  '21 – 50<sup>th</sup>',
  '51 – 100<sup>th</sup>',
  'Consolation',
];

function PrizesTable({ reward, isTourney }) {
  const rewards = pick(reward, [
    'firstplace',
    'secondplace',
    'thirdplace',
    'fourthplace',
    'fifthplace',
    'sixthtotenthplace',
    'eleventhtotwentiethplace',
    'eleventhtotwentiethplace',
    'twentiethtofiftiethplace',
    'fiftyfirsttohundredthplace',
    'consolation',
  ]);
  const rewardsValues = values(rewards);

  let rewardsRemapped = newKeyNames.map((v, k) => ({
    [v]: rewardsValues[k],
  }));

  let typeOfReward = 'Medals';
  if (isTourney) {
    rewardsRemapped = newKeyNames.map((v, k) => ({
      [v]: web3.utils.fromWei(
        web3.utils.toWei(rewardsValues[k].toString(), 'gwei'),
        'ether',
      ),
    }));
    typeOfReward = 'ETH';
  }

  return reward ? (
    <>
      <div className="mb-5 font-bold flex border-cornflower items-center justify-between border-b-4 border-solid">
        <p className="tracking-wide text-sml p-2 uppercase bg-cornflower text-white text-left">
          Prizes
        </p>
        {!isTourney && (
          <p className="tracking-wide text-sml uppercase text-right text-blueberry">
            {reward.type}
          </p>
        )}
      </div>
      <table className="table-auto bg-white w-full">
        <thead>
          <tr>
            <th className="uppercase text-left text-blueberry">Rank</th>
            <th className="uppercase text-right text-blueberry">
              {typeOfReward}
            </th>
          </tr>
        </thead>
        <tbody>
          {rewardsRemapped
            .filter(obj => Object.values(obj) > 0)
            .map(obj => (
              <tr key={Object.keys(obj)}>
                <td
                  className="text-left border-b-2 text-blueberry pr-4 py-2"
                  dangerouslySetInnerHTML={{ __html: Object.keys(obj) }}
                />
                <td className="text-right border-b-2 text-blueberry pl-4 py-2">
                  {Object.values(obj)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  ) : (
    <></>
  );
}

PrizesTable.propTypes = {
  reward: PropTypes.object.isRequired,
  isTourney: PropTypes.bool,
};

export default memo(PrizesTable);
