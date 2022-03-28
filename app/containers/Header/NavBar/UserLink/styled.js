import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.span`
  //margin-right: 15px;
  //display: inline-block;

  //@media all and (max-width: 950px) {
  //  display: none;
  //}
`;

export const LoginButton = styled.div`
  background-color: #6662a9;
  padding: 5px 40px;
  font-family: proxima-nova;
  font-weight: 900;
  font-size: 18px;
  color: #ffffff;
  border-radius: 6px;
  margin: 5px;
  box-shadow: -3px 3px rgba(50, 44, 143, 1);
  border: solid 2px #322c8f;

  &:hover {
    color: #322c8f;
    background-color: #ffffff;
  }
`;

export const WatchLink = styled(Link)`
  font-family: proxima-nova;
  font-size: 16px;
  font-weight: bold;
  color: #322c8f;
  display: inline-block;
  margin-right: 20px;
  text-decoration: none;

  &:hover {
    color: #0ac47e;
    text-decoration: none;
  }
`;
