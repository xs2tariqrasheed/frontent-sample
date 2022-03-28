import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../../../../styles/theme';

export const NavbarDropdownContent = styled.div`
  display: none;
  position: absolute;
  right: 20px;
  background-color: ${theme.color.lightBackground};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0, 2);
  padding: 12px 16px;
  z-index: 1;
`;

export const NavbarDropdown = styled.div`
  position: relative;
  display: inline-block;
  // display: none;

  &:hover ${NavbarDropdownContent} {
    display: block;
  }
`;

export const GenericLink = styled.span`
  margin-right: 15px;
  font-family: Oswald;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 1px;
  color: #ffffff;
  text-decoration: none;

  :hover {
    color: ${theme.color.tin};
    text-decoration: underline;
  }
`;

export const LogOut = styled.div`
  cursor: pointer;
  font-family: Oswald;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 1px;
  color: ${theme.color.tin};
`;

export const MyGolfLink = styled(Link)`
  font-family: Oswald;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 1px;
  text-decoration: none;
  color: black;
`;

export const GenericMenuItem = styled.div`
  font-family: Roboto;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;
