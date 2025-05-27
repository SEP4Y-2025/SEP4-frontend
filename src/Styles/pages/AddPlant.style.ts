import styled from "styled-components";

export const StyledAddPlantModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;

    @media (max-width: 768px) {
    padding: 20px;
    align-items: flex-start;
  }
`;

export const Label = styled.label`
  color:rgb(44, 157, 50);
  font-weight: 500;
  font-weight: 600;
  margin-top: 1rem;
  display: block;
  font-size: 1.2rem;
`;

export const StyledModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;

    @media (max-width: 480px) {
    max-width: 95%;
  }

  @media (min-height: 2000px) {
    padding-bottom: 3rem;
  }
`;
export const FormTitle = styled.h2`
  font-weight: bold;
  color: #333;
  margin-left: 0.25rem;
  margin-top: 0.25rem;
  font-size: 1.4rem;
`;

export const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 40px;
  background-color:rgb(255, 255, 255);

   img {
    flex-shrink: 0;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
    img {
      width: 30px;
      height: 30px;
    }
  }
`;

export const StyledModalBody = styled.div`
  padding: 20px;

    @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const StyledInputGroup = styled.div`
  margin-bottom: 20px;

  .input {
    font-family: "Inter", sans-serif;
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 17px;
    box-sizing: border-box;
  }

  .type-display {
    padding: 12px;
    background-color: #f5f5f5;
    border-radius: 8px;
    font-size: 16px;
    color: #757575;
  }
`;

export const StyledErrorMessage = styled.div`
  color: #d32f2f;
  margin-bottom: 15px;
  font-size: 14px;
`;

export const StyledModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;

    @media (max-width: 480px) {
    flex-direction: column;

    button {
      width: 100%;
    }

    button:not(:last-child) {
      margin-bottom: 8px; /* space between stacked buttons */
    }
  }
`;

export const StyledButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex-grow: 1;
  text-align: center;

  &.cancel-button {
    background-color: #e8f5e9;
    border: none;
    color: #2e7d32;
    margin-right: 10px;

    &:hover {
      background-color: #c8e6c9;
    }
  }

  &.save-button {
    background-color: #66bb6a;
    border: none;
    color: white;

    &:hover {
      background-color: #4caf50;
    }
  }
`;

/** 
@media (max-width: 600px) {
  ${StyledModalContent} {
    width: 95%;
  }
}
*/
