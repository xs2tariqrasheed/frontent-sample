import styled, { css } from 'styled-components';
import Img from 'components/Img';
import theme from '../../../styles/theme';
import mediaQueries from '../../../styles/mq';
import desktopBg from '../../../images/chargedGear.png';
import detailsBackground from './golfTexturedBackground.svg';

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

  &.charged {
    > img {
      top: -90px;
    }
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

export const WindSpeed = styled.div`
  width: 80%;
  border: 2px solid #edeef1;
`
export const Charge = styled.div`
  background-color: #322c8f;
  width: 80%;
  .bar-division {
    width: 20%;
    border-right: 1px solid #322c8f;
    z-index: 10;
  }
.charged > div {
  background-color: #07c47e;
}
`