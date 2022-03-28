import styled from 'styled-components';

export const SkillsWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const CurrentSkill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: ${props => props.width}%;
  height: 4px;
  background-color: #ffc530;
`;

export const PotentialSkill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: ${props => props.width}%;
  height: 4px;
  background-color: #655bf5;
`;

export const TotalLine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  height: 4px;
  width: ${props => props.width}%;
  width: 100%;
  background-color: #d8d6fc;
`;
