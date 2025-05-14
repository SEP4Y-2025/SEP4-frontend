import styled from "styled-components";

interface Props {
  $margin?: string;
}

export const Title = styled.h1<Props>`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: ${(p: Props) => p.$margin || "0"};
`;