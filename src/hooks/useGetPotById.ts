import { useEffect, useState } from "react";
import { Pot } from "../types";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const useGetPotById = (potId: string, environmentId: string) => {
  const [pot, setPot] = useState<Pot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPot = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/environments/${environmentId}/pots/pot_2`
        );
        console.log(response.data);
        const data = await response.data;
        setPot(data.pot);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (potId && environmentId) {
      console.log(pot);
      fetchPot();
    }
  }, [potId, environmentId]);

  return { pot, loading, error };
};
