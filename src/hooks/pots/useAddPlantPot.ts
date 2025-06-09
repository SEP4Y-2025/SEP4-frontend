import { useState } from "react";
import axios from "axios";
import {
  AddPlantPotRequest,
  PlantPotResponse,
} from "../../types/addPlantPotApiTypes";


const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const useAddPlantPot = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addPlantPot = async (
    env_id: string,
    pot: AddPlantPotRequest
  ): Promise<PlantPotResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/environments/${env_id}/pots`, pot);
      onSuccess && onSuccess();
      return response.data;
    } catch (err: any) {
      const backendError = err.response?.data?.detail || "Unexpected error";
      setError(new Error(backendError));
      throw new Error(backendError);
    } finally {
      setLoading(false);
    }
  };

  return { addPlantPot, loading, error };
};
