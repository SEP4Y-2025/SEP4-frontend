import { PlantType } from "../types/plantType";
import { v4 as uuidv4 } from 'uuid';

const plantTypes: PlantType[] = [
  { typeName: "Cactus", wateringFrequency: 1, dosage: 50, plants: [{ id: "1", plantName: "Pot 1" }] },
  { typeName: "Fern", wateringFrequency: 3, dosage: 100, plants: [{ id: "2", plantName: "Pot A" }, {id: "3", plantName: "Pot B" }] },
];

export const getPlantTypes = async (): Promise<PlantType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...plantTypes]), 500);
  });
};

export const getPotsByPlantType = async (typeName: string): Promise<{ plantName: string }[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const plant = plantTypes.find((p) => p.typeName === typeName);
      resolve(plant?.plants ?? []);
    }, 500); 
  });
};

export const addPlantType = async (newPlant: PlantType): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      plantTypes.push(newPlant);
      resolve();
    }, 500);
  });
};

export const addPotToPlantType = async (typeName: string, newPotName: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const plant = plantTypes.find((p) => p.typeName === typeName);
            if (plant) {
                (plant.plants ??= []).push({ id: uuidv4(), plantName: newPotName });
            }
            resolve();
        }, 500);
    });
};