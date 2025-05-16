import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Pot } from "../types";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const useGetPotsByEnvironment = (environmentId: string) => {
  const [pots, setPots] = useState<Pot[]>([]);
  const [loadingPots, setLoadingPots] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const fetchPots = useCallback(async () => {
    setError(null);
    setLoadingPots(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/environments/${environmentId}/pots`
      );
      setPots(response.data.pots);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoadingPots(false);
    }
  },[]);

  useEffect(() => {
    fetchPots();
  }, [fetchPots]);

  return { pots, error, fetchPots, loadingPots };
};
