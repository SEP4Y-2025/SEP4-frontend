import styled from "styled-components";

interface Props {
  $justifyC?: string;
  $alignI?: string;
  $gap?: string;
  $height?: string;
  $overflow?: string;
  $dir?: string;
  $width?: string;
  $background?:string;
  $colour?:string;
  $margin?:string;
  height?: string;
  width?: string;
}

export const Flex = styled.div<Props>`
  display: flex;
  background: ${(p) => p.$background || "white"};
  color: ${(p) => p.$colour || "black"};
  justify-content: ${(p) => p.$justifyC || "flex-start"};
  align-items: ${(p) => p.$alignI || "stretch"};
  gap: ${(p) => p.$gap || "0"};
  overflow: ${(p) => p.$overflow || "hidden"};
  flex-direction: ${(p) => p.$dir || "row"};
  margin: ${(p) => p.$margin || ""};
  height: ${(p) => p.$height};
  width: ${(p) => p.$width};
`;


