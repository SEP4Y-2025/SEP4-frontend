import styled from "styled-components";

interface Props{
    $width?:string;
    $padding?:string;
    $borderR?:string;
    $border?:string;
}

export const Input = styled.input<Props>`
width: ${(p) => p.$width || ""};
padding: ${(p) => p.$padding || ""};
border-radius: ${(p) => p.$borderR || ""};
border: ${(p) => p.$border || ""};
`