import styled from 'styled-components';
import theme from '../../../styles/theme';
import mq from '../../../styles/mq';

export const Container = styled.div`

  .card {
    border-right-style: none;
    border-left-style: none;
    border-bottom-style: none;
    background-color: ${props => props.backgroundColor};
    padding: 10px 0;
  }

  .accordion {
    ${mq.xs} {
      &:nth-child(1) {
        border-top: 2px solid #d8d8d8;
      }
    }
  }

  .toggle {
    // background-color: white;
    font-weight: 900;
    color: black;
  }

  .header {
    background-color: ${props => props.backgroundColor};
    -webkit-box-shadow: none;
	  -moz-box-shadow: none;
	  box-shadow: none;
    border-bottom-style: none;
    padding-left: 0;
  }

  margin-right: 0;

`;

export const FilterTitle = styled.div`
  // color: white;
  margin-top: 10px;
  margin-left: 10px;
  font-size: ${theme.fontSize.regular};
`;

export const FilterLabel = styled.div`
  // color: ${theme.color.textMuted};
  margin-top: 25px;
  margin-left: 10px;
  font-size: 18px;
`;

export const CheckboxWrapper = styled.div`
  margin-left: 20px;
`;

export const FilterTab = styled.div`
  border-radius: 30px;
  border: 2px solid ${props => props.outline};
  padding: 5px;
`

export const ClearAll = styled.button`
    font-weight: bold;
    ${mq.xs} {
      min-width: 300px;
    }
`;
