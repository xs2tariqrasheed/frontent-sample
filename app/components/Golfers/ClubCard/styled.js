import styled, { css } from 'styled-components';
import Img from 'components/Img';
import theme from '../../../styles/theme';

export const Container = styled.div`
  width: 320px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 20px;
  margin-top: 12px;
  padding-bottom: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 20px 15px #777;
  }
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
  transform: scale(0.5, 0.5);
  width: 188px;
  height: 188px;
  margin-left: 10px;
  object-fit: contain;
`;

export const ImageWrapper = styled.div`
  position: relative;

  ${props =>
    props.golfer.shape === 1 &&
    css`
      transform: translate(10px, -30px);
    `}

  ${props =>
    props.golfer.shape === 2 &&
    css`
      transform: translate(20px, -30px);
    `}

  ${props =>
    props.golfer.shape === 3 &&
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

export const PlayerLabel = styled.div`
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #00224e;
`;

export const PlayerNumber = styled.div`
  font-family: Roboto;
  font-size: 10px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #00224e;
`;

export const FounderLabel = styled.div`
  border-radius: 1px;
  margin-right: 25px;
  background-color: #201f4b;
  font-family: Roboto;
  font-size: 9px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
`;

export const Oval = styled.div`
  margin-left: 60px;
  border-radius: 50%;
  width: 146px;
  height: 18px;
  opacity: 0.35;
  mix-blend-mode: multiply;
  background-color: #d8d8d8;
`;

export const InfoBlock = styled.div`
  margin-top: 14px;
  margin-left: 24px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

export const StatsWrapper = styled.div`
  margin-top: 14px;
  margin-left: 42px;
  margin-right: 24px;
  display: inline-block;
  transform: scale(1.15, 1.15);
`;

export const LabelWrapper = styled.div`
  display: block;
`;

export const Label = styled.div`
  display: inline;
  text-align: left;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  color: #00224e;
`;

export const Stats = styled.div`
  display: inline;
  margin-top: 5px;
  float: right;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #001025;
`;

export const StatsColor = styled.span`
  color: #14854f;
`;

export const StatsBarWrapper = styled.div`
  display: inline-block;
`;

export const Skill = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  display: inlign-flex;
  padding: 5px 5px;
  border: 1pt solid ${theme.color.blueGrayDark};
  border-radius: ${theme.borderRadius};
  font-size: ${theme.fontSize.regular};
  font-weight: ${theme.fontWeight.normal};
  background: ${theme.color.accent};
`;

export const PracticeButton = styled.button`
  width: 225px;
  height: 35px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #3b38c6;
  color: white;
  margin-top: 20px;
`;
