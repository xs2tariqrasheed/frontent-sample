import styled, { css } from 'styled-components';
import mq from '../../styles/mq';
const desktopBg = 'https://www.blockletegames.com/images/GolfCourseBackground.png';
const statsBg = 'https://www.blockletegames.com/images/DotBackground.png';

export const SignUpForm = styled.div`
  padding: 16px;
  background-color: #fff;
  margin-top: -20px;
  display: inline-block;
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  width: 750px;
  padding: 30px 30px 0 30px;
  position: relative;
  top: 100px;
  left: 300px;
  border-radius: 16px;
  margin-bottom: 260px;
  box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.5);
  ${mq.sm} {
    width: 100%;
    padding-left: 26px;
    padding-top: 16px;
    position: inherit;
    margin-bottom: 0;
    margin-top: 150px;
    border-radius: 16px 16px 0 0;
  }
`;

export const Background = styled.div`
  background-image: url(${desktopBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: contain;
  height: 900px;
  .golfersHolder {
    width: 700px;
    display: inline-block;
    vertical-align: top;
    margin: 30px 0 0 150px;
    ${mq.md} {
      display: none;
    }
    ${mq.sm} {
      width: auto;
      display: block;
      position: absolute;
      top: 20px;
      z-index: 0;
      margin: 0;
      height: 198px;
      overflow: hidden;
    }
  }
  ${mq.sm} {
    background-image: url(${desktopBg});
    background-size: 450px;
    background-position: top;
    height: auto;
  }
`;

export const Consent = styled.label`
  position: relative;
  padding-left: 1rem;
  padding-top: 0rem;
  cursor: pointer;
  text-align: left;
  font-size: 16px;
  margin-bottom: 1rem;
  color: pnk;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ span {
      background-color: rgb(43, 171, 110);

      &:after {
        display: block;
      }
    }
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 1.2rem;
    width: 1.2rem;
    background: white;
    border: 0.1rem solid #3b38c6;
    border-radius: 4;

    &:after {
      content: '';
      position: absolute;
      display: none;

      left: 0.35rem;
      top: 0.2rem;
      width: 0.4rem;
      height: 0.7rem;
      border: solid white;
      border-width: 0 0.2rem 0.2rem 0;
      transform: rotate(45deg);
    }
  }

  &:hover {
    input ~ span {
    }
  }
`;

export const WalletModal = styled.div`
  position: fixed;
  background-color: rgba(229, 231, 235, 0.56);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s;
  .button {
    width: 255px;
    height: 54px;
    margin: auto;
    text-align: center;
    color: #0ac47e;
    position: relative;
    display: block;
  }
  .inner-circle {
    width: 255px;
    height: 54px;
    margin: 0 22px 0 0;
    padding: 3px 0 16px;
    border-radius: 27px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5),
      inset 0 -4px 3px 0 rgba(57, 240, 172, 0.65);
    background-image: linear-gradient(to bottom, #1fd893, #00bb75);
    position: absolute;
    top: 0;
  }
  .inner-shadow {
    width: 225px;
    height: 29px;
    margin: 0 0 6px;
    border-radius: 27px;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      #2cdf9c
    );
    position: absolute;
    left: 15px;
    top: 0;
  }
  .button-text {
    font-size: 18px;
    font-weight: 900;
    position: relative;
    top: 13px;
    color: #fff;
  }
  ${props =>
    props.isOpen &&
    css`
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
    `}
  &>div {
    width: 400px;
    position: absolute;
    top: 20%;
    left: 35%;
    border-radius: 6px;
    border: solid 3px #322c8f;
    box-shadow: 0px 5px rgba(50, 44, 143, 1);
    padding: 25px;
    z-index: 1;
    font-family: proxima-nova;
    background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 1%,
        #ffffff 56%
      ),
      url(${statsBg});
    background-size: 1000px;
    h1 {
      color: #322c8f;
      font-weight: 900;
      line-height: 1;
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
    }
    p {
      // font-weight: 800;
      font-size: 1rem;
      line-height: 1rem;
      margin-bottom: 10px;
      font-family: proxima-nova;
      padding-left: 10px;
      span {
        border-left: 4px solid #09c47d;
        padding-left: 5px;
        margin-left: -10px;
      }
    }
    img {
    }

    ${mq.sm} {
      width: auto;
      left: 0;
      margin: 5%;
    }
  }
`;
