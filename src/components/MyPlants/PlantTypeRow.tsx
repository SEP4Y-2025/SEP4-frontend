import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PotCard from "./PotCard";
import { PlantType } from "../../types";

import { useEnvironmentCtx } from "../../contexts/EnvironmentContext";
import { Flex } from "../../Styles/common/Flex";
import { StyledRow } from "../../Styles/pages/MyPlants.style";
import AddPlantTypeModal from "./AddPlantTypeModal";
import settingIcon from "../../assets/Setting.png";

export interface PlantTypeRowProps {
  plant: PlantType;
  pots: { id: string; potName: string }[];
}

const PlantTypeRow: React.FC<PlantTypeRowProps> = ({ plant, pots }) => {
  const navigate = useNavigate();
  const { isOwner } = useEnvironmentCtx();

  const [editOpen, setEditOpen] = useState(false);
  const [typeName, setTypeName] = useState(plant.name);
  const [wateringFrequency, setWateringFrequency] = useState(
    plant.watering_frequency.toString()
  );
  const [dosage, setDosage] = useState(plant.water_dosage.toString());

  const handleEditSave = () => {
    setEditOpen(false);
  };

  return (
    <Flex $dir="column" $alignI="center">
      <Flex $gap="0.5rem" $alignI="center">
        <span>
          Type: {plant.name} ({plant.watering_frequency}x/week,{" "}
          {plant.water_dosage}ml)
        </span>
        {isOwner && (
          <img
            src={settingIcon}
            alt="Edit plant type"
            title="Edit plant type"
            role="button"
            onClick={() => setEditOpen(true)}
            style={{
              cursor: "pointer",
              width: "20px",
              height: "20px",
              marginLeft: "0.3rem",
              marginBottom: "0.2rem",
            }}
          />
        )}
      </Flex>

      <Flex
        $dir="row"
        $justifyC="space-between"
        $alignI="center"
        $background="#f2fdf8"
      >
        <StyledRow>
          {pots.map((pot, index) => (
            <PotCard key={index} id={pot.id} plantName={pot.potName} />
          ))}
        </StyledRow>

        {isOwner && (
          <i
            className="bi bi-plus-circle"
            role="button"
            aria-label="Add plant"
            onClick={() => navigate(`/addplant/${plant.name}`)}
          ></i>
        )}
      </Flex>

      {editOpen && (
        <AddPlantTypeModal
          typeName={typeName}
          setTypeName={setTypeName}
          wateringFrequency={wateringFrequency}
          setWateringFrequency={setWateringFrequency}
          dosage={dosage}
          setDosage={setDosage}
          error=""
          handleContinue={handleEditSave}
          handleCancel={() => setEditOpen(false)}
        />
      )}
    </Flex>
  );
};

export default PlantTypeRow;
