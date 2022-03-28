import styled, { css } from 'styled-components';
import mq from '../../styles/mq';
import theme from '../../styles/theme';

export const Panel = styled.div`
  background: #322c8f;
  width: ${props => (props.isLarge ? '100%' : '100%')};
  max-width: 100vw;
  position: fixed;
  overflow: auto;
  top: 0;
  bottom: 0;
  color: ${theme.color.text};
  z-index: 50;
  outline: none;

  ${props =>
    props.isRight &&
    css`
      left: ${props.isOpen ? '0' : '-56rem'};
    `}
  ${props =>
    !props.isRight &&
    css`
      right: ${props.isOpen ? '0' : '-200rem'};
    `}

  transition: all 0.3s;

  ${mq.xs} {
    ${props =>
      props.isLarge && // eslint-disable-line
      css`
        width: 100%;
      `};
  }
`;
