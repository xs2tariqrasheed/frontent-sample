import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from './styled';
import Golfer3Image from './Golfer3Image';
import SuperPunchHost from './SuperPunchHost';
import ArtistGolferImage from './ArtistGolferImage';

const GolferImage = props => {
  const renderGolfer = shapeIndex => {
    // console.log('[GolferImage - render', props);
    if (props.sex === 10 || props.sex === 11 || props.sex === 12) {
      return (
        <SuperPunchHost
          className={props.className}
          style={props.style}
          sex={props.sex}
        />
      );
    }

    if (props.sex >= 13) {
      return (
        <ArtistGolferImage
          className={props.className}
          style={props.style}
          sex={props.sex}
        />
      );
    }

    if (+shapeIndex === 1) {
      return (
        <div
          className={props.className ? props.className : 'relative h-full'}
          style={{ minWidth: '200px', ...props.style }}
        >
          <img
            src={props.image_url}
            alt={`Golfer Image`}
          />
        </div>
      );
    }
    if (+shapeIndex === 2) {
      return (
        <div
          className={props.className ? props.className : 'relative h-full'}
          style={{ minWidth: '200px', ...props.style }}
        > 
          <img
            src={props.image_url}
            alt={`Golfer Image`}
          />
        </div>
      );
    }

    return (
      <Golfer3Image
        className={props.className}
        style={props.style}
        image_url={props.image_url}
      />
    );
  };

  return <>{renderGolfer(props.shape)}</>;
};

GolferImage.propTypes = {
  /*eslint-disable */
  style: PropTypes.object,
  className: PropTypes.string,
  image_url: PropTypes.string,
  /* eslint-enable */
};

export default GolferImage;