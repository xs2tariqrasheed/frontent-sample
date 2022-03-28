/*
 * Heroblock
 *
 * This is the hero block on the front page.
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRandomGolfer } from '../../Header/actions';

const Hero = props => {
  useEffect(() => {
    props.dispatch(getRandomGolfer());
  }, []);

  // const playLink = `/trialgolfer/${props.tokenToPlay}/1`;

  return (
    <div className="bg-green-golf-green">
      <div className="relative z-10 bg-transparent">
        <iframe
          title="trailer"
          className="w-full"
          src="https://player.vimeo.com/video/454774621"
          width="640"
          height="360"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
        <div className="gridcontainer grid-flow-row grid-flow-col text-center md:mt-5">
          <Link
            to="/playtoearn/training"
            className="btn inline-block no-underline text-center md:w-52 mr-5 mb-5"
          >
            Learn About Training
          </Link>
          <Link
            to="/playtoearn/proshop"
            className="btn inline-block no-underline text-center md:w-52 mr-5 mb-5"
          >
            Learn About Pro Gear
          </Link>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  // tokenToPlay: PropTypes.number,
  dispatch: PropTypes.any,
};

function mapProps(store) {
  return {
    tokenToPlay: store.headerInfo.demoGolfer,
  };
}

export default connect(mapProps)(Hero);
