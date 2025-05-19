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

import AddAssistantModal from "../components/MyPlants/AddAssistantModal";
import { useGetPotsByEnvironment } from "../hooks/useGetPotsByEnvironment";
import { useGetTypesByEnvironment } from "../hooks/useGetTypesByEnvironment";

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
      console.log("DEEELL");
    }
  };

  return (
    <StyledMyPlantsContainer>
      <h1 className="title">My Plants - {environmentName}</h1>
      <Flex $width="55rem" $justifyC="start" $gap="1rem">
        {isOwner && (
          <Button onClick={() => navigate(`/loremIpsum`)}>
            Manage Assistants
          </Button>
        )}
        {isOwner && (
          <Button onClick={() => setOpenNewType(true)}>Add new type</Button>
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
          <Flex $width="100%" $justifyC="end">
            <DeleteButton onClick={handleDeleteEnvironment}>
              Delete
            </DeleteButton>
          </Flex>
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
    </StyledMyPlantsContainer>
  );
};

export default MyPlants;
