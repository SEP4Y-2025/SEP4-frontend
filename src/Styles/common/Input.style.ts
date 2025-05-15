import styled from "styled-components";

interface Props {
    $width?: string;
    $padding?: string;
    $borderR?: string;
    $border?: string;
}

export const Input = styled.input<Props>`
width: ${(p) => p.$width || "100%"};
padding: ${(p) => p.$padding || "0.6rem"};
border-radius: ${(p) => p.$borderR || "8px"};
border: ${(p) => p.$border || "1px solid #ccc"};
margin: 0.5rem 0;
`