import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const useGetHistoricData = (envId: string, potId: string) => {
  const [oldReadings, setOldReadings] = useState<any[]>([]);
  const [loadingOldReadings, setLoadingOldReadings] = useState(false);
  const [errorGettingOldReadings, setErrorGettingOldReadings] =
    useState<Error | null>(null);

  const fetchOldReadings = async () => {
    if (!envId || !potId) return;
    setLoadingOldReadings(true);
    setErrorGettingOldReadings(null);

    try {
      const response = await axios.get(
        `${BASE_URL}/environments/${envId}/pots//historicalData`
      );
      console.log(response.data);
      setOldReadings(response.data.readings);
    } catch (err) {
      setErrorGettingOldReadings(err as Error);
    } finally {
      setLoadingOldReadings(false);
    }
  };

  useEffect(() => {
    if (!envId || !potId){console.log("empty!!!") 
        return;}
    fetchOldReadings();
  }, [potId, envId]);

  return { oldReadings, errorGettingOldReadings, loadingOldReadings };
};
