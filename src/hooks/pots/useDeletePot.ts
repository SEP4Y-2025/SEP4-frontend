import { useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const useDeletePot = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const deletePot = async (
    potId: string,
    environmentId: string
  ): Promise<boolean> => {
    setError(null);
    setLoading(true);

    try {
      const response = await axios.delete(
        `${BASE_URL}/environments/${environmentId}/pots/${potId}`
      );

      if (response.status === 200) {
        console.log("Pot deleted successfully:", response.data);
        return true;
      } else {
        setError("Unexpected response from server");
        return false;
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail || err.message || "Failed to delete pot";
      setError(errorMessage);
      console.error("Delete pot error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deletePot, error, loading };
};
