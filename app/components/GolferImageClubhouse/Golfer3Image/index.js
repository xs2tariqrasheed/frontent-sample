import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styled';

const GolferImage = props => {
  const renderGolfer = () => (
    <Container
      className={props.className} //relative h-full test1
    >
    <div style={{ ...props.style }}>
      <img
        src={props.image_url}
        alt={`Golfer Image`}
      />
    </div></Container>
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
