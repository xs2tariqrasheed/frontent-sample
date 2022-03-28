/**
 *
 * BadgeList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getBadgeSvg } from '../../utils/playerType';

function BadgeList({ darken }) {
  return (
    <ul
      className={classNames('list-none xl:flex items-center mb-10 text-white', {
        'text-white': !darken,
        'text-gray-900': darken,
      })}
    >
      <li className="mb-3 mr-10">
        <img
          className="inline-block mr-5"
          style={{ width: '70px' }}
          src={getBadgeSvg('Novice')}
          alt="novice badge"
        />
        <strong>Novice -</strong>&nbsp;Beginner
      </li>
      <li className="mb-3 mr-10">
        <img
          className="inline-block mr-5"
          style={{ width: '70px' }}
          src={getBadgeSvg('Pro')}
          alt="pro badge"
        />
        <strong>Pro -</strong>&nbsp;Skilled
      </li>
      <li className="mb-3 mr-10">
        <img
          className="inline-block mr-5"
          style={{ width: '70px' }}
          src={getBadgeSvg('Elite')}
          alt="elite badge"
        />
        <strong>Elite -</strong>&nbsp;Rare
      </li>
      <li className="mb-3 mr-10">
        <img
          className="inline-block mr-5"
          style={{ width: '70px' }}
          src={getBadgeSvg('Legend')}
          alt="legend badge"
        />
        <strong>Legend -</strong>&nbsp;Super rare
      </li>
    </ul>
  );
}

BadgeList.propTypes = {
  darken: PropTypes.bool,
};

export default memo(BadgeList);
