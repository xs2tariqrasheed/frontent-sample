import styled, { css } from 'styled-components';
import Img from 'components/Img';
import theme from '../../../styles/theme';
import mediaQueries from '../../../styles/mq';
const mobileBg = 'https://www.blockletegames.com/images/GolfCourseMobileTablet.jpg';
const desktopBg = 'https://www.blockletegames.com/images/Generic-Golfer-Card.png';
import detailsBackground from './golfTexturedBackground.svg';
const twepc = 'https://www.blockletegames.com/images/Tommy-Wilson-Elite-Golfer-Card.png';
const twlpc = 'https://www.blockletegames.com/images/Tommy-Wilson-Legend-Golfer-Card.png';
const twppc = 'https://www.blockletegames.com/images/Tommy-Wilson-Pro-Golfer-Card.png';
const ckpc = 'https://www.blockletegames.com/images/Cryptokitties-Golfer-Card.png';
const sppc = 'https://www.blockletegames.com/images/SuperPunch-Golfer-Card.png';
const fgpc = 'https://www.blockletegames.com/images/Founder-Golfer-Card.png';
const gbepc = 'https://www.blockletegames.com/images/GeorgeBoya-Elite-Golfer-Details-Desktop.png';
const gbppc = 'https://www.blockletegames.com/images/GeorgeBoya-Pro-Desktop-Details-Page.png';
const gbl1900pc = 'https://www.blockletegames.com/images/GeorgeBoya-Legend-1900-Golfer-Details-Desktop.png';
const gbl1901pc = 'https://www.blockletegames.com/images/GeorgeBoya-Legend-1901-Golfer-Details-Desktop.png';
const rdepc = 'https://www.blockletegames.com/images/RareDesigner-Elite-Golfer-Card.png';
const rdlpc = 'https://www.blockletegames.com/images/RareDesigner-Legend-Golfer-Card.png';
const rdppc = 'https://www.blockletegames.com/images/RareDesigner-Pro-Golfer-Cards.png';
const s1pc = 'https://www.blockletegames.com/images/Season-1-Golfer-Cards.png';
const nvcGear = 'https://staging.blockletegames.com/images/gear/background/Novice_BG2.png';
const proGear = 'https://staging.blockletegames.com/images/gear/background/Pro_BG2.png';
const eltGear = 'https://staging.blockletegames.com/images/gear/background/Elite_BG2.png';
const lgdGear = 'https://staging.blockletegames.com/images/gear/background/Legend_BG2.png';

export const GolferBackgroundImg = styled.div`
  background-image: url(${desktopBg});
  background-position: top;
  background-size: cover;
  z-index: 20000;
  border-bottom-left-radius: 50% 20px;
  border-bottom-right-radius: 50% 20px;
  position: relative;
  overflow: hidden;
  height: 215px;
  font-family: proxima-nova;

  ${props =>
    props.tokenId > 1800 &&
    props.tokenId < 1840 &&
    css`
      background-image: url(${twppc});
    `}
  ${props =>
    props.tokenId > 1839 &&
    props.tokenId < 1850 &&
    css`
      background-image: url(${twepc});
    `}
  ${props =>
    props.tokenId > 1849 &&
    props.tokenId < 1852 &&
    css`
      background-image: url(${twlpc});
    `}
  ${props =>
    props.tokenId > 501 &&
    props.tokenId < 1240 &&
    css`
      background-image: url(${ckpc});
    `}  
  ${props =>
    props.tokenId < 502 &&
    css`
      background-image: url(${fgpc});
    `}
  ${props =>
    props.tokenId > 1239 &&
    props.tokenId < 1248 &&
    css`
      background-image: url(${fgpc});
    `}  
  ${props =>
    props.tokenId > 1464 &&
    props.tokenId < 1546 &&
    css`
      background-image: url(${sppc});
    `}
  ${props =>
    props.tokenId > 1889 &&
    props.tokenId < 1900 &&
    css`
      background-image: url(${gbepc});
    `}
  ${props =>
    props.tokenId > 1851 &&
    props.tokenId < 1890 &&
    css`
      background-image: url(${gbppc});
    `}
  ${props =>
    props.tokenId === 1900 &&
    css`
      background-image: url(${gbl1900pc});
    `}
  ${props =>
    props.tokenId === 1901 &&
    css`
      background-image: url(${gbl1901pc});
    `}
  ${props =>
    props.tokenId > 1901 &&
    props.tokenId < 1940 &&
    css`
      background-image: url(${rdppc});
    `}
  ${props =>
    props.tokenId > 1939 &&
    props.tokenId < 1950 &&
    css`
      background-image: url(${rdepc});
    `}
  ${props =>
    props.tokenId > 1949 &&
    props.tokenId < 1952 &&
    css`
      background-image: url(${rdlpc});
    `}
  ${props =>
    props.tokenId > 1247 &&
    props.tokenId < 1465 &&
    css`
      background-image: url(${s1pc});
    `}
  ${props =>
    props.tokenId > 1545 &&
    props.tokenId < 1801 &&
    css`
      background-image: url(${s1pc});
    `}
  
  ${props =>
    props.tokenId == 'novice' && css`background-image: url(${nvcGear});` ||
    props.tokenId == 'pro' && css`background-image: url(${proGear});` ||
    props.tokenId == 'elite' && css`background-image: url(${eltGear});` ||
    props.tokenId == 'legend' && css`background-image: url(${lgdGear});`
  }

  &.golfer {
    > img {
      top: -20px;
    }
  }

  &.gear {
    > img {
      top: -90px;
    }
  }
  
  > img {
    width: 90%;
    position: relative;
  }
`;

export const GolferDetailsBackground = styled.div`
  background-color: #ffffff;
  background-image: linear-gradient(
    to bottom, rgba(255, 255, 255, 0), #ffffff
  ), url("${detailsBackground}");
  background-image: -webkit-linear-gradient(
    to bottom, rgba(255, 255, 255, 0), #ffffff
  ), url("${detailsBackground}");
  background-image: -moz-linear-gradient(
    to bottom, rgba(255, 255, 255, 0), #ffffff
  ), url("${detailsBackground}");
  background-repeat: no-repeat;
  margin-top: -30px;
  z-index: 0;
  font-family: proxima-nova;

  &.gears-details {
    .purple {
      color: #322c8f;
    }
  }
`;

export const GolferBackground = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: contain;
`;
// export const CardDetailsSection = styled.div`
//   width: 306px;
//   height: 250px;
// `
export const Oval = styled.div`
  border-radius: 50%;
  height: 15px;
  background-color: #110f29;
  position: absolute;
  width: 100%;
  bottom: 0;
`;

export const BuyGolfer = styled.div`
  border-radius: 2rem;
  background-color: #00bb75;
  padding: 20px 32px;
  text-align: center;
  font-family: Prompt;
  font-size: 16px;
  font-weight: bold;
  color: #f8f7ff;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  margin: 100px 0 0;
`;

export const FounderImage = styled(Img)`
  width: 48px;
  height: 28px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const ImageScaler = styled.div`
  transform: scale(0.7, 0.7);
  ${mediaQueries.md} {
    //transform: scale(0.2, 0.2);
  }
  ${mediaQueries.sm} {
    transform: scale(0.8, 0.8);
  }
  @media only screen and (min-device-width: 640px) and (max-device-width: 770px) {
    transform: scale(0.4, 0.4);
  }
`;

export const ImageWrapper = styled.div`
  //position: absolute;
  //bottom: 0;
  width: 100%;
  height: auto !important;
`;

export const ImageContainer = styled.div`
  //clip-path: inset(0px 0px 0px 0px);
`;

export const PlayerLabel = styled.p`
  width: 45px;
  height: 16px;
  // margin: 0 0 16px 122px;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 1px;
  text-align: right;
  color: #efeefe;
`;

export const PlayerNumber = styled.div`
  font-size: 10px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #00224e;
`;

export const Skill = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  display: inline-flex;
  padding: 5px 5px;
  border: 1pt solid ${theme.color.blueGrayDark};
  border-radius: ${theme.borderRadius};
  font-size: ${theme.fontSize.regular};
  font-weight: ${theme.fontWeight.normal};
  background: ${theme.color.accent};
`;

export const PracticeButton = styled.button`
  width: 100%;
  height: 35px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #3b38c6;
  color: white;
  margin-top: 20px;
`;

export const EtherLabel = styled.div`
  height: 24px;
  margin: 8px 0 0;
  opacity: 0.64;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #ffffff;
`;

export const CCLabel = styled.p`
  cursor: pointer;
  width: 79px;
  height: 40px;
  // margin: 0 10px 8px 0;
  font-size: 40px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #efeefe;
`;

export const WatchListButton = styled.button`
  width: 225px;
  height: 35px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #3b38c6;
  color: white;
  margin-top: 20px;
`;

export const ViewDetails = styled.button`
  width: 150px;
  height: 35px;
  border-radius: 20px;
  color: black;
  font-size: 14px;
  border: 2px solid #3a338f;
  background-color: white;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
  transform: translateY(-15px);
  cursor: pointer;
`;

export const Prox = styled.span`
  font-family: proxima-nova;
`;

export const GolfGreenText = styled.h1`
  color: #2bb673;
`
