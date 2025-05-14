import axios from "axios";
import { AddPlantPotRequest, PlantPotResponse } from "../types/addPlantPotApiTypes";
import { Pot } from "../types";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const addPlantPot = async (environementId:string, pot: AddPlantPotRequest): Promise<PlantPotResponse> => {
  const response = await axios.post(`${BASE_URL}/pots`, pot);
  return response.data;
};

export const getPotsByEnvironment = async (environmentId: string): Promise<Pot[]> => {
  const response = await axios.get(`${BASE_URL}/environments/${environmentId}/pots`);
  return response.data.pots as Pot[];
};

export const deletePot = async (potId: string, environmentId: string) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/environments/${environmentId}/pots/${potId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete pot:", error);
    throw error;
  }
};

export const getPotById = async (potId: string, environmentId: string = "680f8359688cb5341f9f9c19") => {
  try {
    const response = await fetch(`/api/environments/${environmentId}/pots/${potId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pot details');
    }
    const data = await response.json();
    return data.pot;
  } catch (error) {
    console.error('Error fetching pot details:', error);
    throw error;
  }
};
