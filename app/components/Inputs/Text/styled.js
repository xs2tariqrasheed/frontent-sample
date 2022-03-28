import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';

export const Container = styled.div`
  ${props =>
    props.isNotStyled
      ? css`
          margin-bottom: 0;
          width: 100%;
        `
      : css`
          margin-bottom: 1.2rem;
        `};
`;

export const InputWrapper = styled.div`
  position: relative;
  border: solid 2px #dedfe0;
  border-radius: 4px;
  box-shadow: 0px 3px rgba(222, 223, 224, 0.3);
  margin-bottom: 34px;
`;

export const Label = styled.label`
  text-align: ${props => (props.isCentered ? 'center' : 'left')};
  border-left: 4px solid #09c47d;

  ${props =>
    props.isSmall &&
    css`
      font-size: ${theme.fontSize.small};
      font-weight: ${theme.fontWeight.semiBold};
      color: ${theme.color.textMuted};
    `};
`;

export const ErrorMessage = styled.div`
  color: ${theme.color.red};
  font-size: ${theme.fontSize.small};
  margin-top: 0.5rem;
  text-align: right;
  text-transform: uppercase;
`;

export const FormInput = styled.input`
  width: 100%;
  height: 35px;
  font-size: 16px;
  border-radius: 2px;
  background: #eaecee;
  font-family: Roboto;
  border: 0.1rem solid
    ${props => (props.hasError ? theme.color.red : theme.color.border)};
`;
