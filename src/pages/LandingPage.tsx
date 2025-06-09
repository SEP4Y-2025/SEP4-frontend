import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/leaf3.png";

import {
  Wrapper,
  Header,
  LogoWrapper,
  LogoText,
  Main,
  Button,
} from "../Styles/pages/LandingPage.style";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Main>
        <img src={logo} alt="Logo" width={300} />

        <p>Already a user?</p>
        <Button onClick={() => navigate("/login")}>Log in</Button>

        <p>Don't have an account?</p>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </Main>
    </Wrapper>
  );
};

export default LandingPage;
