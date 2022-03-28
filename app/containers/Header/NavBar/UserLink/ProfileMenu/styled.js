import styled from 'styled-components';
import { Link } from 'react-router-dom';
const statsBg = 'https://www.blockletegames.com/images/DotBackground.png';

export const NavbarDropdownContent = styled.div`
  display: none;
  width: 200px;
  position: absolute;
  right: 20px;
  border-radius: 6px;
  border: solid 3px #322c8f;
  box-shadow: 0px 5px rgba(50, 44, 143, 1);
  padding: 25px;
  z-index: 1;
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 1%,
      #ffffff 56%
    ),
    url(${statsBg});
  background-size: 1000px;
`;

export const NavbarDropdown = styled.div`
  position: relative;
  display: inline-block;
  // display: none;

  &:hover ${NavbarDropdownContent} {
    display: block;
  }
`;

export const MedalsContainer = styled.div`
  background-color: #313131;
  border-radius: 5px;
  margin: 4px 30px 4px 0;
  p {
    color: #ffffff;
    font-family: Industry;
    font-size: 14px;
    font-style: italic;
    padding: 2px;
    margin: 0;
    display: inline-block;
  }
`;

export const GenericLink = styled.span`
  margin-right: 20px;
  font-family: Proxima-nova;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  color: #322c8f;
  cursor: pointer;

  :hover {
    color: #0ac47e;
    text-decoration: none;
  }
`;

export const LogOut = styled.div`
  font-family: Proxima-nova;
  text-decoration: none;
  color: #322c8f;
  font-size: 16px;
  font-weight: bold;
  line-height: 2;
  cursor: pointer;
  display: block;

  :hover {
    color: #0ac47e;
    text-decoration: none;
  }
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

export const GenericMenuItem = styled(Link)`
  font-family: Proxima-nova;
  text-decoration: none;
  color: #322c8f;
  font-size: 16px;
  font-weight: bold;
  line-height: 2;
  cursor: pointer;
  display: block;

  :hover {
    color: #0ac47e;
    text-decoration: none;
  }
`;
