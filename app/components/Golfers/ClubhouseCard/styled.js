
import styled from 'styled-components';
const noviceRing = 'https://www.blockletegames.com/images/01_Novice.png';
const proRing = 'https://www.blockletegames.com/images/02_Pro.png';
const eliteRing = 'https://www.blockletegames.com/images/03_Elite.png';
const legendRing = 'https://www.blockletegames.com/images/04_Legend.png';

export const GolferContainer = styled.div`
  border-top: solid 1px #d0d0d0;
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
      top: -65px;
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
 `

export const GolferBackgroundImg = styled.div`
  z-index: 20000;
  border-bottom-left-radius: 50% 20px;
  border-bottom-right-radius: 50% 20px;
  position: relative;
  width: 80px;
  height: 80px;

  p {
    color: #fff;
    background: #3a338f;
    top: 
  }
`

export const Industry = styled.p`
  font-family: industry, sans-serif;
  font-weight: 900;
`;

export const BottomCircle = styled.div`
  border-top: 0;
  overflow: hidden;
  position: relative;
  left: 0;
  border-radius: 35px;
  height: 70px;
  width: 70px;
  top: 0;

  div {
    top: 55px;
    position: relative;
  }
`;
