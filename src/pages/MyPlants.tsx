import React, { useEffect, useState } from "react";
import PlantTypeRow from "../components/MyPlants/PlantTypeRow";
import AddPlantTypeModal from "../components/MyPlants/AddPlantTypeModal";
import { PlantType } from "../types";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { StyledMyPlantsContainer, StyledButtonContainer } from "../Styles/pages/MyPlants.style";
import { Button, DeleteButton } from "../Styles/common/Button.style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserAuthContext";
import { useAddPlantType } from "../hooks/pots/useAddPlantType";
import { toast } from "react-toastify";
import { Flex } from "../Styles/common/Flex";
import { useDeleteEnvironment } from "../hooks/environments/useDeleteEnvironment";

import AddAssistantModal from "../components/MyPlants/AddAssistantModal";
import { useGetPotsByEnvironment } from "../hooks/pots/useGetPotsByEnvironment";
import { useGetTypesByEnvironment } from "../hooks/pots/useGetTypesByEnvironment";
import { CircularProgress } from "@mui/material";
import { Overlay } from "../Styles/modal/Overlay.style";
import { dir } from "console";
import {Title} from "../Styles/common/Title.style";
const MyPlants = () => {
  const { environmentID, environmentName, isOwner } = useEnvironmentCtx();
  const { pots, loadingPots, fetchPots } =
    useGetPotsByEnvironment(environmentID);

  const { types, loadingTypes, fetchTypes } =
    useGetTypesByEnvironment(environmentID);
  const { addPlantType } = useAddPlantType(fetchTypes);
  const [openNewType, setOpenNewType] = useState(false);

  const [typeName, setTypeName] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [dosage, setDosage] = useState("");
  const navigate = useNavigate();
  const { deleteEnvironment } = useDeleteEnvironment();

  // useEffect(() => {
  //   console.log("pots");
  //   fetchPots();
  // }, []);

  const handleContinue = async () => {
    if (!typeName || !wateringFrequency || !dosage) {
      toast.error("Please fill in all fields.");
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
      setTypeName("");
      setWateringFrequency("");
      setDosage("");
      setOpenNewType(false);
    } catch (err) {
      toast.error("Failed to add plant type");
    }
  };

  const handleCancel = () => {
    setOpenNewType(false);
  };

  const handleDelete = async () => {
    const { success, error } = await deleteEnvironment(environmentID);
    if (!success) {
      toast.error(error || "Failed to delete environment");
    } else {
      toast.success("Environment deleted");
      navigate("/");
    }
  };

  const handleDeleteEnvironment = async () => {
    if (window.confirm("Are you sure you want to delete this environment?")) {
      await handleDelete();
    }
  };

  return (
  <StyledMyPlantsContainer>
    
      <Title>My Plants - {environmentName}</Title>
  <Flex $width="70%" $justifyC="space-between" $gap="1rem" style={{ flexWrap: "wrap" }}>
    {isOwner && (
      <StyledButtonContainer>
        <Button onClick={() => navigate(`/assistants`)}>
          Manage Assistants
        </Button>
      </StyledButtonContainer>
    )}
    {isOwner && (
      <StyledButtonContainer>
        <Button onClick={() => setOpenNewType(true)}>Add new type</Button>
      </StyledButtonContainer>
    )}
    {openNewType && (
      <AddPlantTypeModal
        typeName={typeName}
        setTypeName={setTypeName}
        wateringFrequency={wateringFrequency}
        setWateringFrequency={setWateringFrequency}
        dosage={dosage}
        setDosage={setDosage}
        error={""}
        handleContinue={handleContinue}
        handleCancel={handleCancel}
      />
    )}
    {isOwner && (
     
        <StyledButtonContainer>
          <DeleteButton onClick={handleDeleteEnvironment}>
            Delete
          </DeleteButton>
        </StyledButtonContainer>
      
    )}
  </Flex>
      {types.map((plant: PlantType, index: number) => {
        const filteredPots = pots.filter(
          (pot) => pot.plant_type_id === plant._id
        );

        return (
          <PlantTypeRow
            key={index}
            plant={plant}
            pots={filteredPots.map((pot) => ({
              id: pot.pot_id,
              potName: pot.label,
            }))}
          />
        );
      })}
      {(loadingTypes || loadingPots) && (
        <Overlay>
          <CircularProgress size={80} />
        </Overlay>
      )}
    </StyledMyPlantsContainer>
  );
};

export default MyPlants;
