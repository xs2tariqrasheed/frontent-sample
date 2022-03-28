import styled from 'styled-components';

export const Wrapper = styled.div`
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
    z-index: 50;
  }
  .button-text {
    font-size: 14px;
    font-weight: 900;
    position: relative;
    top: 6px;
    left: 3px;
    z-index: 10000;
    opacity: 1;
  }
`;
