import { useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export function useInvitePlantAssistant() {
  const [errorOnInvite, setErrorOnInvite] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [assistants, setAssistants] = useState([]);

  const invite = async (environmentId: string, userMail: string) => {
    setErrorOnInvite("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.put(
        `${BASE_URL}/environments/${environmentId}/assistants`,
        { user_email: userMail }
      );
      setMessage(response.data.message);
      await getAssistants(environmentId);
    } catch (err: any) {
      setErrorOnInvite(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getAssistants = async (environmentId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/environments/${environmentId}/assistants`
      );
      setAssistants(response.data.assistants);
    } catch (err: any) {
      setErrorOnInvite(
        err.response?.data?.error || "Could not fetch assistants"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteAssistant = async (
    environmentId: string,
    assistantId: string
  ) => {
    try {
      await axios.delete(
        `${BASE_URL}/environments/${environmentId}/assistants/${assistantId}`
      );
      await getAssistants(environmentId); // Refresh the list
    } catch (err: any) {
      setErrorOnInvite(
        err.response?.data?.error || "Could not delete assistant"
      );
    }
  };

  return {
    invite,
    getAssistants,
    deleteAssistant,
    errorOnInvite,
    message,
    loading,
    assistants,
  };
}
