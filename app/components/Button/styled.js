import styled, { css } from 'styled-components';
import theme from '../../styles/theme';

export const ButtonElement = styled.button`
  &:disabled {
    opacity: 0.5;
  }

  ${props =>
    props.isOutline &&
    css`
      background: white;
      color: ${theme.color.primary};
      border: 0.1rem solid ${theme.color.border};
      transition: box-shadow 200ms ease-in-out;
      &:hover {
        box-shadow: 0 1rem 4rem 0 rgba(62, 57, 107, 0.07),
          0 0.2rem 0.9rem 0 rgba(62, 57, 107, 0.06);
      }
    `}

  ${props =>
    props.isMuted &&
    css`
      background: white;
      color: ${theme.color.textMuted};
      border: 0.1rem solid ${theme.color.border};
    `}

  ${props =>
    props.isLink &&
    css`
      border: none;
      background: transparent;
      color: ${theme.color.textLight};
    `} a {
    color: inherit;
    transition: box-shadow 200ms ease-in-out;

    &:hover {
      box-shadow: 0 1rem 4rem 0 rgba(62, 57, 107, 0.07),
        0 0.2rem 0.9rem 0 rgba(62, 57, 107, 0.06);
    }
  }

  ${props =>
    props.isDanger &&
    css`
      background-color: ${theme.color.red};
    `}

  ${props =>
    props.secondary &&
    css`
      background-color: ${theme.color.lightBackground};
      color: ${theme.color.primary};
    `}
`;
