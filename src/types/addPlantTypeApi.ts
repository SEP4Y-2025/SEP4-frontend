// types/addPlantPotApiTypes.ts

export interface AddPlantTypeRequest {
    plant_type_name: string;
    watering_freq: number;
    water_dosage: number;
  }
  
  export interface AddPlantTypeResponse {
    message: string;
    plant_type_id: string;
    plant_type_name: string;
    watering_freq: number;
    water_dosage: number;
    environment_id: string;
  }
  