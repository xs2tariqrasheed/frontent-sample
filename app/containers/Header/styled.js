import styled from 'styled-components';
import theme from '../../styles/theme';
import mq from '../../styles/mq';

export const Container = styled.header`
  user-select: none;
  background: #2bb673;
  height: 96px;
  padding: 0 2rem;
  color: ${theme.color.black};
  width: 100%;
  top: 0;
  position: relative;
  z-index: 50;
  max-width: 1250px;

  ${mq.md} {
    padding: 0 2rem;
  }

  ${mq.sm} {
    height: 6rem;
    padding: 0;
    position: sticky;
  }
`;

export const ItasContentWrapper = styled.div`
  max-width: 2000px;
  margin: 0 auto;
  justify-content: space-between;
  display: flex;
`;

export const MigrationBar = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  font-family: 'Oswald';
  z-index: 1;
  
  &.inProgress {
    background: orange;
  }
  
  &.complete {
    background: green;
  }

  &.failed {
    background: red;
  }
`;

export const Width = styled.div`
  .home {
    max-width: 1250px;
  }
`;
