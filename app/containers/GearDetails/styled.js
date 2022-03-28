import styled, { css } from 'styled-components';
import GolferImage from '../../components/GolferImage';
import mediaQueries from '../../styles/mq';
const desktopBg =
  'https://www.blockletegames.com/images/GolfCourseBackground.png';
const mobileBg =
  'https://www.blockletegames.com/images/Generic-Golfer-Mobile-Golfer-Details-Page.png';
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
  // border-radius: 13px;
  // box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.21);
  background-image: linear-gradient(to bottom, #6c62c2, #3a338f);
  .watch-button {
    border: 2px solid #06C47E;
    width: 150px;
    height: 35px;
    margin-top: 50px;
    position: relative;
    font-size: 14px;
    font-weight: 900;
  }
  // ${mediaQueries.sm} {
  //   top: -40px;
  // }
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
    // border-bottom: 1px solid #d8d8d8;
  }
  .stats {
    border-radius: 15px;
    // box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.21);
  }
`;

export const StatDifference = styled.div`
  font-family: proxima-nova;
  // color: #888888;
  // font-size: 14px;
  // font-weight: 500;
  // letter-spacing: 2.33px;
  .stat {
    border-radius: 24px;
    border: 1px solid #d0d0d0;
    // font-family: Industry-Ultra;
    // font-size: 20px;
    color: #1a1a1a;
    // margin: 8px 24px;
    text-align: left;
    // padding-left: 50px;
    img {
      vertical-align: text-top;
      margin: 0 10px;
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
  .gearImgHolder {
    border: solid 5px transparent;
    background: #fff;
    background-clip: padding-box;
    height: 70px;
    width: 70px;
    position: absolute;
    border-radius: 35px;

    img {
      position: absolute;
      max-width: 40px;
      top: 10px;
      left: 10px;
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
    .gearImgHolder:before,
    .gearImgHolder:after {
      background-image: url("${noviceRing}");
    }
  }

  &.pro {
    .gearImgHolder:before,
    .gearImgHolder:after  {
      background-image: url("${proRing}");
    }
  }

  &.elite {
    .gearImgHolder:before,
    .gearImgHolder:after  {
      background-image: url(${eliteRing});
    }
  }
  
  &.legend {
    .gearImgHolder:before,
    .gearImgHolder:after  {
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
  padding-bottom: 60px;
  padding-top: 60px;
  background-color: ${props => props.backgroundColor}
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
    ${mediaQueries.sm} {
      background-color: white;
    }
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
  ${mediaQueries.sm} {
    background-image: url(${mobileBg});
    background-position: bottom;
    background-size: 450px 1250px;
`;

export const ProgressBar = styled.div`
  #Power {
    background-color: #ff9500;
  }
`;
