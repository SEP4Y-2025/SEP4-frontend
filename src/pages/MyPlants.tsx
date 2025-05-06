import React, { useState } from "react";
import PlantTypeSection from "../components/MyPlants/PlantTypeRow";
import AddPlantModal from "../components/MyPlants/AddPlantModal";
import EnvironmentSelector from "../components/MyPlants/EnvironmentSelector";

import "./MyPlants.css";

interface Environment {
  name: string;
  windowState: "open" | "closed";
  airHumidity: number;
  temperature: number;
}

interface PlantType {
  typeName: string;
  wateringFrequency: number;
  dosage: number;
  environmentName: string;
}

const MyPlants: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [dosage, setDosage] = useState("");
  const [error, setError] = useState("");
  const [plantTypes, setPlantTypes] = useState<PlantType[]>([]);
  const [environments, setEnvironments] = useState<Environment[]>([
    { name: "Living Room", windowState: "open", airHumidity: 50, temperature: 22 },
    { name: "Bedroom", windowState: "closed", airHumidity: 40, temperature: 20 },
  ]);
  const [selectedEnvironmentName, setSelectedEnvironmentName] = useState<string>("");


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
      environmentName: selectedEnvironmentName,
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

  return (
    <div className="plants-page">
      <h1 className="page-title">
      My Plants {selectedEnvironmentName ? `- ${selectedEnvironmentName}` : ""}
      </h1>


      <EnvironmentSelector
      environments={environments}
      selectedEnvironmentName={selectedEnvironmentName}
      onSelect={setSelectedEnvironmentName}
      />

      <div className="plants-list">
        {plantTypes
          .filter((plant) => plant.environmentName === selectedEnvironmentName)
          .map((plant, index) => (
            <PlantTypeSection key={index} plant={plant} />
          ))}
      </div>


      <button className="add-type-button" onClick={() => setOpen(true)}>
        Add new type
      </button>

      {open && (
        <AddPlantModal
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
    </div>
  );
};

export default MyPlants;