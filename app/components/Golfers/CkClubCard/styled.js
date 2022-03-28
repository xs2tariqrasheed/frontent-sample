import styled, { css } from 'styled-components';
import Img from 'components/Img';

export const Container = styled.div`
  width: 320px;
  height: auto;
  background-color: #ffffff;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 12px;
  margin-top: 12px;
`;

export const ImageScaler = styled.div`
  transform: scale(1.2, 1.2);
  margin-left: 18px;
`;

export const FounderImage = styled(Img)`
  position: absolute;
  transform: translate(40px, 20px);
`;

export const ImageFullWrap = styled.div`
  transform: scale(0.35, 0.35);
  width: 188px;
  height: 188px;
  object-fit: contain;
`;

export const ImageWrapper = styled.div`
  position: relative;

  ${props =>
    props.golfer.bodyShape === 1 &&
    css`
      transform: translate(10px, -30px);
    `}

  ${props =>
    props.golfer.bodyShape === 2 &&
    css`
      transform: translate(20px, -30px);
    `}

  ${props =>
    props.golfer.bodyShape === 3 &&
    css`
      transform: translate(15px, -30px);
    `}
    
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 272px;
  height: 213px;
  margin-top: 24px;
  margin-left: 24px;
  border-radius: 5px;
  background-color: ${props => props.color};
  clip-path: inset(0px 0px 0px 0px);
`;

export const Oval = styled.div`
  margin-left: 65px;
  border-radius: 50%;
  width: 146px;
  height: 18px;
  opacity: 0.35;
  mix-blend-mode: multiply;
  background-color: #d8d8d8;
`;
