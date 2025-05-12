import styled from "styled-components";

export const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 18px;
    &::-webkit-scrollbar {
    height: 8px;
  }

  .value{
    font-weight: bold;}
  &::-webkit-scrollbar-thumb {
    background-color: auto;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: auto;
  }
  scrollbar-width: thin;
`;

export const StyledLabel= styled.span`
    color: #333;
    font-weight: normal;
  
    `;

export const Page= styled.span`
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;


    .h1{
    color: #333;
    font-size: 40px;
    margin-bottom: 30px;
    }

    `;

