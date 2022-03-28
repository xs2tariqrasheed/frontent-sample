import styled from 'styled-components';
import GolferImage from '../GolferImage';
import mediaQueries from '../../styles/mq';

export const GolferImageWrapper = styled(GolferImage)`
  //transform: scale(3.7, 3.7);
  min-width: 100px;

  ${mediaQueries.xs} {
    background-image: linear-gradient(
      to left,
      #e7e6ff 64%,
      rgba(231, 230, 255, 0) 36%
    );
  }
`;

export const Oval = styled.div`
  margin-left: 60px;
  border-radius: 50%;
  width: 146px;
  height: 18px;
  opacity: 0.35;
  mix-blend-mode: multiply;
  background-color: #d8d8d8;
  position: absolute;
  bottom: 0;
  left: -65px;
`;
