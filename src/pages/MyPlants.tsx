import React, { useState } from "react";
import PlantTypeRow from "../components/MyPlants/PlantTypeRow";
import AddPlantTypeModal from "../components/MyPlants/AddPlantTypeModal";
import "./MyPlants.css";

import { PlantType } from "../types";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { StyledMyPlantsContainer } from "../Styles/pages/MyPlants.style";
import { Button } from "../Styles/common/Button.style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserAuthContext";
import { useAddPlantType } from "../hooks/useAddPlantType";
import { toast } from "react-toastify";
import { Flex } from "../Styles/common/Flex";

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

      <Flex $dir="row" $width="35rem" $justifyC="space-between" $alignI="center">
        <Button onClick={handleOnInvite}>Invite assistants</Button>

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
      </Flex>


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

    </StyledMyPlantsContainer>
  );
};

export default MyPlants;
