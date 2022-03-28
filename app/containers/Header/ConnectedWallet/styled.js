import styled, { css } from 'styled-components';
import mq from '../../../styles/mq';

export const Wrapper = styled.div`
  height: 40px;
  margin-top: 15px;
  border-radius: 2px;
  background-color: #14854f;
  display: flex;
  padding: 0px 10px;

  ${props =>
    props.large &&
    css`
      display: none;
    `}

  ${mq.sm} {
    display: none;
  }
`;

export const WalletLabel = styled.div`
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  padding: 12px 10px;
`;
