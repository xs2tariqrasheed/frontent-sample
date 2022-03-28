/**
 *
 * RandomGolferImage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const rndInt = randomIntFromInterval(1, 16);

function RandomGolferImage() {
  const golferImage = require('../../images/RandomGolfers/' + rndInt + '.png');

  return (
    <section>
      <img src={golferImage} alt="Golfer" className="" />
    </section>
  );
}

RandomGolferImage.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  classNames: PropTypes.string,
};

export default RandomGolferImage;
