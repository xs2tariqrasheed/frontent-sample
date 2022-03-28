import styled from 'styled-components';
import mq from '../../styles/mq';

export const FooterStyles = styled.div`
  .not-home {
    background-color: #322c8f;
  }
  .home {
    max-width: 1250px;
    background-color: #322c8f;
  }
`;

export const FooterWrapper = styled.footer`
  position: relative;

  img {
    max-width: 50px;
  }
`;

export const Container = styled.header`
  padding: 20px 20px;
  width: 100%;
  bottom: 0;
  z-index: 2;

  max-width: 1200px;
  margin: 0 auto;
`;

export const FlexContainer = styled.header`
  display: flex;
  padding: 5px 120px;
  justify-content: space-between;
  width: 100%;
  z-index: 2;

  ${mq.sm} {
    padding: 5px 10px;
  }
`;

export const Version = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: normal;
  text-align: right;
  color: #333333;
`;
