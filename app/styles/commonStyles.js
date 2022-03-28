import styled from 'styled-components';

export const PressedButton = styled.button`
  background: ${props => (props.primary ? '#2bb673' : '#655bf5')};
  border-color: ${props => (props.primary ? '#1f8252' : '#3a348f')};
  color: white;
  cursor: pointer;
  border-radius: 3px;
  border-bottom-width: 10px;
  border-bottom-style: solid;
  padding: 0.5rem 1rem;
  position: relative;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 1px;
  display: block;
  text-transform: uppercase;
  &:focus,
  &:active {
    border-bottom: none;
    margin-bottom: 20px;
    top: 10px;
  }
`;

export const PressedButtonGrey = styled(PressedButton)`
  background: #6a6975;
  border-color: #3c3b42;
`;
