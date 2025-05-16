import { useEffect, useState } from "react";
import { Pot } from "../types";

export const useGetPotById = (potId: string, environmentId: string) => {
  const [pot, setPot] = useState<Pot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
          console.log(potId)
      console.log(environmentId)
    const fetchPot = async () => {
      console.log(potId)
      console.log(environmentId)
      setLoading(true);
      try {
        const response = await fetch(
          `/api/environments/${environmentId}/pots/${potId}`
        );
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

    if (potId && environmentId) {
      console.log(pot)
      fetchPot();
    }
  }, [potId, environmentId]);

  return { pot, loading, error };
};
