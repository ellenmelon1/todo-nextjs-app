import styled from 'styled-components';
import { todoCardStyle } from "./cssStyles";

// https://www.schemecolor.com/beautiful-light-colors.php

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background: #fff;
    font-size: calc(10px + 2vmin);
    color: #000;
    margin: 0 auto;
    max-width: 70vw;
    width: 100%;
`;

export const BackgroundContainer = styled.div`
    background:  #FFFCF1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const TodoCardContainer = styled.div`
    ${todoCardStyle}
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;`

export const InputContainer = styled.div`
padding: 0px;
margin: 0px;
`


