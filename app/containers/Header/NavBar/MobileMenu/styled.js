import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../../../styles/theme';
import mq from '../../../../styles/mq';
const statsBg = 'https://www.blockletegames.com/images/DotBackground.png';

export const Header = styled.div`
  text-align: center;
  margin-top: 15px;
  margin-bottom: 20px;
  font-size: ${theme.fontSize.regular};
  font-family: Roboto;
`;
// color: ${theme.color.white};

export const GenericLink = styled(Link)`
  font-family: proxima-nova;
  font-size: 36px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.89;
  letter-spacing: normal;
  color: #fff;
  display: block;
`;

export const UserName = styled(Link)`
  font-family: proxima-nova;
  font-size: 24px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.83;
  letter-spacing: normal;
  color: #fff;
  display: block;
`;

export const UserNameContainer = styled.div`
  text-align: center;
  padding: 10px 0 30px 0;
  border-bottom: solid 1px #979797;
`;

export const MobileNav = styled.div`
  margin: 0px 24px;
`;

export const LoginWrapper = styled.div`
  margin: 0 24px;

  p {
    opacity: 0.64;
    font-family: Prompt;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    color: #f8f7ff;
    margin-bottom: 24px;
  }
`;

export const LogOut = styled.div`
  border: solid 1.5px ${theme.color.white};
  border-radius: 28px;
  cursor: pointer;
  font-family: Prompt;
  background: transparent;
  font-size: 14px;
  line-height: 1.14;
  padding: 16px 24px;
  color: ${theme.color.white};
  text-decoration: none;
  width: 100%;
  text-align: center;

  ${mq.sm} {
    margin-right: 0px;
    margin-left: 0px;
    margin-bottom: 60px;
  }
`;

export const Wrapper = styled.div`
  margin-top: 32px;
`;

export const LoginButton = styled.div`
  background-color: #322c8f;
  padding: 5px 40px;
  font-family: proxima-nova;
  font-weight: 900;
  font-size: 18px;
  color: #0ac47e;
  border-radius: 6px;
  margin: 8px;
  letter-spacing: 0.6px;
  border: solid 2px #0ac47e;

  &:hover,
  &:active {
    color: #322c8f;
    background-color: #0ac47e;
  }
`;

export const LogButton = styled.button`
  border: solid 1.5px ${theme.color.white};
  border-radius: 28px;
  cursor: pointer;
  font-family: Prompt;
  background: transparent;
  font-size: 14px;
  line-height: 1.14;
  padding: 16px 24px;
  color: ${theme.color.white};
  text-decoration: none;
  width: 100%;

  :hover {
    color: #9fffcf;
    text-decoration: underline;
  }

  ${mq.sm} {
    margin-right: 0px;
    margin-left: 0px;
    margin-bottom: 60px;
  }
`;

export const MedalsContainer = styled.div`
  background-color: #313131;
  border-radius: 5px;
  margin: 4px 120px 4px 120px;
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

export const HelpDropdownContent = styled.div`
  display: none;
  width: 110%;
  height: 265px;
  position: relative;
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
  ${props =>
    props.isOpen &&
    css`
      display: block;
    `}
`;

export const HelpDropdown = styled.div`
  position: relative;
  display: inline-block;
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
