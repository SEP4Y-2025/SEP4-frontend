import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";


export const fetchLogs = async (): Promise<string[]> => {
  try {
    const response = await axios.get<{ logs: string[] }>(`${API_URL}/logs`);
    return response.data.logs;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};