import styled, { css } from 'styled-components';
const close = 'https://www.blockletegames.com/images/close%403x.png';

export const Wrap = styled.div`
  padding: 20px 20px;
`;

export const CloseLink = styled.a`
  background-image: url(${close});
  background-size: contain;
  width: 25px;
  height: 25px;
  cursor: pointer;
  object-fit: contain;
  text-decoration: none;
  float: right;
`;

export const Modal = styled.div`
  z-index: 999;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.5s;
  background-color: rgba(2, 0, 26, 0.56);
  p,
  ul,
  ol {
    opacity: 0.64;
    font-family: Prompt;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    letter-spacing: normal;
    color: #15122f;
  }
  ul,
  ol {
    margin-left: 1rem;
  }
  ${props =>
    props.open &&
    css`
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
    `}
  &>div {
    background: #f3f2ff;
    border-radius: 16px;
    height: 800px;
  }
  section {
    overflow: hidden;
    overflow-y: auto;
    height: 85%;

    ul,
    ol {
      margin-left: 2rem;
      list-style: decimal;
    }
  }
  .card {
    border-radius: 8px;
    h1,
    ul {
      color: #110f29;
    }
    img {
      margin: auto;
    }
    p {
      opacity: 0.48;
      font-family: Oswald;
      font-size: 14px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.14;
      letter-spacing: 0.93px;
      text-align: center;
      color: #02001a;
    }
    &.novice {
      .card-header {
        background-color: rgba(38, 34, 93, 0.08);
      }
    }
    &.pro {
      .card-header {
        background-color: rgba(101, 91, 245, 0.08);
      }
    }
    &.elite {
      .card-header {
        background-color: rgba(55, 232, 147, 0.08);
      }
    }
    &.legend {
      .card-header {
        background-color: rgba(255, 197, 48, 0.08);
      }
    }
  }
  header {
    h1 {
      font-family: Oswald;
      font-size: 32px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      color: #15122f;
    }
    border-bottom: solid 1px rgba(2, 0, 26, 0.08);
  }
  .card-header {
    border-radius: 3px 3px 0 0;
  }
  .section-description {
    border-radius: 0 0 3px 3px;
  }
  .emoji {
    background: #ffc530;
    border-radius: 50px;
    display: block;
    margin: 0 auto;
    width: 54px;
    height: 54px;
    font-size: 38px;
  }
`;
