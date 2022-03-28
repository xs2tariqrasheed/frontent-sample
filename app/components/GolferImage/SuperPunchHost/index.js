import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from './styled';

const GolferImage = props => {
  const renderGolfer = () => (
    <div
      className={props.className ? props.className : 'relative h-full'}
      style={{ minWidth: '200px', ...props.style }}
    >
      <Avatar
        src={require(/* eslint-disable-line global-require */ `../../../images/GolfersNew/superpunch_${
          props.sex
        }.svg`)}
        alt="body"
      />
    </div>
  );

  return <>{renderGolfer()}</>;
};

GolferImage.propTypes = {
  /*eslint-disable */
  style: PropTypes.object,
  className: PropTypes.string,
  sex: PropTypes.number,
  /* eslint-enable */
};

export default GolferImage;
