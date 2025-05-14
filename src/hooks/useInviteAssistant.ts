import { useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export function useInvitePlantAssistant() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const invite = async (environmentId: string, userMail: string) => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.put(
        `${BASE_URL}/environments/${environmentId}/assistants`,
        {
          user_email: userMail,
        }
      );
      setMessage(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { invite, error, message, loading };
}