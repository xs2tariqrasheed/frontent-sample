import React from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import {
  Modal,
  HeaderBox,
  Score,
  Title,
  ScoreSub,
  OuterWrap,
  InnerWrap,
} from './styled';
import golfWreath from '../../images/golf-ball-wreath.svg';
import { PressedButton, PressedButtonGrey } from '../../styles/commonStyles';
import { SocialLink } from '../../containers/Footer/SocialMedia/styled';

const PlayModal = props => {
  const quoteText = `I just finished an epic round of golf with my Blocklete at Blocklete Golf! I shot a round of ${
    props.score
  } points on @blockletegames.`;

  const golferLink = 'https://www.blockletegames.com';

  return (
    <Modal open={props.onOpen}>
      <OuterWrap>
        <InnerWrap>
          <HeaderBox className="flex items-center justify-center m-0 py-5">
            <img
              className="absolute my-0 mx-auto"
              style={{ top: '-65px' }}
              src={golfWreath}
              alt="golf ball wreath icon"
            />
            <Title>Round Complete</Title>
          </HeaderBox>
          <Score>{props.score}</Score>
          <ScoreSub className="mb-5">Points</ScoreSub>
          {props.demo && (
            <p className="text-center mb-5">Play to earn! Buy now!</p>
          )}
          <div align="center">
            {props.demo && (
              <PressedButton
                primary
                className="mb-2 w-4/5"
                onClick={() => {
                  props.callbackBuyThisGolfer();
                }}
              >
                Buy This Golfer
              </PressedButton>
            )}
            <PressedButton
              primary
              className="mb-2 w-4/5"
              onClick={() => {
                props.callbackPlayAgain();
              }}
            >
              {props.energy > 0 ? `Play ${props.energy} Energy` : 'Play Again'}
            </PressedButton>
            <PressedButtonGrey
              primary={false}
              className="w-4/5"
              onClick={() => {
                props.callbackClubhouse();
              }}
            >
              {props.BackButtonText}
            </PressedButtonGrey>
            <div className="my-5 flex justify-center">
              <FacebookShareButton
                url={golferLink}
                quote={quoteText}
                className="share-override-button mr-3"
              >
                <FacebookIcon size={30} bgStyle={{ fill: 'transparent' }} />
              </FacebookShareButton>
              <TwitterShareButton
                resetButtonStyle={false}
                url={golferLink}
                title={quoteText}
                className="share-override-button"
              >
                <TwitterIcon size={30} bgStyle={{ fill: 'transparent' }} />
              </TwitterShareButton>
              <SocialLink
                href="https://discord.gg/XDJAJdr"
                target="_blank"
                className="share-override-button ml-3 w-12 flex justify-center items-center"
                style={{ marginRight: 0 }}
              >
                <i
                  className="mt-1 fab fa-discord"
                  style={{ fontSize: '20px' }}
                />
              </SocialLink>
            </div>
          </div>
        </InnerWrap>
      </OuterWrap>
    </Modal>
  );
};

PlayModal.propTypes = {
  callbackClubhouse: PropTypes.func,
  callbackPlayAgain: PropTypes.func,
  callbackBuyThisGolfer: PropTypes.func,
  demo: PropTypes.bool,
  score: PropTypes.number,
  BackButtonText: PropTypes.string,
  onOpen: PropTypes.bool,
  energy: PropTypes.number,
};

export default PlayModal;
