import styled from "styled-components";

interface Props {}

export const StyledNavBar = styled.nav<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6bd12d;
  padding: 8px 16px;

  img {
    width: 80%;
    object-fit: contain;
    margin-right: 8px;
    &:hover{
      cursor: pointer;
    }
  }

  button {
    border: none;
    background: none;
    padding: 8px;
    margin-right: 0.5rem;
    
    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
   
  }
  //TODO theme FOR BUTTONS
  i {
    color: white;
  }
`;
