import { useState } from "react";
import { invitePlantAssistant } from "../services/assistantApi";

export function useInvitePlantAssistant() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const invite = async (environmentId: string, userMail: string) => {
    setError("");
    setMessage("");

    try {
      const response = await invitePlantAssistant(environmentId, userMail);
      setMessage(response);
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };
  return { invite, error, message };
}
