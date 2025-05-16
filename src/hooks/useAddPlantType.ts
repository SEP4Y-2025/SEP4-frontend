import { useState } from "react";
import axios from "axios";
import {
  AddPlantTypeRequest,
  AddPlantTypeResponse,
} from "../types/addPlantTypeApi";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const useAddPlantType = () => {
  const [error, setError] = useState<Error | null>(null);

  const addPlantType = async (
    environmentId: string,
    newType: AddPlantTypeRequest
  ): Promise<AddPlantTypeResponse | null> => {
    setError(null);
    try {
      const response = await axios.post(
        `${BASE_URL}/environments/${environmentId}/plant_types`,
        newType
      );
      return response.data;
    } catch (err) {
      setError(err as Error);
      return null;
    }
  };

  return { addPlantType, error };
};
