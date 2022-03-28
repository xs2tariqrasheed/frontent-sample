import styled, { css } from 'styled-components';
import mq from '../../../styles/mq';

export const HeaderBox = styled.div`
  height: 80px;
  background-color: #e7e6ff;
  padding: 22px;
`;

export const Title = styled.div`
  width: 180px;
  height: 28px;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.25px;
  text-align: center;
  color: #3a348f;
`;

export const WarningText = styled.div`
  margin-top: 20px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.25px;
  text-align: center;
  color: #2bb673;
`;

export const OkayButton = styled.button`
  margin-top: 20px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.25px;
  color: white;
  width: 212px;
  height: 37px;
  border-radius: 3px 3px 0 0;
  background-color: #6a6975;
`;

export const OkayShadow = styled.div`
  width: 212px;
  height: 8px;
  margin-bottom: 20px;
  border-radius: 0 0 3px 3px;
  background-color: #3c3b42;
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
    width: 295px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border: 4px solid #e7e6ff;
    border-radius: 5px;

    ${mq.sm} {
      width: 295px;
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
