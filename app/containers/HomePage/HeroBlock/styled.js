import styled from 'styled-components';
import mq from '../../../styles/mq';
import Img from '../../../components/Img';

export const Wrapper = styled.div`
  @media all and (min-width: 2000px) {
    height: 80vh;
  }
`;

export const ImageContainer = styled(Img)`
  width: 100%;

  ${mq.sm} {
    max-width: 100%;
    margin-right: 0px;
  }
`;

export const VideoContainer = styled.video`
  position: absolute;
  top: 245px;
  right: 0px;
  left: 0px;
  bottom: 10px;
  margin: auto;
  cursor: pointer;
  max-width: 50%;

  ${mq.sm} {
    max-width: 100%;
    margin-top: 20px;
  }
`;
