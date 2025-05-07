
import axios from "axios";
import { AddPlantTypeRequest, AddPlantTypeResponse } from "../types/addPlantTypeApi";
import { PlantType } from "../types";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";


export const addPlantType = async (
  environmentId: string,
  newType: AddPlantTypeRequest
): Promise<AddPlantTypeResponse> => {
  const response = await axios.post(
    `${BASE_URL}/environments/${environmentId}/plant_types`,
    newType
  );
  return response.data;
};



export const getTypesByEnvironment = async(environmentId: string): Promise<PlantType[]> =>{
    const response = await axios.get(`${BASE_URL}/environments/${environmentId}/plant_types`);
    return response.data.PlantTypes;};