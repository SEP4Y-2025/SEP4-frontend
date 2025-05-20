import axios from "axios";
import { useEffect, useState } from "react";
import { EnvironmentBrief } from "../../types/Environment";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export function useFetchMyEnvironments(userId: string) {
  const [error, setError] = useState("");
  const [environmentsList, setEnvironmentsList] = useState<EnvironmentBrief[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const fetchAllEnvironments = async () => {
    setError("");
    setEnvironmentsList([]);
    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_URL}/users/${userId}/environments`
      );
      console.log(response); //TODO remove
      setEnvironmentsList(response?.data?.environments ?? []);
    } catch (err: any) {
      setError(err.response?.data?.error || "an error occured");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllEnvironments()
  }, [])
  return { error, environmentsList, loading, fetchAllEnvironments };
}
