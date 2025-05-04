export interface PlantType {
  typeName: string;
  wateringFrequency: number;
  dosage: number;
  plants?: { id: string, plantName: string }[];
}