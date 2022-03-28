import styled from 'styled-components';
import theme from '../../styles/theme';
import mq from '../../styles/mq';

export const Container = styled.div`
  padding-top: 30px;
  padding-left: 120px;
  padding-right: 120px;

  ${mq.sm} {
    padding-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 10px;
  }
`;

export const TagLine = styled.div`
  font-family: Roboto;
  color: black;
  font-size: 48px;
  line-height: 56px;
  font-weight: ${theme.fontWeight.bold};

  ${mq.sm} {
    max-width: 100%;
    font-size: 32px;
  }
`;

export const ShareFlexView = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: 0 auto;

  ${mq.sm} {
    display: block;
    flex-direction: none;
  }
`;

export const TextBlock = styled.div`
  margin-bottom: 20px;
`;
