import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background: white;
`;

export const Header = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #72e17c;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoText = styled.div`
  font-weight: bold;
  color: #2f493f;
  font-size: 1.3rem;
  margin-left: 0.5rem;
`;

export const Main = styled.div`
  margin-top: 100px;
  text-align: center;

  img {
    margin-left: 60px;
  }

  p {
    margin-bottom: 15px;
  }
`;

export const Button = styled.button`
  background-color: #72e17c;
  color: white;
  font-weight: bold;
  padding: 0.75rem 3rem;
  margin: 0.8rem 0;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #5ed167;
  }
`;
