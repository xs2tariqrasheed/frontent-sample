import styled, { css } from 'styled-components';
import theme from '../../styles/theme';
import mq from '../../styles/mq';
const cancel = 'https://www.blockletegames.com/images/close%403x-light.png';

export const LogButton = styled.button`
  border: none;
  font-family: Roboto;
  background: transparent;
  margin-right: 15px;
  font-size: ${theme.fontSize.small};
  color: ${theme.color.white};
  text-decoration: none;

  :hover {
    color: ${theme.color.tin};
    text-decoration: underline;
  }

  ${mq.sm} {
    margin-right: 0px;
    margin-left: 0px;
  }
`;

export const PasswordLink = styled.div`
  cursor: pointer;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #3b38c6;
`;

export const SwitchLabel = styled.div`
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
  color: rgb(43, 171, 110);
`;

export const CloseLink = styled.a`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  width: 70px;
  text-decoration: none;
  background: url(${cancel}) no-repeat;
`;

export const FormWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0 100px;
  color: #2bab6e;

  ${mq.sm} {
    padding: 0 20px;
  }
`;

export const Button = styled.button`
  width: 380px;
  height: 50px;
  cursor: pointer;
  border-radius: 25px;
  background-color: #2bab6e;
  color: white;
  padding: 1rem;

  &:disabled {
    cursor: default;
    opacity: 0.7;
  }

  ${mq.sm} {
    width: 90%;
    margin: 10px 0;
  }
`;

export const Consent = styled.label`
  position: relative;
  padding-left: 1.8rem;
  padding-top: 0rem;
  cursor: pointer;
  text-align: left;
  font-family: Roboto;
  font-size: 18px;
  margin-bottom: 1rem;
  color: pnk;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ span {
      background-color: #3b38c6;

      &:after {
        display: block;
      }
    }
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 1.4rem;
    width: 1.4rem;
    background: white;
    border: 0.1rem solid #3b38c6;
    border-radius: 4;

    &:after {
      content: '';
      position: absolute;
      display: none;

      left: 0.35rem;
      top: 0.3rem;
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

export const Modal = styled.div`
  position: fixed;
  background-color: rgba(229, 231, 235, 0.56);
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
  &>div {
    width: 588px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    background-color: #f8f7ff;
    img {
      width: 35px;
      height: 35px;
      opacity: 0.32;
      position: absolute;
      right: 0;
      left: auto;
      top: 0;
    }

    ${mq.sm} {
      width: 350px;
    }
  }
  p {
    opacity: 0.64;
    font-size: 14px;
  }
  .loader {
    height: 200px;
  }
  #circle4 {
    display: block;
    position: absolute;
    top: 70%;
    left: 50%;
    height: 50px;
    width: 50px;
    margin: -25px 0 0 -25px;
    border: 4px rgba(0, 0, 0, 0.25) solid;
    border-top: 4px black solid;
    border-radius: 50%;
    -webkit-animation: spin4 1s infinite linear;
    animation: spin4 1s infinite linear;
  }

  @-webkit-keyframes spin4 {
    from {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
    to {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  }
  @keyframes spin4 {
    from {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
    to {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  }
`;
