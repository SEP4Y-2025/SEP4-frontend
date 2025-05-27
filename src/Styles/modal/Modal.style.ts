import styled from "styled-components";


export const Modal = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 1.5rem;
    width: 95%;
  }

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;
