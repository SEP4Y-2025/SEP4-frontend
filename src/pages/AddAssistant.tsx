import React, { useState } from "react";
import { Flex } from "../Styles/common/Flex";
import { Input } from "../Styles/common/Input.style";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { useInvitePlantAssistant } from "../hooks/useInviteAssistant";

const AddAssistant = () => {
  const { environmentID } = useEnvironmentCtx();
  const [email, setEmail] = useState("");
  const { invite, remove, assistants, error, message } =
    useInvitePlantAssistant(environmentID);

  const handleInvite = () => {
    if (!email) {
      //toast.error("Please fill in all fields");
      alert("Please fill in all fields");
      return;
    }
    invite(email);
  };
  return (
    <Flex $dir="column" $justifyC="center" $alignI="center">
      AddAssistant
      <Input
        $border="2px solid #ccc"
        $borderR="6px"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <label style={{ color: "red" }}>{error}</label>}
      {message && <label style={{ color: "green" }}>{message}</label>}
      <button onClick={handleInvite}>Invite</button>
      {assistants.length > 0 && (
        <ul>
          {assistants.map((email) => (
            <li key={email}>
              {email}
              <button
                style={{ marginLeft: "10px", color: "red" }}
                onClick={() => remove(email)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </Flex>
  );
};

export default AddAssistant;
