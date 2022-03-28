import styled from 'styled-components';
import mediaQueries from '../../styles/mq';
import detailsBackground from '../../images/marketplace/golfTexturedBackground.svg';
const noviceRing = 'https://www.blockletegames.com/images/01_Novice.png';
const proRing = 'https://www.blockletegames.com/images/02_Pro.png';
const eliteRing = 'https://www.blockletegames.com/images/03_Elite.png';
const legendRing = 'https://www.blockletegames.com/images/04_Legend.png';

export const PlayButton = styled.div`
  width: 320px;
  height: 45px;
  text-align: center;
  color: white;
  position: relative;
  display: block;

  .inner-circle {
    width: 320px;
    height: 45px;
    padding: 3px 0 16px;
    border-radius: 27px;
    border-bottom: 3px solid #d0d0d0;
    background-color: #f3f3f3;
    position: absolute;
    top: 0;
    z-index: 3;
  }
  .inner-shadow {
    width: 295px;
    height: 25px;
    border-radius: 27px;
    background-color: #ffffff;
    position: absolute;
    left: 13px;
    top: 0;
    z-index: 50;
  }
  .button-text {
    position: relative;
    top: 7px;
    left: 3px;
    z-index: 900;
    opacity: 1;
  }
`;
export const ModalActionButton = styled.button`
  width: 320px;
  height: 45px;
  text-align: center;
  color: white;
  position: relative;
  display: block;

  .inner-circle {
    width: 320px;
    height: 45px;
    padding: 3px 0 16px;
    border-radius: 27px;
    border-bottom: 3px solid #d0d0d0;
    background-color: #3a338f;
    position: absolute;
    top: 0;
    z-index: 3;
  }
  .inner-shadow {
    width: 295px;
    height: 25px;
    border-radius: 27px;
    background-color: #4e489a;
    position: absolute;
    left: 13px;
    top: 0;
    z-index: 50;
  }
  .button-text {
    position: relative;
    top: 7px;
    left: 3px;
    z-index: 900;
    opacity: 1;
  }
`;
export const LevelUpGolfer = styled.div`
  background-color: rgba(58, 51, 143);
  color: white;
  width: 80%;
  border-bottom: 5px solid #26235c;
`;
export const Industry = styled.p`
  font-family: industry, sans-serif;
`;
export const GolferDetailsBackground = styled.div`
  background-image: url("${detailsBackground}");
  border-radius: 10px;
  width: 60%;
  height: 100%;
  ${mediaQueries.sm} {
    border-radius: 0;
    width: 100%;
  }
`;
export const OutlinedButton = styled.div`
  background-color: white;
  border: 2px solid #d8d8d8;
`;
export const DesktopPlayButton = styled.button`
  background-color: #d8d8d8;
  border-radius: 4px;
`;
export const Parallelogram = styled.div`
  clip-path: polygon(0 0, 100% 0%, 92% 100%, 0 100%);
`;
export const Subheading = styled.p`
  color: #878787;
  letter-spacing: 0.3em;
`;
export const ApplyMedalsDeactivated = styled.button`
  border: 2px solid #d0d0d0;
  width: 80%;
  border-radius: 20px;
`;
export const ApplyMedalsError = styled.button`
  border: 2px solid #ff296e;
  width: 80%;
  border-radius: 20px;
`;
export const ApplyMedals = styled.button`
  width: 80%;
  border-radius: 20px;
  background-color: #09c47d;
  border-bottom: 3px solid #00975e;
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

export const StatDifference = styled.div`
  font-family: proxima-nova;
  color: #888888;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2.33px;
  .stat {
    border-radius: 24px;
    border: 1px solid #d0d0d0;
    font-family: Industry;
    font-size: 20px;
    color: #1a1a1a;
    margin: 8px 24px;
    text-align: left;
    padding-left: 50px;
    img {
      vertical-align: text-top;
      margin: 0 10px;
    }
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

export const PurchaseBlock = styled.div`
  position: relative;
  padding: 20px 40px 10px;
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
  .button {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    text-align: center;
    position: relative;
    &.gift {
      .inner-circle {
        background-image: linear-gradient(to bottom, #fff, #dad8d8);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5), inset 0 -4px 3px 0 rgba(255, 255, 255, 0.86);
      }
      .inner-shadow {
        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff);
      }
      .button-text {
        color: #3a338f;
      }
    }
  }
  .inner-circle {
    width: 100%;
    height: 40px;
    margin: 0 22px 0 0;
    padding: 3px 0 16px;
    border-radius: 27px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5),
      inset 0 -4px 3px 0 rgba(57, 240, 172, 0.65);
    background-image: linear-gradient(to bottom, #1fd893, #00bb75);
    position: absolute;
    top: 0;
    }
  }
  .inner-shadow {
    width: 90%;
    height: 25px;
    margin: 0 0 6px;
    border-radius: 27px;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      #2cdf9c
    );
    position: absolute;
    left: 15px;
    top: 0;
    }
  }
  .button-text {
    font-size: 16px;
    font-family: proxima-nova;
    font-weight: 900;
    position: relative;
    color: #fff;
    top: 5px;
  }
  .price {
  }
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const ChargeBarContainer = styled.div`
  border-radius: 30px;
  border: 1px solid #d0d0d0;
  font-size: 14px;
  color: #fff;
  margin: 8px 24px;
  text-align: left;
  background-color: #3b338f;
  img {
    vertical-align: text-top;
    margin: 0 10px;
  }
  .bar-division {
    width: 25%;
    border-right: 2px solid #3b338f;
    z-index: 10;
    &:last-child {
      border-right: none;
    }
  }
  .lightning {
    border-radius: 50%;
    background-color: #fff;
    margin: 7px;
    padding: 9px 10px;
  }
`;
