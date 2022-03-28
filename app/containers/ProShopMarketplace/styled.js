import styled from 'styled-components';
import { Link } from 'react-router-dom';
import mq from '../../styles/mq';
const wreath = 'https://www.blockletegames.com/images/wreath-half%402x.png';
const bg = 'https://www.blockletegames.com/images/Marketplace.png';

export const MarketplaceContainer = styled.section`
  position: relative;

  .container {
    max-width: 100%;
  }

  .dropdown-toggle {
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    // padding: .375rem .75rem;
    padding: 0;
    font-size: 1rem;
    border-radius: .25rem;
    transition: color .15s
  }

  .dropdown-menu.show {
    display: block;
  }

  .dropdown-menu {
    position: fixed;
    z-index: 1000;
    display: none;
    text-align: left;
    border: 1px solid rgba(0,0,0,.15);
    left: 0;
    top: auto;
    bottom: -1px;
    width: 100%;
    background: none;
    padding: 0;
  }

  .dropdown-item {
    background-color: #fff;
    padding: .75rem;
    text-decoration: none;
    border-bottom: 1px solid #d0d0d0;

    &:last-child {
      border: 0;
    }
  }

  .menu-bg {
    background-color: rgba(0,0,0,.5);
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: -1;
  }

  .filters {
    .active {
      background-color: #3a338f;
      color: #fff;
    }
  }
  
  input {
    + label {
      color: #878787;
    }
    &:checked + label {
      color: #3a338f;
      font-weight: bold;
    }
  }
`;

export const Wrapper = styled.div`
  width: 100vw;
  position: relative;
  left: calc(-50vw + 50%);
  overflow: visible;

  .inner-container {
    max-width: 1312px;
    padding-left: 20px;
    padding-right: 20px;
  }
`
export const InnerWrapper = styled.div`
  background-color: #0c066a;
`

export const Header = styled.div`
  background-color: #322c8f;
  width: 100vw;
  position: relative;
  left: calc(-50vw + 50%);
  overflow: visible;

  .inner-container {
    max-width: 1312px;
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const SidebarWrapper = styled.div`
  ${mq.xs} {
    display: hidden;
  }
`;

export const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 341px;
  background-image: linear-gradient(to top, rgba(43, 182, 115, 0), #2bb673);
  z-index: 0;
`;

export const SignUpAccounce = styled.div`
  min-height: 50px;
  padding: 15px 0;
  background-color: #4f47c2;
`;

export const MsgWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: block;
  text-align: center;
`;

export const NoGolferMessage = styled.div`
  margin-top: 60px;
  color: white;
  font-family: Roboto;
  font-size: 24px;
  font-weight: 500;
`;

export const AnnounceText = styled.div`
  text-align: center;
  margin: 0 auto;
  color: white;
`;

export const FilterTxt = styled.div`
  font-family: Prompt;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #02001a;
  button#filter-button {
    background-color: #fff;
    transition: border-color 0.2s linear;
    border: 1px solid #02001a;
    border-radius: 8px;
    font-size: 16px;
    font-family: Oswald;
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    cursor: pointer;
    color: #02001a;
    text-align: center;
    padding 12px 24px;
    &:hover,
    &.active {
      background-color: #362f74;
      color: #efeefe;
    }
  }
`;

export const MobileFilter = styled.div`
  width: 56px;
  height: 56px;
  padding: 16px;
  box-shadow: 0 4px 24px 0 rgba(2, 0, 26, 0.16);
  background-color: #3a338f;
  border-radius: 50%;
  z-index: 40;
  position: fixed;
  right: 40px;
  bottom: 0px;
`;

export const GolferCount = styled.div`
  top: 10px;
  left: 3rem;
  ${mq.md} {
    top: 10px;
    left: auto;
  }
  ${mq.sm} {
    margin-bottom: 1rem;
  }
  ${mq.lg} {
    top: 10px;
    left: 0;
  }
  &:after,
  &:before {
    position: absolute;
    top: 10px;
    right: -20px;
    background: url(${wreath}) no-repeat;
    background-size: 20px;
    content: '';
    height: 41px;
    width: 21px;
    object-fit: contain;
    display: block;
    ${mq.sm} {
      top: 37%;
    }
  }
  &:after {
    left: -20px;
    right: auto;
    transform: scaleX(-1);
  }
`;

export const ViewTxt = styled(Link)`
  transition: border-color 0.2s linear;
  border: 1px solid #02001a;
  border-radius: 8px;
  font-size: 16px;
  font-family: Oswald;
  letter-spacing: 1px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  color: #02001a;
  text-align: center;
  padding 12px 24px;
  &:hover,
  &.active {
    background-color: #362f74;
    color: #efeefe;
  }
  ${mq.sm} {
    font-size: 12px;
    padding-bottom: 1rem;
    min-width: auto;
    font-height: 1.33;
    letter-spacing: 0.8px;
    width: 50%;
  }
`;

export const HeaderTwo = styled.div`
  font-family: Roboto;
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
`;

export const CloseLink = styled.a`
  cursor: pointer;
  color: #3b38c6;
  line-height: 50px;
  font-size: 24px;
  font-family: Roboto;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
  &:hover {
    color: black;
  }
`;

export const ListGroup = styled.div`
  color: red;
  h3 {
    font-family: Oswald;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const AccordianStyle = styled.div`
  .card-header {
    font-family: oswald;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    background-color: #ffffff;
    padding: 0.75rem 0rem;
  }
  .card {
    border: none;
  }
  .card-header::after {
    display: inline-block;
    margin-left: 0.255em;
    margin-top: 0.5em;
    vertical-align: 0.255em;
    content: '';
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
    float: right;
  }
  .form-group {
    font-family: prompt;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    opacity: 0.64;
  }
  .form-check-input {
    margin-top: 0.1rem;
  }
`;

export const MarketplaceHeader = styled.div`
  background-image: url(${bg});
`;

export const CardTypeToggle = styled.button`
  width: 100px;

`