import styled from 'styled-components';
import mq from '../../../styles/mq';

export const Section = styled.div`
  display: block;
  margin-bottom: 50px;
  margin-top: 20px;

  ${mq.sm} {
    padding: 0em 10px;
  }
`;

export const Title = styled.div`
  font-size: 42px;
  color: white;
`;
