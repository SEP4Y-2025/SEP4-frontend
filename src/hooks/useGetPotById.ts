import { useEffect, useState } from "react";
import { Pot } from "../types";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const useGetPotById = (potId: string, environmentId: string) => {
  const [pot, setPot] = useState<Pot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!potId || !environmentId) return;

    const fetchPot = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/environments/${environmentId}/pots/${potId}`
        );
        const raw = response.data.pot;

        const transformedPot: Pot = {
          pot_id: raw.pot_id,
          plant_type_id: raw.plant_type_id,
          label: raw.plant_pot_label,
          environment_id: raw.environment_id,
          water_dosage: raw.water_dosage,
          watering_frequency: raw.watering_frequency,
          state: {
            soil_humidity: raw.soil_humidity_percentage,
            air_humidity: raw.air_humidity_percentage,
            temperature: raw.temperature_celsius,
            light_intensity: raw.light_intensity_lux,
            water_level: raw.water_level_percentage,
            water_tank_capacity: raw.water_tank_capacity_ml,
            measured_at: raw.measured_at,
          },
        };

        setPot(transformedPot);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPot();
  }, [potId, environmentId]);

  return { pot, loading, error };
};
