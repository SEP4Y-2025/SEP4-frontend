export interface AddPlantPotRequest {
    plant_pot_label: string;
    plant_type_id: string;
    arduino_id: string;
}

export type PlantPotResponse = {
    message: string;
    plant_pot_label: string;
    pot_id: string;
    plant_type_id: string;
    arduino_id: string;
  }
  