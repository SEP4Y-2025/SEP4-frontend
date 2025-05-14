import styled from "styled-components";

interface Props {
  $width?: string;
  $padding?: string;
  $borderR?: string;
  $border?: string;
  $margin?: string;
  $variant?: "primary" | "cancel"; // Add variant prop
}

export const Button = styled.button<Props>`
  background-color: ${(p) =>
    p.$variant === "cancel" ? "#e0e0e0" : "#58cd63"};
  color: ${(p) =>
    p.$variant === "cancel" ? "#333" : "white"};
  font-weight: bold;
  cursor: pointer;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s;
  margin: ${(p) => p.$margin || "0"};
  padding: ${(p) => p.$padding || "10px 20px"};
  border-radius: ${(p) => p.$borderR || "10px"};
  border: ${(p) => p.$border || "none"};

  &:hover {
    background-color: ${(p) =>
    p.$variant === "cancel" ? "#bdbdbd" : "#4bb157"};
  }
`;