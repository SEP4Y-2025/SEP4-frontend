// types/addPlantPotApiTypes.ts

export interface AddPlantTypeRequest {
  name: string;
  watering_frequency: number;
  water_dosage: number;
}

export interface AddPlantTypeResponse {
  message: string;
  plant_type_id: string;
  name: string;
  water_frequency: number;
  water_dosage: number;
  environment_id: string;
}
