import styled, { css } from 'styled-components';
import mq from '../../styles/mq';
const tear = 'https://www.blockletegames.com/images/tear%402x.png';
const noise = 'https://www.blockletegames.com/images/purple-noise%402x.png';
const tee = 'https://www.blockletegames.com/images/tee.png';

export const HeaderBox = styled.div`
  position: relative;
  background: url(${noise}) #e7e6ff;
  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    object-fit: contain;
    width: 100%;
    height: 30px;
    background-image: url(${tear});
    background-size: 16px;
    background-repeat: repeat-x;
    background-position: 0 bottom;
  }
`;

export const Title = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.25px;
  color: #3a348f;
  text-transform: uppercase;
  margin: 0;
`;

export const Score = styled.div`
  margin-top: 20px;
  font-size: 62px;
  font-weight: 900;
  line-height: 1.4;
  letter-spacing: 0.25px;
  text-align: center;
  color: #2bb673;
`;

export const ScoreSub = styled.div`
  margin-top: -10px;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.25px;
  text-align: center;
  color: #2bb673;
  &:before,
  &:after {
    content: '';
    object-fit: contain;
    background: url(${tee}) no-repeat;
    background-size: 17px;
    width: 17px;
    height: 6px;
    display: inline-block;
    position: relative;
    top: -3px;
    margin: 0 10px;
  }
  &:before {
    transform: rotate(180deg);
  }
`;

export const PlayAgainButton = styled.button`
  margin-top: 24px;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 1px;
  line-height: 1.4;
  color: white;
  width: 212px;
  height: 37px;
  border-radius: 3px 3px 0 0;
  background-color: #2bb673;
`;

export const OuterWrap = styled.div`
  min-width: 311px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 16px solid rgba(17, 15, 41, 0.5);
  border-radius: 3px;
`;

export const InnerWrap = styled.div`
  background: #ffffff;
  border: 8px solid #e7e6ff;
  border-radius: 5px;
  ${mq.sm} {
    width: 295px;
  }
`;

export const Modal = styled.div`
  position: fixed;
  background-color: rgba(17, 15, 41, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 0.5s;
  ${props =>
    props.open &&
    css`
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
    `}
`;
