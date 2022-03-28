import React from 'react';
import PropTypes from 'prop-types';
import GolferImage from 'components/GolferImage';
import {
  Container,
  Label,
  StatsWrapper,
  ImageContainer,
  ImageWrapper,
  ImageScaler,
  StatsBarWrapper,
  InfoBlock,
  PlayerLabel,
  PlayerNumber,
  LabelWrapper,
  Stats,
  StatsColor,
  FounderImage,
  ImageFullWrap,
  FounderLabel,
  PracticeButton,
} from './styled';
import StatsPercent from '../../StatsPercent';
import FounderStamp from './FounderStamp.svg';

const ClubCard = props => {
  const tokenPad = num => {
    const numStr = `${num}`;
    return numStr.padStart(5, '0');
  };

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

  const powerFinal =
    +props.golfer.powertotal +
    (props.golfer.GolferUpgrade ? +props.golfer.GolferUpgrade.powertotal : 0);
  const accuracyFinal =
    +props.golfer.accuracytotal +
    (props.golfer.GolferUpgrade
      ? +props.golfer.GolferUpgrade.accuracytotal
      : 0);
  const composureFinal =
    +props.golfer.composuretotal +
    (props.golfer.GolferUpgrade
      ? +props.golfer.GolferUpgrade.composuretotal
      : 0);
  const staminaFinal =
    +props.golfer.staminatotal +
    (props.golfer.GolferUpgrade ? +props.golfer.GolferUpgrade.staminatotal : 0);

  const statusColor = playerType(
    powerFinal,
    accuracyFinal,
    composureFinal,
    staminaFinal,
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
      <div>
        <InfoBlock onClick={() => props.onChildClickCallback()}>
          <div>
            <PlayerLabel>{statusColor.status}</PlayerLabel>
            <PlayerNumber>#{tokenPad(props.golfer.tokenid)}</PlayerNumber>
          </div>
          <div>
            <FounderLabel>FOUNDER</FounderLabel>
          </div>
        </InfoBlock>
      </div>
      <div>
        <StatsWrapper onClick={() => props.onChildClickCallback()}>
          <LabelWrapper>
            <Label>Power</Label>
            <Stats>
              <StatsColor>{powerFinal}</StatsColor>/{props.golfer.powerpeak}
            </Stats>
          </LabelWrapper>
          <StatsBarWrapper>
            <StatsPercent
              percent={(powerFinal / 1000) * 100}
              potentialPercent={(props.golfer.powerpeak / 1000) * 100}
            />
          </StatsBarWrapper>
          <LabelWrapper>
            <Label>Accuracy</Label>
            <Stats>
              <StatsColor>{accuracyFinal}</StatsColor>/
              {props.golfer.accuracypeak}
            </Stats>
          </LabelWrapper>
          <StatsBarWrapper>
            <StatsPercent
              percent={(accuracyFinal / 1000) * 100}
              potentialPercent={(props.golfer.accuracypeak / 1000) * 100}
            />
          </StatsBarWrapper>
          <LabelWrapper>
            <Label>Composure</Label>
            <Stats>
              <StatsColor>{composureFinal}</StatsColor>/
              {props.golfer.composurepeak}
            </Stats>
          </LabelWrapper>
          <StatsBarWrapper>
            <StatsPercent
              percent={(composureFinal / 1000) * 100}
              potentialPercent={(props.golfer.composurepeak / 1000) * 100}
            />
          </StatsBarWrapper>
          <LabelWrapper>
            <Label>Stamina</Label>
            <Stats>
              <StatsColor>{staminaFinal}</StatsColor>/{props.golfer.staminapeak}
            </Stats>
          </LabelWrapper>
          <StatsBarWrapper>
            <StatsPercent
              percent={(staminaFinal / 1000) * 100}
              potentialPercent={(props.golfer.staminapeak / 1000) * 100}
            />
          </StatsBarWrapper>
        </StatsWrapper>
      </div>
      <div>
        <div align="center">
          <PracticeButton onClick={() => props.practiceLaunched()}>
            PRACTICE
          </PracticeButton>
        </div>
      </div>
    </Container>
  );
};

ClubCard.propTypes = {
  golfer: PropTypes.object,
  onChildClickCallback: PropTypes.func,
  practiceLaunched: PropTypes.func,
};

export default ClubCard;
