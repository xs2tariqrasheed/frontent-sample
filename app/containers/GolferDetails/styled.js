import styled, { css } from 'styled-components';
import GolferImage from '../../components/GolferImage';
import mediaQueries from '../../styles/mq';
const desktopBg =
  'https://www.blockletegames.com/images/GolfCourseBackground.png';
const mobileBg =
  'https://www.blockletegames.com/images/Generic-Golfer-Mobile-Golfer-Details-Page.png';
const statsBg = 'https://www.blockletegames.com/images/DotBackground.png';
const twpm =
  'https://www.blockletegames.com/images/Tommy-Wilson-Pro-Golfer-Details-Mobile.png';
const twem =
  'https://www.blockletegames.com/images/Tommy-Wilson-Elite-Golfer-Details-Mobile.png';
const twlm =
  'https://www.blockletegames.com/images/Tommy-Wilson-Legend-Golfer-Details-Mobile.png';
const twe =
  'https://www.blockletegames.com/images/Tommy-Wilson-Elite-Golfer-Details-Desktop.png';
const twl =
  'https://www.blockletegames.com/images/Tommy-Wilson-Legend-Golfer-Details-Desktop.png';
const twp =
  'https://www.blockletegames.com/images/Tommy-Wilson-Pro-Golfer-Details-Desktop.png';
const ck =
  'https://www.blockletegames.com/images/Cryptokitties-Golfer-Details-Desktop.png';
const ckm =
  'https://www.blockletegames.com/images/Cryptokitties-Golfer-Details-Mobile.png';
const fg =
  'https://www.blockletegames.com/images/Founder-Golfer-Detail-Desktop.png';
const fgm =
  'https://www.blockletegames.com/images/Founder-Golfer-Details-Mobile.png';
const sp =
  'https://www.blockletegames.com/images/SuperPunch-Golfer-Details-Desktop.png';
const spm =
  'https://www.blockletegames.com/images/SuperPunch-Golfer-Details-Mobile.png';
const gbe =
  'https://www.blockletegames.com/images/GeorgeBoya-Elite-Golfer-Details-Desktop.png';
const gbem =
  'https://www.blockletegames.com/images/GeorgeBoya-Elite-Golfer-Details-Mobile.png';
const gbp =
  'https://www.blockletegames.com/images/GeorgeBoya-Pro-Desktop-Details-Page.png';
const gbpm =
  'https://www.blockletegames.com/images/GeorgeBoya-Pro-Mobile-Details-Page.png';
const gbl1900 =
  'https://www.blockletegames.com/images/GeorgeBoya-Legend-1900-Golfer-Details-Desktop.png';
const gbl1900m =
  'https://www.blockletegames.com/images/GeorgeBoya-Legend-1900-Golfer-Details-Mobile.png';
const gbl1901 =
  'https://www.blockletegames.com/images/GeorgeBoya-Legend-1901-Golfer-Details-Desktop.png';
const gbl1901m =
  'https://www.blockletegames.com/images/GeorgeBoya-Legend-1901-Golfer-Details-Mobile.png';
const rde =
  'https://www.blockletegames.com/images/RareDesigner-Elite-Golfer-Details-Desktop.png';
const rdem =
  'https://www.blockletegames.com/images/RareDesigner-Elite-Golfer-Details-Mobile.png';
const rdl =
  'https://www.blockletegames.com/images/RareDesigner-Legend-Golfer-Details-Desktop.png';
const rdlm =
  'https://www.blockletegames.com/images/RareDesigner-Legend-Golfer-Details-Mobile.png';
const rdp =
  'https://www.blockletegames.com/images/RareDesigner-Pro-Golfer-Details-Desktop.png';
const rdpm =
  'https://www.blockletegames.com/images/RareDesigner-Pro-Golfer-Details-Mobile.png';
const s1 =
  'https://www.blockletegames.com/images/Season-1-Golfer-Details-Desktop.png';
const s1m =
  'https://www.blockletegames.com/images/Season-1-Golfer-Details-Mobile.png';
const noviceRing = 'https://www.blockletegames.com/images/01_Novice.png';
const proRing = 'https://www.blockletegames.com/images/02_Pro.png';
const eliteRing = 'https://www.blockletegames.com/images/03_Elite.png';
const legendRing = 'https://www.blockletegames.com/images/04_Legend.png';

export const DetailGolferImage = styled(GolferImage)`
  transform: scale(1.4, 1.4);
  top: -30px;
  ${mediaQueries.sm} {
    transform: scale(1.2, 1.2);
    left: 50px;
    top: -80px;
  }
`;

export const Oval = styled.div`
  border-radius: 50%;
  height: 44px;
  opacity: 0.35;
  mix-blend-mode: multiply;
  background-color: #d8d8d8;
  position: absolute;
  bottom: -15px;
  ${mediaQueries.sm} {
    left: 26%;
  }
`;

export const GolferHeader = styled.div`
  ${mediaQueries.sm} {
    height: 25rem;
    // img {
    //   transform: scale(1.2, 1.2);
    // }
  }
`;

export const PurchaseBlock = styled.div`
  position: relative;
  border-radius: 13px;
  box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.21);
  background-image: linear-gradient(to bottom, #6c62c2, #3a338f);
  .watch-button {
    border: 2px solid #fff;
    width: 150px;
    margin-top: 20px;
    font-size: 14px;
    font-weight: 900;
  }
  ${mediaQueries.sm} {
    top: -40px;
  }
`;

export const StatsBlock = styled.div`
  #Power > div {
    background-color: #ff9500;
  }
  #Accuracy > div {
    background-color: #00ccff;
  }
  #Composure > div {
    background-color: #d361ff;
  }
  #Stamina > div {
    background-color: #ff296e;
  }
  .bar-division {
    width: 10%;
    border-right: 1px solid #fff;
    z-index: 10;
  }
  .top-half {
    border-bottom: 1px solid #d8d8d8;
  }
  .stats {
    border-radius: 15px;
    box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.21);
  }
  ${mediaQueries.sm} {
    section {
      margin-left: 5%;
      margin-right: 5%;
      width: 90%;
    }
  }
`;

export const GolferContainer = styled.div`
  overflow: hidden;

  div {
    //setting standard height/width for skill icons
    img.m-auto {
      height: 29px;
      width: 25px;
    }
  }
  .golferImgHolder {
    border: solid 5px transparent;
    background: #fff;
    background-clip: padding-box;
    height: 70px;
    width: 70px;
    position: absolute;
    border-radius: 35px;

    img {
      position: absolute;
      max-width: 200px;
      top: -50px;
      left: -70px;
    }
    
    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      margin: -10px;
      background-size: 80px;
    }

    &:before {
      z-index: -1;
    }

    &:after {
      top: 50px;
      background-position-y: 30px;
    }
  }

  &.novice {
    .golferImgHolder:before,
    .golferImgHolder:after {
      background-image: url("${noviceRing}");
    }
  }

  &.pro {
    .golferImgHolder:before,
    .golferImgHolder:after  {
      background-image: url("${proRing}");
    }
  }

  &.elite {
    .golferImgHolder:before,
    .golferImgHolder:after  {
      background-image: url(${eliteRing});
    }
  }
  
  &.legend {
    .golferImgHolder:before,
    .golferImgHolder:after  {
      background-image: url("${legendRing}");
    }
  }
 `;

export const GolferBackgroundImg = styled.div`
  z-index: 10;
  border-bottom-left-radius: 50% 20px;
  border-bottom-right-radius: 50% 20px;
  position: relative;
  width: 80px;
  height: 80px;

  p {
    color: #fff;
    background: #3a338f;
    top: ;
  }
`;

export const SaleHistory = styled.div`
  background-color: #f8f8f9;
  padding-bottom: 60px;
  padding-top: 60px;
  .table-border {
    border: solid 2px #d8dae1;
    border-radius: 13px;
    padding: 24px 24px 22px;
    background-color: #fcfcfd;
  }
  tr td {
    color: #313131;
    font-size: 16px;
    font-family: proxima-nova;
    padding: 0 40px;
    border-bottom: solid 1px #d8dae1;
  }
  .no-sales {
    border-bottom: solid 1px #d8dae1;
  }
  .price {
    font-size: 24px;
    font-family: proxima-nova;
    font-weight: 900;
  }
  th {
    padding: 0 40px;
    background-color: #f4f5f6;
    font-family: proxima-nova;
    font-weight: 900;
    font-size: 20px;
    color: #313131;
  }
  th:first-child {
    border-radius: 13px 0 0 13px;
  }
  th:last-child {
    border-radius: 0 13px 13px 0;
  }
  ${mediaQueries.sm} {
    padding-bottom: 30px;
    padding-top: 30px;
    tr td {
      padding: 0 10px;
    }
    th {
      padding: 0 10px;
    }
    .table-border {
      padding: 10px;
    }
    .no-sales td {
      padding: 0;
      font-size: 13px;
    }
  }
`;

export const Container = styled.header`
background-image: linear-gradient(
  89deg,
  #0e0a51 0%,
  rgba(58, 51, 143, 0) 65%
),
url(${desktopBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: contain;
  ${props =>
    props.tokenId > 1800 &&
    props.tokenId < 1840 &&
    css`
      background-image: url(${twp});
    `}
  ${props =>
    props.tokenId > 1839 &&
    props.tokenId < 1850 &&
    css`
      background-image: url(${twe});
    `}
  ${props =>
    props.tokenId > 1849 &&
    props.tokenId < 1852 &&
    css`
      background-image: url(${twl});
    `}
  ${props =>
    props.tokenId > 501 &&
    props.tokenId < 1240 &&
    css`
      background-image: url(${ck});
    `}  
  ${props =>
    props.tokenId < 502 &&
    css`
      background-image: url(${fg});
    `}
  ${props =>
    props.tokenId > 1239 &&
    props.tokenId < 1248 &&
    css`
      background-image: url(${fg});
    `}  
  ${props =>
    props.tokenId > 1464 &&
    props.tokenId < 1546 &&
    css`
      background-image: url(${sp});
    `}
  ${props =>
    props.tokenId > 1889 &&
    props.tokenId < 1900 &&
    css`
      background-image: url(${gbe});
    `}  
  ${props =>
    props.tokenId > 1851 &&
    props.tokenId < 1890 &&
    css`
      background-image: url(${gbp});
    `}
  ${props =>
    props.tokenId === 1900 &&
    css`
      background-image: url(${gbl1900});
    `}  
  ${props =>
    props.tokenId === 1901 &&
    css`
      background-image: url(${gbl1901});
    `}
  ${props =>
    props.tokenId > 1901 &&
    props.tokenId < 1940 &&
    css`
      background-image: url(${rdp});
    `}  
  ${props =>
    props.tokenId > 1939 &&
    props.tokenId < 1950 &&
    css`
      background-image: url(${rde});
    `}
  ${props =>
    props.tokenId > 1949 &&
    props.tokenId < 1952 &&
    css`
      background-image: url(${rdl});
    `}  
  ${props =>
    props.tokenId > 1247 &&
    props.tokenId < 1465 &&
    css`
      background-image: url(${s1});
    `}
  ${props =>
    props.tokenId > 1545 &&
    props.tokenId < 1801 &&
    css`
      background-image: url(${s1});
    `}  
  ${mediaQueries.sm} {
    background-image: url(${mobileBg});
    background-position: bottom;
    background-size: 450px 1250px;
    ${props =>
      props.tokenId > 1800 &&
      props.tokenId < 1840 &&
      css`
        background-image: url(${twpm});
        background-size: 420px;
      `}
    ${props =>
      props.tokenId > 1839 &&
      props.tokenId < 1850 &&
      css`
        background-image: url(${twem});
        background-size: 420px;
      `}
    ${props =>
      props.tokenId > 1849 &&
      props.tokenId < 1852 &&
      css`
        background-image: url(${twlm});
        background-size: 420px;
      `}
    ${props =>
      props.tokenId > 501 &&
      props.tokenId < 1240 &&
      css`
        background-image: url(${ckm});
        background-size: 420px;
      `}  
    ${props =>
      props.tokenId < 502 &&
      css`
        background-image: url(${fgm});
        background-size: 420px;
      `}
    ${props =>
      props.tokenId > 1239 &&
      props.tokenId < 1248 &&
      css`
        background-image: url(${fgm});
        background-size: 420px;
      `}  
    ${props =>
      props.tokenId > 1464 &&
      props.tokenId < 1546 &&
      css`
        background-image: url(${spm});
        background-size: 420px;
      `}
    ${props =>
      props.tokenId > 1889 &&
      props.tokenId < 1900 &&
      css`
        background-image: url(${gbem});
        background-size: 420px;
      `}  
    ${props =>
      props.tokenId > 1851 &&
      props.tokenId < 1890 &&
      css`
        background-image: url(${gbpm});
        background-size: 420px;
      `}
    ${props =>
      props.tokenId === 1900 &&
      css`
        background-image: url(${gbl1900m});
        background-size: 420px;
      `}  
    ${props =>
      props.tokenId === 1901 &&
      css`
        background-image: url(${gbl1901m});
        background-size: 420px;
      `}
    ${props =>
      props.tokenId > 1901 &&
      props.tokenId < 1940 &&
      css`
        background-image: url(${rdpm});
        background-size: 420px;
      `}  
    ${props =>
      props.tokenId > 1939 &&
      props.tokenId < 1950 &&
      css`
        background-image: url(${rdem});
        background-size: 420px;
      `}
    ${props =>
      props.tokenId > 1949 &&
      props.tokenId < 1952 &&
      css`
        background-image: url(${rdlm});
        background-size: 420px;
      `}  
    ${props =>
      props.tokenId > 1247 &&
      props.tokenId < 1465 &&
      css`
        background-image: url(${s1m});
        background-size: 420px;
      `}
    ${props =>
      props.tokenId > 1545 &&
      props.tokenId < 1801 &&
      css`
        background-image: url(${s1m});
        background-size: 420px;
      `}  
  }
  //opacity: 0.74;
  //mix-blend-mode: multiply;
`;

export const ProgressBar = styled.div`
  #Power {
    background-color: #ff9500;
  }
`;
