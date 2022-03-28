import styled from 'styled-components';
import theme from '../../../styles/theme';

export const Label = styled.label`
  position: relative;
  display: inline-block;
  font-family: Roboto;
  width: 6rem;
  height: 3rem;
  outline: none;

  input {
    opacity: 0;

    &:checked + div {
      background-color: ${theme.color.primary};
    }

    &:checked + div:before {
      transform: translateX(2.6rem);
    }
  }

  div {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 3rem;

    &:before {
      position: absolute;
      content: '';
      height: 2.2rem;
      width: 2.2rem;
      left: 0.6rem;
      bottom: 0.4rem;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
`;
