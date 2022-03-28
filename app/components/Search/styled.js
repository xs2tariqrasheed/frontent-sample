import styled from 'styled-components';

export const Input = styled.input`
    &::-webkit-input-placeholder {
        color: #0c066a;
    }
    &::-moz-input-placeholder {
        color: #0c066a;
        font-weight: bold;
    }
`
export const SearchContainer = styled.div`
    padding: .5rem;
    position: relative;
    display: flex;  
    align-items: center;
    margin: 0 auto 0 auto;
    width: 90%;
`