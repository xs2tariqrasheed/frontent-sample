import styled from 'styled-components';
import Img from 'components/Img';
import mq from '../../styles/mq';

export const ImageContainer = styled(Img)`
  margin-right: 40px;
  margin-left: 40px;
  width: 145px;
  height: 222px;
  object-fit: contain;

  ${mq.sm} {
    display: block;
    width: 100%;
    margin-right: 0;
    margin-left: 0;
  }
`;
