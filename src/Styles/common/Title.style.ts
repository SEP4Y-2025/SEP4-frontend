import styled from "styled-components";

interface Props {
  $margin?: string;
}

export const Title = styled.div<Props>`
  font-family: "Inter", sans-serif;
  font-size: clamp(1.5rem, 4vw, 2rem); /* Scales with screen */
  font-weight: 700;
  color: #333;
  margin: ${(p: Props) => p.$margin || "0"};

  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 4vw, 1.5rem);
    display: flex;
    justify-content: center;
  }
`;
