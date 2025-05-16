import { useState } from "react";
import axios from "axios";
import { Pot } from "../types";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const useGetPotsByEnvironment = () => {
  const [error, setError] = useState<Error | null>(null);
  const getPotsByEnvironment = async (
    environmentId: string
  ): Promise<Pot[]> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/environments/${environmentId}/pots`
      );
      return response.data.pots as Pot[];
    } catch (error) {
      console.error("Error fetching pots:", error);
      throw error;
    }
  };
};
