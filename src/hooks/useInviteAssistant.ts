import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export function useInvitePlantAssistant(environmentId: string) {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [assistants, setAssistants] = useState<string[]>([]); // Assume only emails

  const fetchAssistants = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/environments/${environmentId}/assistants`
      );
      setAssistants(response.data.assistants);
    } catch (err: any) {
      setError("Failed to fetch assistants");
    }
  };

  const invite = async (userMail: string) => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/environments/${environmentId}/assistants`,
        { user_email: userMail }
      );
      setMessage(response.data.message);
      fetchAssistants(); // Refresh list after invite
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (userMail: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${userMail}?`
    );
    if (!confirmed) return;

    setError("");
    setLoading(true);
    try {
      await axios.delete(
        `${BASE_URL}/environments/${environmentId}/assistants/${userMail}`
      );
      setMessage(`${userMail} was removed`);
      fetchAssistants();
    } catch (err: any) {
      setError("Failed to remove assistant");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (environmentId) fetchAssistants();
  }, [environmentId]);

  return { invite, remove, assistants, error, message, loading };
}
