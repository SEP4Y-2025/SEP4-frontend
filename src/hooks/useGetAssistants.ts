import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const useGetAssistants = (environmentId: string) => {
  const [assistants, setAssistants] = useState<string[]>([]);
  const [loadingAssistants, setLoadingAssistants] = useState(false);
  const [fetchingAssistantsError, setError] = useState<null | Error>(null);

  const fetchAssistants = useCallback(async () => {
    setError(null);
    setLoadingAssistants(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/environments/${environmentId}/assistants`
      );
      console.log(response.data.assistants);
      const ids = (response.data.assistants || []).map(
        (a: { user_id: string }) => a.user_id
      );
      setAssistants(ids);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoadingAssistants(false);
    }
  }, []);

  useEffect(() => {
    fetchAssistants();
  }, [fetchAssistants]);

  return {
    assistants,
    fetchingAssistantsError,
    fetchAssistants,
    loadingAssistants,
  };
};
