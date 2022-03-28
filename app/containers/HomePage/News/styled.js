import styled from 'styled-components';
import mq from '../../../styles/mq';
import Img from '../../../components/Img';
const AboutBkg = 'https://www.blockletegames.com/images/AboutBkg.png';

export const Container = styled.div`
  background: url(${AboutBkg}) repeat;
`;

export const ImageContainer = styled(Img)`
  margin-right: 30px;
  margin-left: auto;

  ${mq.sm} {
    margin-right: 0px;
    max-width: 100%;
    margin-top: 20px;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  width: 234px;
  height: 50px;
  object-fit: contain;
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  text-align: center;
  color: #ffffff;
  background-color: #3b38c6;
  border: none;
  border-radius: 4px;
  transition: background-color 1s ease;

  &:hover {
    background-color: #201f4b;
  }

  ${mq.sm} {
    display: block;
    margin-top: 115px;
    margin-bottom: 15px;
  }
`;
