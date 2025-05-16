import { use, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export function useDeleteEnvironment() {
  const [errorDelete, setErrorDelete] = useState<string | null>(null);
  const [successDelete, setSuccessDelete] = useState<string | null>(null);

  const deleteEnvironment = async (environmentId: string) => {
    setErrorDelete(null);
    setSuccessDelete(null);
    try {
      const response = await axios.delete(
        `${BASE_URL}/environments/${environmentId}`
      );
      setSuccessDelete(
        response.data?.message || "Environment deleted successfully"
      );
    } catch (err: any) {
      console.error("Error deleting environment:", err.response?.data.message);
      setErrorDelete(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to delete environment"
      );
    }
  };

  return {
    deleteEnvironment,
    errorDelete: errorDelete,
    successDelete: successDelete,
  };
}
