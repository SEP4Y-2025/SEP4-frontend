import React, { useEffect, useState } from "react";
import PlantTypeRow from "../components/MyPlants/PlantTypeRow";
import AddPlantTypeModal from "../components/MyPlants/AddPlantTypeModal";
import "./MyPlants.css";

import { PlantType } from "../types";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { StyledMyPlantsContainer } from "../Styles/pages/MyPlants.style";
import { Button, DeleteButton } from "../Styles/common/Button.style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserAuthContext";
import { useAddPlantType } from "../hooks/useAddPlantType";
import { toast } from "react-toastify";
import { Flex } from "../Styles/common/Flex";
import { useDeleteEnvironment } from "../hooks/useDeleteEnvironment";

const MyPlants = () => {
  const {
    plantTypes,
    pots,
    environmentID,
    loading,
    environmentName,
    error,
    refreshEnvironmentData,
    isOwner,
    setPlantTypes } = useEnvironmentCtx();
  const { addPlantType } = useAddPlantType();
  const [open, setOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [dosage, setDosage] = useState("");
  const navigate = useNavigate();
  const { deleteEnvironment, errorDelete, successDelete } = useDeleteEnvironment();

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

  useEffect(() => {
    if (successDelete) {
      toast.success("Environment deleted");
      navigate("/");
    }
    if (errorDelete) {
      toast.error("Failed to delete environment");
    }
  }, [successDelete, errorDelete, navigate]);

  const handleDeleteEnvironment = async () => {
    if (window.confirm("Are you sure you want to delete this environment?")) {
      await deleteEnvironment(environmentID);
    }
  };

  return (
    <StyledMyPlantsContainer>
      <h1 className="title">My Plants - {environmentName}</h1>
      <Flex $width="55rem" $justifyC="start" $gap="1rem">
        {isOwner && <Button onClick={handleOnInvite}>Invite assistants</Button>}
        {isOwner && <Button onClick={() => setOpen(true)}>Add new type</Button>}
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
        <Flex $width="100%" $justifyC="end">
          <DeleteButton onClick={handleDeleteEnvironment}>Delete</DeleteButton>
        </Flex>
      </Flex>
      {plantTypes.map((plant: PlantType, index: number) => {
        const filteredPots = pots.filter((pot) => pot.plant_type_id === plant._id);

        return (
          <PlantTypeRow
            key={index}
            plant={plant}
            pots={filteredPots.map((pot) => ({
              id: pot.pot_id,
              potName: pot.name,
            }))}
          />
        );
      })}

    </StyledMyPlantsContainer>
  );
};

export default MyPlants;
