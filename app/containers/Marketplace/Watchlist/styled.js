import styled from 'styled-components';
import theme from '../../../styles/theme';
import mq from '../../../styles/mq';

export const Background = styled.div`
    background-color: rgba(238, 238, 238, 0.57);
    padding: 16px;
    height: auto;
    padding-bottom: 100px;
    ${mq.sm} {
    padding-left: 16px;
    padding-top: 16px;
    width: 100%;
  }
`;
export const Header = styled.h1`
  color: #3a338f;
`;
