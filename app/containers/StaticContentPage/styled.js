import styled from 'styled-components';
import mq from '../../styles/mq';

export const ItasContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Wrapper = styled.div`
  padding: 4em 3em;
  margin: 0 auto;
  max-width: 1200px;
  margin: 0 auto;

  ${mq.sm} {
    padding: 4em 1em;
  }
`;

export const Topic = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.15;
  letter-spacing: normal;
  color: #2bab6e;
`;

export const Details = styled.div`
  object-fit: contain;
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.15;
  letter-spacing: normal;
  color: #363740;
`;
