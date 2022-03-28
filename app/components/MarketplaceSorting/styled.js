import { RiOpenSourceFill } from 'react-icons/ri';
import styled from 'styled-components';

export const DropDownContainer = styled.div`
    cursor: pointer;
    background-color: ${props => props.backgroundColor};
`;
export const DropDownHeader = styled.div`
    cursor: pointer;
    background-color: ${props => props.backgroundColor};
`;

export const DropDownListContainer = styled.div`
    flex-direction: column;
    position: absolute;
    z-index: 100;
    height: 130px;
`;

export const DropDownList = styled.ul`
    padding: 0;
    margin: 0;
    background-color: ${props => props.backgroundColor};
    height: 130px;
`;

export const ListItem = styled.li`
    list-style: none;
`


