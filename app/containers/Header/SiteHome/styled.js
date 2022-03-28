import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../../styles/theme';

export const Label = styled(Link)`
  font-size: ${theme.fontSize.larger};
  color: ${theme.color.white};
  text-decoration: none;

  :hover {
    cursor: pointer;
    color: ${theme.color.tin};
  }
`;

export const HomeLogo = styled.div`
  margin-top: 12px;
`;
