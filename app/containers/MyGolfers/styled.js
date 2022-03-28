import styled from 'styled-components';
import theme from '../../styles/theme';
import mq from '../../styles/mq';

export const ItasContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 64px;
`;

export const HeaderFiller = styled.div`
  height: 70px;
  background-color: ${theme.color.primary};
`;

export const Title = styled.div`
  padding: 0px 100px;
  height: 48px;
  object-fit: contain;
  font-family: Roboto;
  font-size: 48px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -1.04px;
  color: #000000;
  margin-bottom: 44px;

  ${mq.sm} {
    padding: 0em 15px;
  }
`;

export const SubText = styled.div`
  padding: 0px 100px;
  font-family: Roboto;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #1e1e1e;
  margin-bottom: 44px;

  ${mq.sm} {
    padding: 0em 15px;
  }
`;

export const CardTypeToggle = styled.button`
  // width: 100px;

`