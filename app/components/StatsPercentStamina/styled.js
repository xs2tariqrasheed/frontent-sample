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
  border-radius: 4px;
  background-color: #00bb75;
`;

export const PotentialSkill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: ${props => props.width}%;
  height: 4px;
  opacity: 0.24;
  border-radius: 4px;
  background-color: #00bb75;
`;

export const TotalLine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  height: 4px;
  width: ${props => props.width}%;
  width: 100%;
  opacity: 0.64;
  border-radius: 4px;
  background-color: #615e7b;
`;
