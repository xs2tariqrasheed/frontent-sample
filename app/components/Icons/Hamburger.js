import React from 'react';

const Hamburger = props => (
  <svg width={14} height={13} {...props}>
    <g
      fillRule="nonzero"
      strokeWidth={3}
      stroke="#09c47d"
      opacity="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 1h12M1 6.25h12M1 11.25h12" />
    </g>
  </svg>
);

export default Hamburger;
