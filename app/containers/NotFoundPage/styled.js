import styled from 'styled-components';
const desktopShip = 'https://www.blockletegames.com/images/desktopShip%402x.png';
import mediaQueries from '../../styles/mq';

export const MainContainer = styled.div`
  min-height: 70vh;
  background-image: url(${desktopShip});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center right;
  ${mediaQueries.sm} {
    background-image: none;
  }
`;

export const Headline = styled.h1`
  font-size: 150px;
  font-weight: 900;
  ${mediaQueries.sm} {
    text-align: center;
    font-size: 64px;
  }
`;

export const Subheadline = styled.h2`
  font-size: 64px;
  font-weight: 100;
  ${mediaQueries.sm} {
    text-align: center;
    font-size: 40px;
    width: 50%;
    margin: 0 auto;
  }
`;
