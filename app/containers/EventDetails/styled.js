import styled from 'styled-components';
import mediaQueries from '../../styles/mq';

export const TableCellLabel = styled.td`
  text-transform: uppercase;
  color: #3a348f;
  letter-spacing: 1px;
  font-weight: 900;
  padding: 0.25rem 1rem 0.25rem 0;
  font-size: 14px;
`;

export const TableCellValue = styled.td`
  font-size: 14px;
`;

export const TableRow = styled.tr`
  margin-bottom: 2rem;
`;

export const GradientWrapper = styled.div`
  width: 75%;
  padding: 1rem;
  display: flex;
  background-image: linear-gradient(to left, #e7e6ff, rgba(231, 230, 255, 0));
  ${mediaQueries.xs} {
    justify-content: start;
  }
  ${mediaQueries.sm} {
    width: 100%;
    padding: 0;
    background: white;
  }
`;
