import React, { useState } from "react";
import { Flex } from "../Styles/common/Flex";
import { Input } from "../Styles/common/Input.style";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { useInvitePlantAssistant } from "../hooks/useInviteAssistant";

const AddAssistant = () => {
  const { environmentID } = useEnvironmentCtx();
  const [email, setEmail] = useState("");
  const [assistants, setAssistants] = useState<string[]>([]);
  const { invite, error, message } = useInvitePlantAssistant();

  const handleInvite = () => {
    if (!email) {
      alert("Please fill in all fields");
      return;
    }

    invite(environmentID, email);

    // Add the email to the assistants list if not already added
    if (!assistants.includes(email)) {
      setAssistants((prev) => [...prev, email]);
    }

    setEmail(""); // clear input after invite
  };

  const handleRemove = (emailToRemove: string) => {
    setAssistants((prev) => prev.filter((email) => email !== emailToRemove));
  };

  return (
    <Flex $dir="column" $justifyC="center" $alignI="center">
      <h2>Add Assistant</h2>
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

      {/* List of invited assistants */}
      <div style={{ marginTop: "1rem", width: "100%", maxWidth: "400px" }}>
        {assistants.length > 0 && <h3>Invited Assistants:</h3>}
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {assistants.map((assistantEmail) => (
            <li
              key={assistantEmail}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "0.5rem",
                backgroundColor: "#f9f9f9",
              }}
            >
              <span>{assistantEmail}</span>
              <button
                onClick={() => handleRemove(assistantEmail)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "red",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                aria-label={`Remove assistant ${assistantEmail}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Flex>
  );
};

export default AddAssistant;
