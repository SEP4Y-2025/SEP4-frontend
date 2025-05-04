import { useState, useEffect } from "react";
import { getPotsByEnvironment, addPlantPot } from "../services/plantPotsApi";
import { PlantPotResponse , AddPlantPotRequest} from "../types/addPlantPotApiTypes";

export const usePlantPots = (environmentId: string) => {
  const [plantTypes, setPlantTypes] = useState([] as PlantPotResponse[]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPots = async () => {
      try {
        const pots = await getPotsByEnvironment(environmentId);
        setPlantTypes(pots);
      } catch (err) {
        setError("Failed to fetch pots.");
      }
    };

    fetchPots();
  }, [environmentId]);

  const addPlant = async (newPlant : AddPlantPotRequest) => {
    try {
      await addPlantPot(newPlant);
      const updatedPots = await getPotsByEnvironment(environmentId);
      setPlantTypes(updatedPots);
    } catch (err) {
      setError("Failed to add plant.");
    }
  };

  return { plantTypes, addPlant, error };
};