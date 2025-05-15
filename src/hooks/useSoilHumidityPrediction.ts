import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { SoilHumidityPrediction } from "../types"; // Adjust the path as needed

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const useSoilHumidityPrediction = (potId: string, minutesAhead: number = 5) => {
  const [prediction, setPrediction] = useState<SoilHumidityPrediction | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrediction = useCallback(async (minutes: number = minutesAhead) => {
    setLoading(true);
    setError(null);
    
    try {
      // For testing purposes, use "pot_1" (which has data) instead of the actual potId
      // In the future, you can change this back to use the actual potId parameter
      const testPotId = "pot_1";
      
      const response = await axios.get(
        `${BASE_URL}/api/prediction/future-humidity?plant_pot_id=${testPotId}&minutes_ahead=${minutes}`
      );
      setPrediction(response.data);
      console.log(`Fetched prediction for pot_1 (${minutes} min ahead):`, response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch prediction");
      console.error("Error fetching soil humidity prediction:", err);
    } finally {
      setLoading(false);
    }
  }, [minutesAhead]);

  useEffect(() => {
    // Always fetch predictions regardless of potId
    // This ensures we can see the predictions for testing
    fetchPrediction(minutesAhead);
  }, [fetchPrediction, minutesAhead]);

  return { prediction, loading, error, refetch: fetchPrediction };
};