import styled, { css } from 'styled-components';
import theme from '../../styles/theme';
import mq from '../../styles/mq';
import Img from '../Img';

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
  text-align: center;
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
    padding: 50px 64px;
    background: #ffffff;
    border: 0.2rem solid #fecaf5;
    border-radius: ${theme.borderRadius};

    ${mq.sm} {
      width: 300px;
      padding: 30px 10px;
    }
  }
  header {
    font-weight: bold;
  }
  h1 {
    font-size: 150%;
    margin: 0 0 15px;
  }
  p {
    font-family: ${theme.fontFamily};
  }
  a {
    color: #e830c7;
    &:hover {
      color: #7c1d6a;
    }
  }
`;

export const BannerContainer = styled.article`
  background: #ffc530;
  text-align: center;
  position: relative;
  z-index: 20;
  a {
    color: #26225d;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
`;

export const Kitty = styled(Img)`
  width: 50%;
  margin: 0 auto 30px;
`;

export const Diamond = styled(Img)`
  position: absolute;
  width: 95px;
  top: -20px;
  left: 180px;
  ${mq.lg} {
    width: 95px;
    top: -20px;
    left: 180px;
  }
  ${mq.md} {
    width: 80px;
    top: -19px;
    left: 187px;
}  }
  ${mq.sm} {
    width: 60px;
    top: -17px;
    left: 106px;
  }
`;

export const CKLogoContainer = styled(Img)`
  margin-right: 10px;
  padding: 10px 0;
`;
