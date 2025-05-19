import styled from "styled-components";
import { P } from "vitest/dist/chunks/environment.d.Dmw5ulng";

interface Props {
  $marginTop?: string;
  $fontWeight?: string;
}

export const Label = styled.label<Props>`
  font-family: "Inter", sans-serif;
  align-self: flex-start;
  font-size: 0.9rem;
  color: #333;
  margin-top: ${(p) => p.$marginTop || "10px"};
  font-weight: ${(p) => p.$fontWeight};
`;
