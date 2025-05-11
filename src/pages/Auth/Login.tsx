import React, { useState } from "react";
import styled from "styled-components";
import { Flex } from "../../Styles/Flex";
import { Input } from "../../Styles/Input.style";
import { Button } from "../../Styles/Button.style";
import { ErrorLabel } from "../../Styles/ErrorLabel";
import { Label } from "../../Styles/Label.style";
import { Title } from "../../Styles/Title.style";
import { useAuth } from "../../contexts/UserAuthContext";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await loginUser(email, password);
    } catch (e) {
      setError("Invalid credentials or server error");
    }
  };

  return (
    <Flex $dir="column" $justifyC="center" $alignI="center" $height="100vh">
      <Flex $dir="column" $width="280px">
        <Title>Please login</Title>

        <Label>Email</Label>
        <Input $border="2px solid #ccc"
          $borderR="6px"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <Label>Password</Label>
        <Input $border="2px solid #ccc"
          $borderR="6px"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        {error && <ErrorLabel>{error}</ErrorLabel>}

        <Flex $justifyC="space-between" $alignI="center" $margin="20px 0">
          <Button onClick={()=> navigate("/register")}>Register</Button>
          <Button onClick={handleLogin}>Log in</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
