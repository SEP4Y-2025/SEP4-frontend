import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  justify-items: center;
`;

export const Card = styled.div`
  background: #f4f4f4;
  border-radius: 12px;
  padding: 1.2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  width: auto;

  &:hover {
    background: #e0e0e0;
    transform: translateY(-4px);
  }

  img {
    width: 48px;
    height: 48px;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0;
    font-weight: 500;
    color: #333;
  }
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  color: #333;
`;