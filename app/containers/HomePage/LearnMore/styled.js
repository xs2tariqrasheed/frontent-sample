import styled from 'styled-components';
const clouds = 'https://www.blockletegames.com/images/clouds-repeatable.png';
const flag = 'https://www.blockletegames.com/images/flag.png';

export const Container = styled.div`
  background-image: url(${clouds});
  background-repeat: repeat-x;
  background-position: 0 1.5rem;
  background-color: #2bb673;
  border-bottom: 87px solid #37e893;
  position: relative;
  &:after {
    content: '';
    display: block;
    background-image: url(${flag});
    background-size: contain;
    width: 81px;
    height: 146px;
    position: absolute;
    bottom: -25px;
    right: 20%;
    @media all and (max-width: 640px) {
      right: 0;
    }
    @media all and (max-width: 375px) {
      display: none;
    }
  }
`;

export const GolfBallSection = styled.section`
  padding-left: 5rem;
  position: relative;
  &:after {
    content: '';
    display: block;
    background-image: url(${props => props.bg});
    background-size: contain;
    background-repeat: no-repeat;
    object-fit: contain;
    width: 56px;
    height: 57px;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
