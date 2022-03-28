import styled from 'styled-components';
import theme from '../../../styles/theme';

export const Wrapper = styled.label`
  position: relative;
  padding-left: 1.8rem;
  padding-top: 0rem;
  cursor: pointer;
  text-align: left;
  font-family: Roboto;
  font-size: 18px;
  margin-bottom: 1rem;
  color: white;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ span {
      background-color: ${theme.color.lightBackground};

      &:after {
        display: block;
      }
    }
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 1.4rem;
    width: 1.4rem;
    background: white;
    border: 0.1rem solid ${theme.color.border};
    border-radius: ${theme.borderRadius};

    &:after {
      content: '';
      position: absolute;
      display: none;

      left: 0.35rem;
      top: 0.3rem;
      width: 0.4rem;
      height: 0.7rem;
      border: solid ${theme.color.primary};
      border-width: 0 0.2rem 0.2rem 0;
      transform: rotate(45deg);
    }
  }

  &:hover {
    input ~ span {
    }
  }
`;
