import React, { useState } from 'react';
import { connect } from 'react-redux';
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
  FounderImage,
  InfoBlock,
  PlayerLabel,
  PlayerNumber,
  LabelWrapper,
  Stats,
  StatsColor,
  EthLabel,
  PracticeButton,
} from './styled';
import StatsPercent from '../../StatsPercent';
import FounderStamp from '../../../images/FounderStamp.svg';

const P2PPurchaseCard = props => {
  const [isLoading, setIsLoading] = useState(false); //eslint-disable-line

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

  let watchText = '';
  if (+props.golfer.watchcount === 1) {
    watchText = '1 Person Watching';
  } else if (+props.golfer.watchcount > 1) {
    watchText = `${props.golfer.watchcount} People Watching`;
  }

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
      <FounderImage src={FounderStamp} alt="FounderTag" />
      <ImageContainer color={statusColor.color}>
        <EthLabel>{parseFloat(props.golfer.price).toFixed(4)}</EthLabel>
        <ImageScaler>
          <ImageWrapper {...props}>
            <GolferImage
              image_url={props.golfer.image_url}
            />
          </ImageWrapper>
        </ImageScaler>
        <div>
          <InfoBlock
            onClick={() => {
              props.childClickCallback();
            }}
          >
            <PlayerLabel>{statusColor.status}</PlayerLabel>
            <PlayerNumber>#{tokenPad(props.golfer.tokenid)}</PlayerNumber>
          </InfoBlock>
        </div>
      </ImageContainer>
      <StatsWrapper
        onClick={() => {
          props.childClickCallback();
        }}
      >
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
            <StatsColor>{accuracyFinal}</StatsColor>/{props.golfer.accuracypeak}
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
      {props.userid && (
        <div>
          <div align="center">
            <PracticeButton onClick={() => props.practiceCallback()}>
              TRY GOLFER
            </PracticeButton>
            <div>{watchText}</div>
          </div>
        </div>
      )}
    </Container>
  );
};

P2PPurchaseCard.propTypes = {
  etherValue: PropTypes.number,
  golfer: PropTypes.object,
  userid: PropTypes.string,
  detectedEth: PropTypes.string,
  userWallet: PropTypes.string,
  dispatch: PropTypes.any,
  childClickCallback: PropTypes.func,
  openEtherModal: PropTypes.func,
  practiceCallback: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(P2PPurchaseCard);
