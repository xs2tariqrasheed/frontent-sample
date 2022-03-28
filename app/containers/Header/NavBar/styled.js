import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../../styles/theme';
import { HamburgerIcon } from '../../../components/Icons';
const statsBg = 'https://www.blockletegames.com/images/DotBackground.png';

export const GenericLink = styled(Link)`
  font-weight: 900;
  margin-right: 28px;
  font-size: 18px;
  letter-spacing: 1px;
  line-height: 0.6px;
  font-family: proxima-nova;
  color: #322c8f;
  text-decoration: none;

  &:hover {
    color: #0ac47e;
    text-decoration: none;
  }
`;

export const HelpDropdownContent = styled.div`
  display: none;
  width: 386px;
  height: 265px;
  position: absolute;
  right: -140px;
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
  p {
    font-weight: 900;
    color: #322c8f;
    margin-bottom: 10px;
  }
  img {
    width: 118px;
    display: inline-block;
    margin-right: 10px;
  }
`;

export const HelpDropdown = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${HelpDropdownContent} {
    display: block;
  }
`;

export const HelpLink = styled(Link)`
  font-family: proxima-nova;
  font-size: 16px;
  font-weight: 500;
  line-height: 2;
  color: #322c8f;
  display: block;

  &:hover {
    color: #0ac47e;
    text-decoration: none;
  }
`;

export const Hamburger = styled(HamburgerIcon)`
  color: ${theme.color.green};
`;
