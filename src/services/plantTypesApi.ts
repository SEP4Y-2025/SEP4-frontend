
import axios from "axios";
import { AddPlantTypeRequest, AddPlantTypeResponse } from "../types/addPlantTypeApi";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";


export const addPlantType = async (
  environmentId: string,
  plantType: AddPlantTypeRequest
): Promise<AddPlantTypeResponse> => {
  const response = await axios.post(
    `${BASE_URL}/environments/${environmentId}/plant_types`,
    plantType
  );
  return response.data;
};
