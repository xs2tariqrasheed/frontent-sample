import styled from 'styled-components';
import Img from 'components/Img';

export const ImageContainer = styled.div`
  //position: relative;
`;

export const Avatar = styled(Img)`
  opacity: 1;
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
`;
