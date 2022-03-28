import { createGlobalStyle } from 'styled-components';
const arrowPoint = 'https://www.blockletegames.com/images/arrow-point%403x.png';

const GlobalStyle = createGlobalStyle`
  //body {
  //  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  //}
  //body.fontLoaded {
  //  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  //}
  body {
    margin: auto !important;
    max-width: 1312px;
    .optanon-alert-box-wrapper {
      left: 0;
    }
  }
  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
  .triangle-link {
    position: relative;
    &:after {
      content: '';
      display: block;
      width: 24px;
      height: 24px;
      background-image: url(${arrowPoint});
      object-fit: contain;
      position: absolute;
      right: -30px;
      top: -1px;
      background-size: contain;
    }
  }
  .callout-underline {
    &:after {
      content: '';
      height: 8px;
      width: 176px;
      background: #ffd363;
      display: block;
      margin-top: 0.25rem;
    }
  }
  .ribbon-cap {
    position: relative;
    display: inline-block;
    //&:before {
    //content: '';
    //position: absolute;
    //border-color: transparent #ffd363;
    //border-style: solid;
    //border-width: 0 0 26px 15px;
    //height: auto;
    //width: 0;
    //right: -15px;
    //top: 0;
    //z-index: 5;
    //}
    &:after {
    content: '';
    position: absolute;
    border-color: transparent #ffc530;
    border-style: solid;
    border-width: 0 0 26px 15px;
    height: auto;
    width: 0;
    right: -15px;
    top: 0;
    z-index: 10;
    }
  }
`;

export default GlobalStyle;
