import React from 'react';
import PropTypes from 'prop-types';
import GolferImage from 'components/GolferImage';
import {
  Container,
  ImageContainer,
  ImageWrapper,
  ImageScaler,
  FounderImage,
  ImageFullWrap,
} from './styled';
import FounderStamp from './FounderStamp.svg';

const CkClubCard = props => {
  const playerType = (power, accuracy, composure, stamina) => {
    if (power >= accuracy && power >= stamina && power >= composure) {
      return { status: 'Power Player', color: '#e6fff2' };
    }
    if (accuracy >= power && accuracy >= stamina && accuracy >= composure) {
      return { status: 'Accuracy Player', color: '#e6f9ff' };
    }
    if (composure >= power && composure >= stamina && composure >= accuracy) {
      return { status: 'Composure Player', color: '#fff9e6' };
    }

    return { status: 'Stamina Player', color: '#f3ffe6' };
  };

  const statusColor = playerType(
    +props.golfer.powerPeak,
    +props.golfer.accuracyPeak,
    +props.golfer.composurePeak,
    +props.golfer.staminaPeak,
  );

  return (
    <Container>
      <ImageContainer color={statusColor.color}>
        <ImageScaler>
          <FounderImage src={FounderStamp} alt="FounderTag" />
          <ImageWrapper {...props}>
            <ImageFullWrap>
              <GolferImage
                image_url={props.golfer.image_url}
              />
            </ImageFullWrap>
          </ImageWrapper>
        </ImageScaler>
      </ImageContainer>
    </Container>
  );
};

CkClubCard.propTypes = {
  golfer: PropTypes.object,
};

export default CkClubCard;
