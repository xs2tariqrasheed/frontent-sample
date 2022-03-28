import styled from 'styled-components';

export const Button = styled.button`
  border-color: #b0aec2;
  font-size: 12px;
  text-transform: uppercase;
  &.active,
  &:hover {
    border-color: #655bf5;
    background: rgba(101, 91, 245, 0.1);
  }
`;
