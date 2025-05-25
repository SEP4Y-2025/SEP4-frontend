import styled from "styled-components";

export const AssistantWrapper = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-height: 3200px) and (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
`;
