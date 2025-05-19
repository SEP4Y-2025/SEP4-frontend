import { use, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export function useDeleteEnvironment() {

  const deleteEnvironment = async (
    environmentId: string
  ): Promise<{
    success: boolean;
    error?: string;
  }> => {
    try {
      await axios.delete(`${BASE_URL}/environments/${environmentId}`);
      return { success: true };
    } catch (err: any) {
      console.error("Error deleting environment:", err.response?.data?.message);
      return {
        success: false,
        error:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to delete environment",
      };
    }
  };

  return { deleteEnvironment };
}
