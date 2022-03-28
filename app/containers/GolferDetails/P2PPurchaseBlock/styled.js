import styled from 'styled-components';
import Spinner from 'components/Spinner';
import Img from 'components/Img';
import mq from '../../../styles/mq';

export const Container = styled.div`
  margin-top: -90px;
  margin-bottom: 20px;
  margin-left: 610px;

  ${mq.sm} {
    margin-top: 0px;
    margin-left: 8px;
  }
`;

export const SmallSpinner = styled(Spinner)`
  transform-origin: 20px 10px;
  transform: scale(0.6, 0.6);
`;

export const EthLogo = styled(Img)`
  display: inline;
  width: 13px;
  height: 20px;
  margin-right: 5px;
  transform: scale(0.7, 0.7);
  margin-bottom: 0px;
`;

export const EthLabel = styled.div`
  display: inline;
  vertical-align: middle;
  color: #fff;
  padding: 0.5rem;
  font-size: 1.5rem;
  line-height: 2rem;
  width: 100%;
  font-family: Prompt;
`;

export const PurchaseArea = styled.div`
  .button {
    width: 150px;
    height: 30px;
    margin: auto;
    text-align: center;
    position: relative;
    display: inline-block;
    &.practice {
      width: 340px;
      margin-top: 27px;
      ${mq.sm} {
        width: 100%;
      }
    }
  }
  .inner-circle {
    width: 150px;
    height: 30px;
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
      ${mq.sm} {
        width: 100%;
      }
    }
  }
  .inner-shadow {
    width: 120px;
    height: 15px;
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
      ${mq.sm} {
        width: 90%;
      }
    }
  }
  .button-text {
    font-size: 14px;
    font-weight: 500;
    position: relative;
    color: #fff;
    top: 3px;
  }
  .price {
  }
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;
