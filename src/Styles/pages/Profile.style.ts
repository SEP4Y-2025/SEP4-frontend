import styled from "styled-components";

export const InfoBlock = styled.div`
  font-family: "Inter", sans-serif;
  width: 100%;
  margin: 10px 0;
`;

export const Value = styled.div`

  padding: 0.75rem 1rem;
  border-radius: 12px;
  background-color: #f1f1f1;
  border: none;
  box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  font-family: "Inter", sans-serif;
  color: #333;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.15), 0 0 0 2px #c8e6c9;
  }
`;
