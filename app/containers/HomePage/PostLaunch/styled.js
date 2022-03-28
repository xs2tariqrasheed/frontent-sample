import styled from 'styled-components';
import mediaQueries from '../../../styles/mq';
const desktopBg =
  'https://itas-assets-us-east-1.s3.us-east-2.amazonaws.com/images/HP_hero_graphic-v2-flipped.png';
const mobileBg =
  'https://itas-assets-us-east-1.s3.us-east-2.amazonaws.com/images/HP_mobile_hero_graphic-v2.png';

export const Container = styled.div`
  max-width: 1250px;
  img {
    width: 100%;
  }
  article {
    overflow: hidden;
    position: relative;
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
      padding-top: 350px;
      // background-size: 1600px 1450px;
      // background-position: 20% 100%;
      // padding: 20px 5%;
    }
  }
  p {
    /*opacity: 0.64;*/
    font-family: ProximaNova-Regular;
  }
  a:hover {
    text-decoration: none;
  }
  h1 {
    padding-bottom: 16px;
    font-family: ProximaNova-Black;
    font-size: 64px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: -1.28px;
    ${mediaQueries.sm} {
      font-size: 36px;
      line-height: 1.13;
      border-style: none;
    }
  }
  .maxWidth85 {
    max-width: 85rem;
    ${mediaQueries.sm} {
      padding: 30px;
      margin-top: 30rem;
    }
  }
  .golfersHolder {
    width: 800px;
    float: left;
    margin-top: 150px;
    ${mediaQueries.sm} {
      width: 350px;
      margin: 0 0 20px 0;
    }
  }
  .button {
    width: 200px;
    height: 54px;
    margin: auto;
    text-align: center;
    position: relative;
    display: inline-block;
    &.practice {
      width: 340px;
      margin-top: 27px;
      ${mediaQueries.sm} {
        width: 100%;
      }
    }
  }
  .inner-circle {
    width: 200px;
    height: 54px;
    margin: 0 22px 0 0;
    padding: 3px 0 16px;
    border-radius: 27px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5),
      inset 0 -4px 3px 0 rgba(57, 240, 172, 0.65);
    background-image: linear-gradient(to bottom, #1fd893, #00bb75);
    position: absolute;
    top: 0;
    &.practice {
      width: 340px;
      ${mediaQueries.sm} {
        width: 100%;
      }
    }
  }
  .inner-shadow {
    width: 170px;
    height: 29px;
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
    &.practice {
      width: 310px;
      ${mediaQueries.sm} {
        width: 90%;
      }
    }
  }
  .button-text {
    font-size: 18px;
    font-weight: 900;
    position: relative;
    top: 13px;
    color: #fff;
  }
  .game-features {
    background-color: #f1f1f6;
    text-align: center;
    .feature {
      display: inline-block;
      margin: 40px;
      h2 {
        font-size: 24px;
        font-family: ProximaNova-Black;
        font-weight: 900;
        color: #23262f;
        margin-bottom: 0;
      }
      p {
        font-size: 20px;
        font-family: ProximaNova-Regular;
        text-align: center;
        color: #23262f;
        line-height: 1.2;
      }
      img {
        max-width: 160px;
        margin: auto;
      }
    }
    .ovals {
      display: inline-block;
      position: relative;
      top: 100px;
      .oval {
        width: 8px;
        height: 8px;
        margin: 0 4px 0 0;
        background-color: #322c8f;
        display: inline-block;
        border-radius: 50%;
      }
    }
    ${mediaQueries.xl} {
      &.desktop {
        display: block;
      }
      &.mobile {
        display: none;
      }
    }
    ${mediaQueries.sm} {
      &.desktop {
        display: none;
      }
      &.mobile {
        display: block;
      }
      .feature {
        margin: 20px 0 0 0;
      }
      img {
        padding-bottom: 20px;
      }
      .carousel-indicators {
        display: none;
      }
    }
  }
  .invest,
  .grind {
    h1 {
      font-size: 48px;
      font-family: ProximaNova-Black;
      font-weight: 900;
      line-height: 1.17;
      color: #322c8f;
      ${mediaQueries.sm} {
        font-size: 32px;
      }
    }
    p {
      color: #23262f;
      line-height: 1.5;
      font-family: ProximaNova-Regular;
      font-size: 16px;
    }
  }
  .invest {
    .invest-text {
      ${mediaQueries.sm} {
        position: relative;
        top: 260px;
      }
    }
    .group {
      ${mediaQueries.sm} {
        position: relative;
        top: -320px;
      }
    }
  }
  .video-block {
    text-align: center;
    padding: 50px;
    ${mediaQueries.sm} {
      padding: 2rem;
      text-align: left;
    }
    iframe {
      width: 960px;
      height: 575px;
      ${mediaQueries.sm} {
        width: 330px;
        height: 190px;
      }
    }
    h1 {
      font-size: 48px;
      margin-bottom: 0;
      ${mediaQueries.sm} {
        font-size: 32px;
        line-height: 1.25;
        letter-spacing: -0.32px;
        text-align: left;
      }
    }
    h2 {
      font-family: ProximaNova-Black;
      font-weight: 900;
      font-size: 32px;
      margin: 0 10px;
      ${mediaQueries.sm} {
        margin: 10px;
        font-size: 24px;
      }
    }
    p {
      line-height: 1.33;
      ${mediaQueries.sm} {
        padding-top: 20px;
      }
    }
    img {
      width: 140px;
      height: 47px;
      margin: 5px;
    }
    background-image: linear-gradient(
        238deg,
        rgba(108, 98, 194, 0.45) 100%,
        #3a338f -2%
      ),
      linear-gradient(to bottom, #322c8f, #322c8f);
  }
  .practice-round {
    background-color: #322c8f;
    padding: 80px 40px 40px 40px;
    text-align: center;
    ${mediaQueries.sm} {
      padding: 2rem;
      padding-bottom: 0;
    }
    h1 {
      ${mediaQueries.sm} {
        font-size: 40px;
        line-height: 1;
        letter-spacing: -0.4px;
      }
    }
    .logo {
      width: 350px;
      margin: auto;
      padding-bottom: 40px;
      ${mediaQueries.sm} {
        width: 230px;
      }
    }
    img {
      ${mediaQueries.sm} {
        padding-top: 20px;
      }
    }
  }
`;
