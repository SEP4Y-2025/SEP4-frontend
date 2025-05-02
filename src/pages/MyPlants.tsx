// pages/MyPlants.tsx
import React, { useState, useEffect } from "react";
import PlantTypeRow from "../components/MyPlants/PlantTypeRow";
import AddPlantTypeModal from "../components/MyPlants/AddPlantTypeModal";
import PlantDetails from "../components/MyPlants/PlantDetails";
import "./MyPlants.css";
import { 
  getPlantTypes, 
  addPlantType, 
  getPlantPotDetails,
  deletePlantPot
} from "../services/plantPotsRepo";

interface PlantType {
  typeName: string;
  wateringFrequency: number;
  dosage: number;
  plants?: { plantName: string }[];
}

interface SelectedPlantDetails {
  plantName: string;
  typeName: string;
  wateringFrequency: number;
  dosage: number;
}

const MyPlants: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [dosage, setDosage] = useState("");
  const [error, setError] = useState("");
  const [plantTypes, setPlantTypes] = useState<PlantType[]>([]);
  
  // New state for selected plant
  const [selectedPlant, setSelectedPlant] = useState<SelectedPlantDetails | null>(null);

  useEffect(() => {
    const fetchPlantTypes = async () => {
      const plants = await getPlantTypes();
      setPlantTypes(plants);
    };

    fetchPlantTypes();
  }, []);

  const handleContinue = () => {
    if (!typeName || !wateringFrequency || !dosage) {
      setError("Please fill out all fields.");
      return;
    }

    const watering = parseInt(wateringFrequency, 10);
    const dose = parseInt(dosage, 10);

    if (watering < 0 || dose < 0) {
      setError("Values cannot be negative.");
      return;
    }

    const newPlant: PlantType = {
      typeName,
      wateringFrequency: watering,
      dosage: dose,
      plants: [],
    };

    setPlantTypes([...plantTypes, newPlant]);
    setTypeName("");
    setWateringFrequency("");
    setDosage("");
    setError("");
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setError("");
  };

  // New function to handle selecting a plant
  const handleSelectPlant = async (typeName: string, plantName: string) => {
    const details = await getPlantPotDetails(typeName, plantName);
    if (details) {
      setSelectedPlant(details);
    }
  };

  // New function to handle closing plant details
  const handleClosePlantDetails = () => {
    setSelectedPlant(null);
    // Refresh the plant list
    getPlantTypes().then(setPlantTypes);
  };

  // New function to handle deleting a plant
  const handleDeletePlant = async () => {
    if (selectedPlant) {
      await deletePlantPot(selectedPlant.typeName, selectedPlant.plantName);
      setSelectedPlant(null);
      // Refresh the plant list
      const plants = await getPlantTypes();
      setPlantTypes(plants);
    }
  };

  return (
    <div className="plants-page">
      <h1 className="page-title">My Plants - SpaceName</h1>

      <div className="plants-list">
        {plantTypes.map((plant, index) => (
          <PlantTypeRow
            key={index}
            plant={plant}
            plants={plant.plants || []}
            onSelectPlant={handleSelectPlant}
          />
        ))}
      </div>

      <button className="add-type-button" onClick={() => setOpen(true)}>
        Add new type
      </button>

      {open && (
        <AddPlantTypeModal
          typeName={typeName}
          setTypeName={setTypeName}
          wateringFrequency={wateringFrequency}
          setWateringFrequency={setWateringFrequency}
          dosage={dosage}
          setDosage={setDosage}
          error={error}
          handleContinue={handleContinue}
          handleCancel={handleCancel}
        />
      )}

      {selectedPlant && (
        <PlantDetails
          plantName={selectedPlant.plantName}
          typeName={selectedPlant.typeName}
          wateringFrequency={selectedPlant.wateringFrequency}
          dosage={selectedPlant.dosage}
          onClose={handleClosePlantDetails}
          onDelete={handleDeletePlant}
        />
      )}
    </div>
  );
};

export default MyPlants;