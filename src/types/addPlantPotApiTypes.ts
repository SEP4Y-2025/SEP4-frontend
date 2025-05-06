// models/plant_pot.ts

export interface AddPlantPotRequest {
    plantPotLabel: string;
    potId: string;
    wateringFrequency: number;
    waterDosage: number;
}

export type PlantPotResponse = {
    message: string;
    potId: string;
    plantPotLabel: string;
    wateringFrequency: number;
    waterDosage: number;
}