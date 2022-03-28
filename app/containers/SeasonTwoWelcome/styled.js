import styled, { css } from 'styled-components';
import mq from '../../styles/mq';

export const Modal = styled.div`
  position: fixed;
  background-color: rgba(229, 231, 235, 0.56);
  color: #000;
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
    border-radius: 0.75rem;
    padding: 50px;
    ${mq.sm} {
      width: 100%;
    }
  }
  p {
    opacity: 0.64;
    font-size: 14px;
  }
  img {
    width: 35px;
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

export const PasswordLink = styled.div`
  cursor: pointer;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #2bab6e;
`;

export const FormWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0 40px;
  color: #2bab6e;
`;

export const Button = styled.button`
  img {
    cursor: pointer;
    width: auto;
    &:disabled {
      cursor: default;
    }
  }
`;
