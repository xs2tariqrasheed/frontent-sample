import styled from 'styled-components';
import mediaQueries from '../../styles/mq';
const mobileBg = 'https://www.blockletegames.com/images/GolfCourseMobileTablet.jpg';
const desktopBg = 'https://www.blockletegames.com/images/GolfCourseDesktop.jpg';

export const Container = styled.header`
  background-image: url(${desktopBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: contain;
  ${mediaQueries.sm} {
    background-image: url(${mobileBg});
  }
  //opacity: 0.74;
  //mix-blend-mode: multiply;
`;
