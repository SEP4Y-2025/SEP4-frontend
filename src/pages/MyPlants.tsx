import React, { useState } from "react";
import PlantTypeRow from "../components/MyPlants/PlantTypeRow";
import AddPlantTypeModal from "../components/MyPlants/AddPlantTypeModal";
import "./MyPlants.css";

import { PlantType } from "../types";
import { addPlantType, getTypesByEnvironment } from "../services/plantTypesApi";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { StyledMyPlantsContainer } from "../Styles/MyPlants.style";

const MyPlants: React.FC = () => {
  const { plantTypes, pots, loading, environmentName, error, setPlantTypes } =
    useEnvironmentCtx();
  const [open, setOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [dosage, setDosage] = useState("");

  const handleContinue = async () => {
    if (!typeName || !wateringFrequency || !dosage) return;
    const watering = parseInt(wateringFrequency, 10);
    const dose = parseInt(dosage, 10);
    if (watering < 0 || dose < 0) return;

    try {
      await addPlantType("680f8359688cb5341f9f9c19", {
        name: typeName,
        water_frequency: watering,
        water_dosage: dose,
      });
      const updated = await getTypesByEnvironment("680f8359688cb5341f9f9c19");
      setPlantTypes(updated);
      setTypeName("");
      setWateringFrequency("");
      setDosage("");
      setOpen(false);
    } catch (err) {
      console.error("Failed to add plant type");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <StyledMyPlantsContainer>
      <h1 className="title">My Plants - {environmentName}</h1>

      {plantTypes.map((plant: PlantType, index: number) => (
        <PlantTypeRow
          key={index}
          plant={plant}
          pots={pots
            .filter((pot) => pot.plantTypeId === plant._id)
            .map((pot) => ({
              id: pot.potId,
              potName: pot.name,
            }))}
        />
      ))}

      <button className="addType" onClick={() => setOpen(true)}>
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
          error={error ?? ""}
          handleContinue={handleContinue}
          handleCancel={handleCancel}
        />
      )}
    </StyledMyPlantsContainer>
  );
};

export default MyPlants;
