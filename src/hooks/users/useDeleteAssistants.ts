import { use, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export function useDeleteAssistants() {
  const deleteAssistant = async (
    environmentId: string,
    email: string,
    onSuccess?: () => void
  ): Promise<{
    success: boolean;
    error?: string;
  }> => {
    try {
      await axios.delete(
        `${BASE_URL}/environments/${environmentId}/assistants?user_email=${email}`
      );
      onSuccess && onSuccess();
      return { success: true };
    } catch (err: any) {
      console.error("Error deleting assistant:", err.response?.data?.message);
      return {
        success: false,
        error:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to delete an assistant",
      };
    }
  };

  return { deleteAssistant };
}
