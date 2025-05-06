import axios from "axios";
import { AddPlantPotRequest, PlantPotResponse } from "../types/addPlantPotApiTypes";
import { Pot } from "../types";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const addPlantPot = async (pot: AddPlantPotRequest): Promise<PlantPotResponse> => {
  const response = await axios.post(`${BASE_URL}/pots`, pot);
  return response.data;
};

export const getPotsByEnvironment = async (environmentId: string): Promise<Pot[]> => {
  const response = await axios.get(`${BASE_URL}/environments/${environmentId}/pots`);
  return response.data.pots as Pot[];
};
