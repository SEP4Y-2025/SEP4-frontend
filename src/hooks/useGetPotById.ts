import { useEffect, useState } from "react";
import { Pot } from "../types";

export const useGetPotById = (potId: string, environmentId: string = "680f8359688cb5341f9f9c19") => {
  const [pot, setPot] = useState<Pot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPot = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/environments/${environmentId}/pots/${potId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pot details");
        }
        const data = await response.json();
        setPot(data.pot);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (potId) fetchPot();
  }, [potId, environmentId]);

  return { pot, loading, error };
};
