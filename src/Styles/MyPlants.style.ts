import styled from "styled-components";

export const StyledMyPlantsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  //TODO colours
  .addType {
    background-color: #70d767;
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    font-size: 1.25rem;
    border: none;
    transition: transform 0.1s ease;
    &:hover {
      cursor: pointer;
      transform: scale(1.05);
      background-color: rgb(112, 239, 101);
      color: white;
    }
  }
  .title {
    font-weight: bold;
    font-size: 2rem;
  }
  //TODO colours
  i {
    color: #70d767;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    transition: transform 0.2s ease;
    &:hover {
      cursor: pointer;
      transform: scale(1.05);
      background-color: white;
      color: rgb(112, 239, 101);
    }
  }
  @media screen and (max-width: 745px) {
    width: 100%;
    div {
      width: 100%;
    }
  }
`;

export const StyledRow = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0.2rem;
  padding: 1rem;
  width: 30rem;
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: auto;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: auto;
  }
  scrollbar-width: thin;
`;

export const StyledPot = styled.button`
  background-color: #f2fdf8; /* very light green */
  border: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
  img {
    width: 64px;
    height: 64px;
    margin-bottom: 10px;
  }
`;
