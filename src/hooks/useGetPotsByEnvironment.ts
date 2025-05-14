import { useEffect, useState } from "react";
import axios from "axios";
import { Pot } from "../types";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const useGetPotsByEnvironment = (environmentId: string) => {
  const [pots, setPots] = useState<Pot[]>([]);

  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchPots = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/environments/${environmentId}/pots`);
        setPots(response.data.pots);
      } catch (err) {
        setError(err as Error);
      } 
    };

    fetchPots();
  }, [environmentId]);

  return { pots, error };
};