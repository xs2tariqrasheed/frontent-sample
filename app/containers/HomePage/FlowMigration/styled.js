import styled from 'styled-components';
const desktopBg = 'https://www.blockletegames.com/images/HP_hero_graphic-v2.png';
const mobileBg = 'https://www.blockletegames.com/images/HP_mobile_hero_graphic-v2.png';
import mediaQueries from '../../../styles/mq';

export const Container = styled.div`
  overflow: hidden;
  position: relative;
  background-image: url(${desktopBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: contain;
  ${mediaQueries.sm} {
    background-image: url(${mobileBg});
    // background-size: 1600px 1450px;
    // background-position: 50% 100%;
    // padding: 20px 5%;
  }
  img {
    width: 100%;
  }
  article {
    position: relative;
  }
  p {
    /*opacity: 0.64;*/
  }
  h1 {
    border-style: dotted;
    border-width: 0 0 4px 0;
    padding-bottom: 5rem;
    ${mediaQueries.sm} {
      font-size: 38px;
      line-height: 0.89;
      border-style: none;
      padding-bottom: 2rem;
    }
  }
  .maxWidth75 {
    max-width: 75rem;
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
    width: 255px;
    height: 54px;
    margin: auto;
    text-align: center;
    color: #3a338f;
    position: relative;
    display: block;
  }
  .inner-circle {
    width: 255px;
    height: 54px;
    margin: 0 22px 0 0;
    padding: 3px 0 16px;
    border-radius: 27px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5),
      inset 0 -4px 3px 0 rgba(255, 255, 255, 0.86);
    background-image: linear-gradient(to bottom, #ffffff, #dad8d8);
    position: absolute;
    top: 0;
  }
  .inner-shadow {
    width: 225px;
    height: 29px;
    margin: 0 0 6px;
    border-radius: 27px;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      #ffffff
    );
    position: absolute;
    left: 15px;
    top: 0;
  }
  .button-text {
    font-size: 18px;
    font-weight: 900;
    position: relative;
    top: 13px;
  }
`;
