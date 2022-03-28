import styled, { css } from 'styled-components';

export const MainContainer = styled.div`
  ${props => props.expandedView && css``}
`;

export const StatsColor = styled.span`
  margin: 0 2px 0 0;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: right;
  color: #ffffff;
`;

export const Stats = styled.p`
  color: #ffffff;
  display: block;
  margin: 5px 0 0 2px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: right;
  float: right;
`;

export const LabelWrapper = styled.div`
  display: block;
`;

export const Label = styled.p`
  height: 16px;
  margin: 0 0 13px 0;
  font-family: Oswald;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 1px;
  color: #ffffff;
  text-transform: uppercase;
  display: inline-block;
`;

export const StatsBarWrapper = styled.div`
  position: relative;
  background: red;
  margin-bottom: ${props => (props.expandedView ? '2rem' : '15px')};
`;
