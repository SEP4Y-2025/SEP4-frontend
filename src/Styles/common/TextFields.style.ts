import styled from "styled-components";

export const TextFields = styled.div`
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;

  input {
    width: 100%;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;
