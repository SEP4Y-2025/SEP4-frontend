import { useEffect, useState } from "react";
import axios from "axios";
import { Pot } from "../types";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const useGetPotsByEnvironment = (environmentId: string) => {
  const [pots, setPots] = useState<Pot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchPots = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching pots for environment:', environmentId);
        const response = await axios.get(`${BASE_URL}/environments/${environmentId}/pots`);
        console.log('Raw response:', response.data);
        
        // Transform the data to match frontend expectations
        const transformedPots = response.data.pots.map((pot: any) => ({
          pot_id: pot.pot_id?.$oid || pot.pot_id,  // Handle ObjectId
          name: pot.name,
          plant_type_id: pot.plant_type_id?.$oid || pot.plant_type_id,  // Handle ObjectId
          state: pot.state
        }));
        
        console.log('Transformed pots:', transformedPots);
        setPots(transformedPots);
      } catch (err) {
        console.error('Error fetching pots:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (environmentId) {
      fetchPots();
    }
  }, [environmentId]);

  return { pots, loading, error };
};