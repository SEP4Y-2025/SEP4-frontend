export interface AddPlantPotRequest {
    plantPotLabel: string;
    potId: string;
    wateringFrequency: number;
    waterDosage: number;
}

export type PlantPotResponse = {
    message: string;
    pot_id: string;
    plant_pot_label: string;
    watering_frequency: number;
    water_dosage: number;
  }
  