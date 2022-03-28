import styled from 'styled-components';
import GolferImage from '../GolferImage';

export const GradientWrapper = styled.li`
  font-size: ${props => (props.first ? '20px' : '14px')};
  background-image: ${props =>
    props.isModal && !props.first
      ? 'linear-gradient(to left, #ffffff, rgba(255, 255, 255, 0))'
      : 'linear-gradient(to left, #e7e6ff, rgba(231, 230, 255, 0))'};
  background-color: ${props => (props.first ? '#e7e6ff' : '')};
`;

export const GolferImageWrapper = styled(GolferImage)`
  transform: scale(1.7, 1.7);
`;

export const GolferImageCropped = styled(GolferImage)`
  transform: scale(2.8, 2.8) translate(0, 24px);
  //mask: border-box;
  clip-path: inset(0 0 65% 0);
`;
