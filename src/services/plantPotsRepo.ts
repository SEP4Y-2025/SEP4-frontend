interface PlantType {
  typeName: string;
  wateringFrequency: number;
  dosage: number;
  plants: { plantName: string }[];
}

const plantTypes: PlantType[] = [
  { typeName: "Cactus", wateringFrequency: 1, dosage: 50, plants: [{ plantName: "Pot 1" }] },
  { typeName: "Fern", wateringFrequency: 3, dosage: 100, plants: [{ plantName: "Pot A" }, { plantName: "Pot B" }] },
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
      resolve(plant ? [...plant.plants] : []);
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
        plant.plants.push({ plantName: newPotName });
      }
      resolve();
    }, 500);
  });
};

// services/plantPotsRepo.ts - Add this function to work with dummy data

export const getPlantPotDetails = async (typeName: string, plantName: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const plantType = plantTypes.find((p) => p.typeName === typeName);
      if (plantType) {
        const plant = plantType.plants.find((p) => p.plantName === plantName);
        if (plant) {
          resolve({
            plantName: plant.plantName,
            typeName: plantType.typeName,
            wateringFrequency: plantType.wateringFrequency,
            dosage: plantType.dosage
          });
        }
      }
      resolve(null);
    }, 500);
  });
};

export const deletePlantPot = async (typeName: string, plantName: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const plantTypeIndex = plantTypes.findIndex((p) => p.typeName === typeName);
      if (plantTypeIndex !== -1) {
        const plantIndex = plantTypes[plantTypeIndex].plants.findIndex(
          (p) => p.plantName === plantName
        );
        if (plantIndex !== -1) {
          plantTypes[plantTypeIndex].plants.splice(plantIndex, 1);
        }
      }
      resolve();
    }, 500);
  });
};