import React, { useState } from "react";
import PlantTypeRow from "../components/MyPlants/PlantTypeRow";
import AddPlantTypeModal from "../components/MyPlants/AddPlantTypeModal";
import "./MyPlants.css";

import { PlantType } from "../types";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { StyledMyPlantsContainer } from "../Styles/MyPlants.style";
import { Button } from "../Styles/Button.style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserAuthContext";
import { useAddPlantType } from "../hooks/useAddPlantType";
import { toast } from "react-toastify";

const MyPlants = () => {
  const {
    plantTypes,
    pots,
    environmentID,
    loading,
    environmentName,
    error,
    refreshEnvironmentData,
  } = useEnvironmentCtx();
  const { addPlantType } = useAddPlantType();

  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [dosage, setDosage] = useState("");
  const navigate = useNavigate();
  const handleContinue = async () => {
    if (!typeName || !wateringFrequency || !dosage) {
      toast.error("Please fill in all fields");
      //setErrorMessage("Please fill in all fields");
      return;
    }
    const watering = parseInt(wateringFrequency, 10);
    const dose = parseInt(dosage, 10);
    if (watering <= 0 || dose <= 0) {
      toast.error("Please set correct dosage and watering.");
      return;
    }

    try {
      await addPlantType(environmentID, {
        name: typeName,
        watering_frequency: watering,
        water_dosage: dose,
      });
      await refreshEnvironmentData();
      setTypeName("");
      setWateringFrequency("");
      setDosage("");
      setOpen(false);
    } catch (err) {
      toast.error("Failed to add plant type");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleOnInvite = () => {
    navigate("/plants/invite");
  };

  return (
    <StyledMyPlantsContainer>
      <h1 className="title">My Plants - {environmentName}</h1>
      <button onClick={handleOnInvite}>Invite assistants</button>

      {plantTypes.map((plant: PlantType, index: number) => {
        // Add debugging to see what's being filtered
        const filteredPots = pots.filter((pot) => pot.plant_type_id === plant._id);
        console.log(`Plant ${plant.name} (${plant._id}):`, filteredPots);

        return (
          <PlantTypeRow
            key={index}
            plant={plant}
            pots={filteredPots.map((pot) => ({
              id: pot.pot_id,      // Changed from potId to pot_id
              potName: pot.name,
            }))}
          />
        );
      })}

      <Button onClick={() => setOpen(true)}>Add new type</Button>
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