import styled from 'styled-components';

export const Container = styled.div`
  .fieldset {
    border-width: 2px;
    background-color: white;
  }
  .highlight-none {
    outline: none;
  }
  .input {
    ::placeholder {
      color: ${props => props.proShop ? 'white' : 'black'};
    }
  }
`;

export const DropdownButtonStyle = styled.div`
  font-family: prompt;
  font-size: 14px;
  .dropdown-menu {
    width: 100%;
  }
  a.dropdown-item {
    opacity: 0.32;
  }
  button {
    text-align: left;
    opacity: 0.32;
  }
  #dropdown-style-button {
    border-radius: 8px 0px 0px 8px;
  }
  #dropdown-color-button {
    border-radius: 0px 8px 8px 0px;
  }
  .dropdown-toggle::after {
    float: right;
    margin-top: 0.5em;
  }
  button.btn-link {
    width: 100%;
    text-align: center;
    font-family: prompt;
    font-weight: 700;
    font-size: 14px;
    color: #00bb75;
    opacity: 0.32;
  }
`;

export const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin: auto 0 auto 0;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.proShop ? '#867eff' : '#d8d8d8'};
  border-radius: 3px;
  background-color: ${props => props.proShop ? '#322c8f' : 'white'};
  ${HiddenCheckbox}:checked + & {
    background-color: ${props => props.proShop ? '#867eff' : '#3a338f'};
    border: none;
  }
  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;
