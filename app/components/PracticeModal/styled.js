import styled, { css } from 'styled-components';
const triangle = 'https://www.blockletegames.com/images/rag-triangle.png';
const close = 'https://www.blockletegames.com/images/canel-close-purp%403x.png';

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
`;

export const Modal = styled.div`
  z-index: 999;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.5s;
  background-color: rgba(58, 52, 143, 0.8);
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
