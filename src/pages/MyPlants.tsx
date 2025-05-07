import React, { useState, useEffect } from "react";
import PlantTypeRow from "../components/MyPlants/PlantTypeRow";
import AddPlantTypeModal from "../components/MyPlants/AddPlantTypeModal";
import "./MyPlants.css";

import { PlantType } from "../types";
import { addPlantType } from "../services/plantTypesApi";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { Flex } from "../Styles/Flex";
import { StyledMyPlantsContainer } from "../Styles/MyPlants.style";

const MyPlants: React.FC = () => {
  const { plantTypes, pots, loading, environmnentName, error } =
    useEnvironmentCtx();
  const [open, setOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [dosage, setDosage] = useState("");

  // useEffect(() => {
  //   const fetchPlantTypes = async () => {
  //     const plants = await getPlantTypes();
  //     setPlantTypes(plants);
  //   };

  //   fetchPlantTypes();
  // }, []);

  const handleContinue = async () => {
  if (!typeName || !wateringFrequency || !dosage) {
    //setError("Please fill out all fields.");
    return;
  }

  const watering = parseInt(wateringFrequency, 10);
  const dose = parseInt(dosage, 10);

    if (watering < 0 || dose < 0) {
      //setError("Values cannot be negative.");
      return;
    }

  const environmentId = "680f8359688cb5341f9f9c19"; // ✅ Move this here

  try {
    await addPlantType(environmentId, {
      plant_type_name: typeName,
      watering_freq: watering,
      water_dosage: dose,
    });

    const updated = await getTypesByEnvironment(environmentId);
    setPlantTypes(updated);

    // Reset modal state
    setTypeName("");
    setWateringFrequency("");
    setDosage("");
    //setError("");
    setOpen(false);
  } catch (err) {
    //setError("Failed to add plant type.");
  }
};


  const handleCancel = () => {
    setOpen(false);
    //setError("");
  };

  return (
    <StyledMyPlantsContainer>
      <h1 className="title">My Plants - {environmnentName}</h1>

        {plantTypes.map((plant, index) => (
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
          error={error}
          handleContinue={handleContinue}
          handleCancel={handleCancel}
        />
      )}
    </StyledMyPlantsContainer>
  );
};

export default MyPlants;
