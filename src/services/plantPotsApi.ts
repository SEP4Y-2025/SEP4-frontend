import axios from "axios";
import { AddPlantPotRequest, PlantPotResponse } from "../types/plantPotTypes";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const addPlantPot = async (pot: AddPlantPotRequest): Promise<PlantPotResponse> => {
  const response = await axios.post(`${BASE_URL}/pots`, pot);
  return response.data;
};

export const getPotsByEnvironment = async (environmentId: string): Promise<PlantPotResponse[]> => {
  const response = await axios.get(`${BASE_URL}/pots/environments/${environmentId}`);
  return response.data;
};