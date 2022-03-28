import styled from 'styled-components';
import Spinner from 'components/Spinner';
import mq from '../../../styles/mq';

export const Container = styled.div`
  margin-top: -90px;
  margin-bottom: 20px;
  margin-left: 610px;

  ${mq.sm} {
    margin-top: 0px;
    margin-left: 8px;
  }
`;

export const GiftButton = styled.button`
  width: 225px;
  height: 35px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #3b38c6;
  color: white;
  margin-top: 20px;
`;

export const SellButton = styled.button`
  width: 225px;
  height: 35px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #3b38c6;
  color: white;
  margin-top: 20px;
`;

export const SmallSpinner = styled(Spinner)`
  transform-origin: 20px 10px;
  transform: scale(0.6, 0.6);
`;
