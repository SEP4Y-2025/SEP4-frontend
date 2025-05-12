import React, { useState } from "react";
import PlantTypeRow from "../components/MyPlants/PlantTypeRow";
import AddPlantTypeModal from "../components/MyPlants/AddPlantTypeModal";
import "./MyPlants.css";

import { PlantType } from "../types";
import { addPlantType, getTypesByEnvironment } from "../services/plantTypesApi";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { StyledMyPlantsContainer } from "../Styles/MyPlants.style";
import { useNavigate } from "react-router-dom";

const MyPlants: React.FC = () => {
  const { plantTypes, pots,environmentID, loading, environmentName, error, setPlantTypes } =
    useEnvironmentCtx();
  const [open, setOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [dosage, setDosage] = useState("");
  const navigate = useNavigate();
  const handleContinue = async () => {
    if (!typeName || !wateringFrequency || !dosage) return;
    const watering = parseInt(wateringFrequency, 10);
    const dose = parseInt(dosage, 10);
    if (watering < 0 || dose < 0) return;

    try {
      await addPlantType(environmentID, {
        name: typeName,
        water_frequency: watering,
        water_dosage: dose,
      });
      const updated = await getTypesByEnvironment(environmentID);
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
  const handleOnInvite =() =>{
    navigate("/plants/invite")
  }

  return (
    <StyledMyPlantsContainer>
      <h1 className="title">My Plants - {environmentName}</h1>
      <button onClick={handleOnInvite}>Invite assistants</button>

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
