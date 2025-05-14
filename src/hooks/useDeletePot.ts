import { useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const useDeletePot = () => {

  const [error, setError] = useState<Error | null>(null);

  const deletePot = async (potId: string, environmentId: string): Promise<boolean> => {
    setError(null);
    try {
      await axios.delete(`${BASE_URL}/environments/${environmentId}/pots/${potId}`);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } 
  };

  return { deletePot, error };
};
