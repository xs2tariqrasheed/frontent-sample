import React from 'react';
import PropTypes from 'prop-types';

const GolferImage = props => {
  const renderGolfer = () => (
    <div
      className={props.className ? props.className : 'relative h-full'}
      style={{ minWidth: '200px', ...props.style }}
    >
      <img
        src={props.image_url}
        alt={`Golfer Image GI/G3I`}
      />
    </div>
  );

  return <>{renderGolfer()}</>;
};

GolferImage.propTypes = {
  /*eslint-disable */
  style: PropTypes.object,
  className: PropTypes.string,
  image_url: PropTypes.string,
  /* eslint-enable */
};

export default GolferImage;