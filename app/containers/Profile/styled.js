import styled from 'styled-components';
import theme from '../../styles/theme';
import mq from '../../styles/mq';

export const Header = styled.h1`
  color: #3a338f;
`;

export const BackgroundImage = styled.div`
  background-image: url('https://picsum.photos/3000/500');
  width: 100%;
  height: 150px;
  @media screen and (min-width: 640px) {
    height: 200px;
  }
  @media screen and (min-width: 768px) {
    height: 250px;
  }
  @media screen and (min-width: 1024px) {
    height: 300px;
  }
  @media screen and (min-width: 2000px) {
    height: 400px;
  }
`;

export const SignUpForm = styled.div`
  padding: 16px 16px 40px 16px;
  p {
    opacity: 0.64;
  }
  .button {
    width: 154px;
    height: 31px;
    margin: auto;
    text-align: center;
    color: white;
    position: relative;
    display: block;
  }
  .inner-circle {
    width: 154px;
    height: 31px;
    margin: 0 22px 0 0;
    padding: 3px 0 16px;
    border-radius: 27px;
    -webkit-box-shadow: 0px 5px 9px -3px #000000;
    box-shadow: 0px 5px 9px -3px #000000;
    background-image: linear-gradient(to bottom, #07c47d, #59d5a6);
    position: absolute;
    top: 0;
    z-index: 3;
  }
  .inner-shadow {
    width: 130px;
    height: 18px;
    // margin: 0 0 6px;
    border-radius: 27px;
    background-image: linear-gradient(
      to bottom,
      #07c47d,
      rgba(255, 255, 255, 0.3)
    );
    position: absolute;
    left: 13px;
    top: 0;
    z-index: 30;
  }
  .button-text {
    font-size: 14px;
    font-weight: 900;
    position: relative;
    top: 6px;
    left: 3px;
    z-index: 30;
    opacity: 1;
  }
  ${mq.xl} {
    padding-top: 50px;
    width: 85%;
    margin: auto;
  }
  ${mq.lg} {
    width: 85%;
    margin: auto;
    padding-bottom: 100px;
  }
  ${mq.md} {
    width: 85%;
    margin: auto;
    padding-bottom: 50px;
  }
  ${mq.sm} {
    width: 100%;
    padding-left: 20px;
    padding-top: 16px;
  }
`;
