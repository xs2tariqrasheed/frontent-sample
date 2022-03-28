import styled from 'styled-components';
import Img from 'components/Img';
import mediaQueries from '../../styles/mq';

export const Avatar = styled(Img)`
  opacity: 1;
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  
  ${mediaQueries.md} {
    clip: rect(0,145px,60px,65px);
  }
`;

export const GolferImg = styled.div`
  height: 70px;
  width: 70px;
  position: absolute;
  border-radius: 35px;
  // border: 3px solid #d0d0ca;

  &.si-1 {
    > div {
      left: -77px;
    }
  }

  &.si-2 {
    > div {
      left: -62px;
    }
  }
  
  > div {
    width: 200px;
    height: 200px;
    position: relative;
    top: -10px;
  }
`;