import React, { useState } from "react";
import { Flex } from "../Styles/Flex";
import { Input } from "../Styles/Input.style";
import { invitePlantAssistant } from "../services/assistantApi";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { useInvitePlantAssistant } from "../hooks/useInviteAssistant";

const AddAssistant = () => {
    const{environmentID} = useEnvironmentCtx();
    const [email, setEmail] = useState("");
    const {invite, error, message} = useInvitePlantAssistant();

    const handleInvite = () =>{
        
        if (!email) {
      //toast.error("Please fill in all fields");
       alert("Please fill in all fields");
      return;
    }
    invite(environmentID, email);
    }
  return (
    <Flex $dir="column" $justifyC="center" $alignI="center">
      AddAssistant
      <Input $border="2px solid #ccc"
          $borderR="6px"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
          {error && <label>{error}</label>}
          {message && <label>{message}</label>}
          <button onClick={handleInvite}>Invite</button>

    </Flex>
  );
};

export default AddAssistant;
