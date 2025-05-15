import styled from "styled-components";


export const StyledAddPlantModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const StyledModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f1f8e9;
  border-bottom: 1px solid #e0e0e0;

  span {
    font-size: 24px;
    margin-right: 10px;
  }

  h2 {
    margin: 0;
    color: #333;
    font-weight: 500;
  }
`;

export const StyledModalBody = styled.div`
  padding: 20px;
`;

export const StyledInputGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #66bb6a;
  }

  .input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
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