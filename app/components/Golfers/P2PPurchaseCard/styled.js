import styled, { css } from 'styled-components';
import Img from 'components/Img';
import Spinner from 'components/Spinner';
import theme from '../../../styles/theme';

export const Container = styled.div`
  width: 282px;
  height: auto;
  padding-bottom: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.1);
  background-color: #aaaaaa;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 12px;
  margin-top: 12px;
  cursor: pointer;
`;

export const FounderImage = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(40px, 20px);
`;

export const ImageScaler = styled.div`
  transform: scale(1.2, 1.2);
`;

export const ImageWrapper = styled.div`
  position: relative;

  ${props =>
    props.golfer.shape === 1 &&
    css`
      transform: translate(-25px, 35px);
    `}

  ${props =>
    props.golfer.shape === 2 &&
    css`
      transform: translate(7px, 40px);
    `}

  ${props =>
    props.golfer.shape === 3 &&
    css`
      transform: translate(-7px, 40px);
    `}
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 234px;
  height: 234px;
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

export const InfoBlock = styled.div`
  position: absolute;
  transform: translate(0px, 194px);
  width: 132px;
  height: 40px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.95);
`;

export const StatsWrapper = styled.div`
  margin-top: 14px;
  margin-left: 24px;
  margin-right: 24px;
  display: inline-block;
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

export const EtherButton = styled.button`
  position: absolute;
  z-index: 9;
  cursor: pointer;
  margin-left: 121px;
  margin-top: 7px;
  width: 105px;
  height: 32px;
  border-radius: 5px;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;

  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #252261;

  :disabled {
    opacity: 0.6;
    cursor: auto;
  }
`;

export const EthLabel = styled.div`
  display: inline;
  vertical-align: middle;
`;

export const SmallSpinner = styled(Spinner)`
  transform-origin: 20px 10px;
  transform: scale(0.6, 0.6);
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
