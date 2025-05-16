import { useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export function useInviteAssistants() {
  const invite = async (
    environmentId: string,
    userMail: string,
    onSuccess?:() =>void,
  ): Promise<{
    success: boolean;
    error?: string;
  }> => {
    try {
       await axios.put(
        `${BASE_URL}/environments/${environmentId}/assistants`,
        { user_email: userMail }
        //TODO deleteing doesnt work bcs of backend cheers
      );
      onSuccess && onSuccess();
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to delete environment",
      };
    }
  };

  return { invite };
}
