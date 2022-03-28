/**
 *
 * ProgressRing
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// import styled from 'styled-components';

class ProgressRing extends React.Component {
  arc = { finalX: 400, finalY: 200 };

  constructor(props) {
    super(props);

    const { stroke, radius, progress } = this.props;

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
    if (progress === 100) {
      this.arc.finalX = 400;
      this.arc.finalY = 200;
    } else if (progress === 50) {
      this.arc.finalX = 200;
      this.arc.finalY = 0;
    } else if (progress === 0) {
      this.arc.finalX = 0;
      this.arc.finalY = 200;
    } else {
      const angle = Math.PI - Math.PI * (progress / 100);
      this.arc.finalX = radius + radius * Math.cos(angle);
      this.arc.finalY = radius - radius * Math.sin(angle);
    }
  }

  render() {
    return (
      <svg
        className="w-full"
        width="416px"
        height="216px"
        viewBox="0 0 416 216"
      >
        <title>Skill Potential Arc</title>
        <g
          id="3.0---Golfer-Details"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
        >
          <g
            id="3.0.0---Golfer-Detail"
            transform="translate(-889.000000, -1289.000000)"
            strokeWidth="16"
          >
            <g id="Body" transform="translate(0.000000, 745.000000)">
              <g
                id="Competitive-Edge"
                transform="translate(135.000000, 552.000000)"
              >
                <g id="Skill-Arc" transform="translate(762.000000, 0.000000)">
                  <g id="Skill-Potential-Arc">
                    <path
                      d="M400,200 C400,89.54305 310.45695,2.27373675e-13 200,2.27373675e-13 C89.54305,2.27373675e-13 0,89.54305 0,200"
                      id="BackgroundArc"
                      stroke="#1B173F"
                    />
                    <path
                      d={`M0,200 A200 200 0 0 1 ${this.arc.finalX} ${
                        this.arc.finalY
                      }`}
                      stroke={this.props.color}
                      strokeWidth={this.props.stroke}
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

ProgressRing.propTypes = {
  stroke: PropTypes.number,
  radius: PropTypes.number,
  progress: PropTypes.number,
  color: PropTypes.string,
};

export default ProgressRing;
