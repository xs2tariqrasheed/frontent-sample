/**
 *
 * HourGlass
 *
 */

import React, { memo, useState } from 'react';
import hourGlassImg from './hourglass.svg';
import Tooltip from '../Tooltip';

function HourGlass() {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="relative ml-2">
      <Tooltip show={showTooltip} />
      <img
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-8 inline-block text-itas-lavender"
        src={hourGlassImg}
        alt="hourglass icon"
      />
    </div>
  );
}

export default memo(HourGlass);
