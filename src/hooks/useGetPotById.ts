import { useEffect, useState } from "react";
import axios from "axios";
import { Pot } from "../types";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const useGetPotById = (potId: string, environmentId: string) => {
  const [pot, setPot] = useState<Pot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPot = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching pot details for:', potId, 'in environment:', environmentId);
        
        // Use the correct backend endpoint
        const response = await axios.get(`${BASE_URL}/environments/${environmentId}/pots/${potId}`);
        console.log('Raw pot response:', response.data);
        
        // Transform the pot data
        if (response.data.pot) {
          const transformedPot = {
            pot_id: response.data.pot.pot_id?.$oid || response.data.pot.pot_id,
            name: response.data.pot.name,
            plant_type_id: response.data.pot.plant_type_id?.$oid || response.data.pot.plant_type_id,
            state: response.data.pot.state
          };
          
          console.log('Transformed pot:', transformedPot);
          setPot(transformedPot);
        } else {
          console.log('No pot found in response');
          setPot(null);
        }
      } catch (err) {
        console.error('Error fetching pot details:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (potId && environmentId) {
      fetchPot();
    }
  }, [potId, environmentId]);

  return { pot, loading, error };
};