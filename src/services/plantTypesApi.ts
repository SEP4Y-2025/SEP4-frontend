import axios from "axios";
import { PlantType } from "../types";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const getTypesByEnvironment = async(environmentId: string): Promise<PlantType[]> =>{
    const response = await axios.get(`${BASE_URL}/environments/${environmentId}/plant_types`);
    return response.data.PlantTypes;
}