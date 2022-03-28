import styled from 'styled-components';

export const Consent = styled.label`
  display: block;
  margin-bottom: 1rem;
  position: relative;
  padding-left: 1.8rem;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ span {
      background-color: white;
      border: 4px solid #655bf5;
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
    border: 0.1rem solid #3b38c6;
    border-radius: 4;

    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 4px;
      top: 1px;
      width: 0.4rem;
      height: 0.7rem;
      border: solid #655bf5;
      border-width: 0 0.2rem 0.2rem 0;
      transform: rotate(45deg);
    }
  }

  &:hover {
    input ~ span {
    }
  }
`;
