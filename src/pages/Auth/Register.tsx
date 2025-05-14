import React, { useState } from "react";
import { Flex } from "../../Styles/common/Flex";
import { Input } from "../../Styles/common/Input.style";
import { Button } from "../../Styles/common/Button.style";
import { ErrorLabel } from "../../Styles/common/ErrorLabel";
import { Label } from "../../Styles/common/Label.style";
import { Title } from "../../Styles/common/Title.style"
import { useAuth } from "../../contexts/UserAuthContext";
import { useNavigate } from "react-router-dom";


const Register: React.FC = () => {
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!userName || !email || !repeatEmail || !password || !repeatPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (email !== repeatEmail) {
      setError("Emails do not match");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser(email, userName, password);
    } catch (e) {
      setError("Invalid credentials or server error");
    }
  }


  return (
    <Flex $dir="column" $justifyC="center" $alignI="center" $height="100vh">
      <Flex $dir="column" $width="280px">
        <Title>Register</Title>

        <Label>Username</Label>
        <Input $border="2px solid #ccc"
          $borderR="6px"
          type="texr"
          placeholder="Enter username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)} />

        <Label>Email</Label>
        <Input $border="2px solid #ccc"
          $borderR="6px"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <Label>Repeat Email</Label>
        <Input $border="2px solid #ccc"
          $borderR="6px"
          type="email"
          placeholder="Repeat email"
          value={repeatEmail}
          onChange={(e) => setRepeatEmail(e.target.value)} />

        <Label>Password</Label>
        <Input $border="2px solid #ccc"
          $borderR="6px"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        <Label>Repeat Password</Label>
        <Input $border="2px solid #ccc"
          $borderR="6px"
          type="password"
          placeholder="Repeat password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)} />

        {error && <ErrorLabel>{error}</ErrorLabel>}

        <Flex $justifyC="space-between" $alignI="center" $margin="20px 0">
          <Button onClick={() => navigate("/login")}>Back to Login</Button>
          <Button onClick={handleRegister}>Register</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Register;
