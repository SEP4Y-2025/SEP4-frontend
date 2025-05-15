import { useState } from "react";
import axios from "axios";
import { AddPlantPotRequest, PlantPotResponse } from "../types/addPlantPotApiTypes";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const useAddPlantPot = (onSuccess?:() => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addPlantPot = async (pot: AddPlantPotRequest): Promise<PlantPotResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/pots`, pot);
      onSuccess && onSuccess();
      return response.data;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addPlantPot, loading, error };
};