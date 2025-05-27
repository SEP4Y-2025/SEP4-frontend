import { useCallback, useEffect, useState } from "react";
import { PlantType } from "../../types";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const useGetTypesByEnvironment = (environmentId: string) => {
  const [types, setTypes] = useState<PlantType[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const fetchTypes = useCallback(async () => {
    setError(null);
    setLoadingTypes(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/environments/${environmentId}/plant_types`
      );
      setTypes(response.data.PlantTypes);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoadingTypes(false);
    }
  }, []);
  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  return { types, error, loadingTypes, fetchTypes };
};
