export interface AddPlantPotRequest {
    pot_id: string;
    plant_pot_label: string;
    plant_type_id: string;

}

export type PlantPotResponse = {
    message: string;
  pot_id: string;
  plant_pot_label: string;
  plant_type_id: string;
  plant_type_name: string;
  watering_frequency: number;
  water_dosage: number;
  environment_id: string;
  }
  