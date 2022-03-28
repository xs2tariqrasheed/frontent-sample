import styled, { css } from 'styled-components';
import theme from '../../../../styles/theme';
import mq from '../../../../styles/mq';

export const TextWrapper = styled.div`
  font-family: Roboto;
  font-size: 18px;
  color: black;
`;

export const Wrap = styled.div`
  padding: 20px 20px;
`;

export const CloseLink = styled.a`
  color: #aaa;
  cursor: pointer;
  line-height: 50px;
  font-family: Roboto;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
  &:hover {
    color: black;
  }
`;

export const Modal = styled.div`
  position: fixed;
  background-color: rgba(255, 255, 255, 0.25);
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
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    background: #ffffff;
    border: 0.2rem solid ${theme.color.border};
    border-radius: ${theme.borderRadius};

    ${mq.sm} {
      width: 250px;
    }
  }
  header {
    font-weight: bold;
  }
  h1 {
    font-size: 150%;
    margin: 0 0 15px;
  }
`;
