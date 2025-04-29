import axios from "axios";

// Define API base URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";


export interface Pot{
  _id: string;
  plant_type_id: string;
  environment_id: string;
  water_tank_id: string;
  soil_humidity: number;
}

export const fetchPots = async (envId: string): Promise<Pot[]> => {
  try{
    const response = await axios.get<{pots: Pot[]}>(`${API_URL}/pots/environments/${envId}`);
    return response.data.pots;
  }
  catch(error){
    console.error("Error fetching pots: ", error);
    throw error;
  }
};

export const fetchLogs = async (): Promise<string[]> => {
  try {
    const response = await axios.get<{ logs: string[] }>(`${API_URL}/logs`);
    return response.data.logs;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};