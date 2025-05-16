import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { UserProfile } from "../types/User";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const useGetAssistants = (environmentId: string) => {
  const [assistants, setAssistants] = useState<UserProfile[]>([]);
  const [loadingAssistants, setLoadingAssistants] = useState(false);
  const [fetchingAssistantsError, setError] = useState<null | Error>(null);

  const fetchAssistants = useCallback(async () => {
    setError(null);
    setLoadingAssistants(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/environments/${environmentId}/assistants`
      );
     const ids: string[] = (response.data.assistants || []).map(
        (a: { user_id: string }) => a.user_id
      );

      const people: UserProfile[] = await Promise.all(
        ids.map(async (id) => {
          const userRes = await axios.get(`${BASE_URL}/users/${id}`);
          const data = userRes.data;
          return {
            userName: data.username,
            email: data.email,
          } as UserProfile;
        })
      );
      setAssistants(people);
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
