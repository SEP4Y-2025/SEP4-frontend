import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  justify-items: space-between;
  background:rgb(249, 249, 249);
  padding: 2rem 1rem;
  border-radius: 18px;
`;

export const Card = styled.div`
  background: #58cd63;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  max-width: 20rem;
  align-self: center;
  direction: ltr;

  font-size: 1.15rem;
  font-weight: 600;
  color:rgb(238, 251, 237);
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(41, 248, 62, 0.08);

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
    font-family: "Inter", sans-serif;
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
