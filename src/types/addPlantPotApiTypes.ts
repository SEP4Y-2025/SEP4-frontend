export interface AddPlantPotRequest {
    plant_pot_label: string;
    pot_id: string;
    watering_frequency: number;
    water_dosage: number;
  }
  
  export interface PlantPotResponse {
    message: string;
    pot_id: string;
    plant_pot_label: string;
    watering_frequency: number;
    water_dosage: number;
  }
  