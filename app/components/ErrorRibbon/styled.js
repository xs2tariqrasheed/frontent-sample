import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 37px;
  font-size: 14px;
  line-height: 1.71;
  letter-spacing: 0.25px;
  ${props =>
    props.error &&
    css`
      background: #ff4059;
      color: white;
    `}
  ${props =>
    !props.error &&
    css`
      background: #ffc530;
      color: #171b1f;
    `}
`;

export const RibbonCap = styled.img`
  position: absolute;
  left: -27px;
  top: 0;
  height: 114%;
  ${props =>
    props.flipped &&
    css`
      transform: rotateY(180deg);
      left: auto;
      right: -27px;
    `}
  ${props =>
    props.error &&
    css`
      fill: #ff4059;
    `}
  ${props =>
    !props.error &&
    css`
      fill: #ffc530;
    `}
`;
