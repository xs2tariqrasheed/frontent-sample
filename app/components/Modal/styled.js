import styled, { css } from 'styled-components';
const triangle = 'https://www.blockletegames.com/images/rag-triangle.png';

export const ModalContainer = styled.div`
  z-index: 999;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.5s;
  background-color: rgba(58, 52, 143, 0.8);
  ${props => props.lobbyModal &&
    css`
      background-color: rgba(0, 0, 0, 0.6);
      height: 100% !important;
      &>div {
        margin-left: 0;
        margin-right: 0;
        position: absolute;
        border-radius: 6px 6px 0px 0px;
        background: white !important;
      }
    `
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
    border-radius: 5px;
  }
  .card {
    box-shadow: 0 1px 3px 0 rgba(17, 15, 41, 0.1);
    h1,
    ul {
      color: #110f29;
    }
    &.amateur {
      .card-header {
        background: #4f47c2;
      }
      .emoji {
        background-color: #655bf5;
      }
      &:hover {
        .card-header {
          background-color: #655bf5;
        }
        .emoji {
          background-color: #4f47c2;
        }
      }
    }
    &.pro {
      .card-header {
        background: #2bb673;
      }
      .emoji {
        background-color: #1f8252;
      }
      &:hover {
        .card-header {
          background-color: #37e893;
        }
        .emoji {
          background-color: #2bb673;
        }
      }
    }
    &:hover {
      box-shadow: 0 4px 8px 0 rgba(17, 15, 41, 0.1);
      .card-header {
        background-color: #ffd363;
      }
      .emoji {
        background-color: #ffe296;
      }
    }
  }
  ul {
    text-indent: 1rem;
  }
  header {
    border-radius: 5px;
    background-image: url(${triangle});
    background-size: 16px;
    background-repeat: repeat no-repeat;
    background-position: bottom;
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

export const ModalFooter = styled.div`
  button.btn-primary.btn.btn-primary {
    background-color: #00bb75;
    border-radius: 28px;
    padding: 16px;
    width: 65%;
    margin: 10px;
    border: none;
    font-family: prompt;
    font-weight: bold;
  }
  button#reset-button {
    background-color: #fff;
    width: 25%;
    border: 1px solid #02001a;
    color: #02001a;
  }
`;

export const ModalHeader = styled.div`
  .btn-primary.close:hover {
    background-color: #fff;
  }
`;
