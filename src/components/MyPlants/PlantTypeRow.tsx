import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PotCard from "./PotCard";
import { PlantType } from "../../types";

import { useEnvironmentCtx } from "../../contexts/EnvironmentContext";
import { Flex } from "../../Styles/common/Flex";
import { StyledRow } from "../../Styles/pages/MyPlants.style";

export interface PlantTypeRowProps {
  plant: PlantType;
  pots: { id: string; potName: string }[];
}

const PlantTypeRow: React.FC<PlantTypeRowProps> = ({ plant, pots }) => {
  const navigate = useNavigate();
  const{isOwner} = useEnvironmentCtx();

  return (
    <Flex $dir="column" $alignI="center">
      <Flex>
        Type: {plant.name} ({plant.watering_frequency}x/week, {plant.water_dosage}
        ml)
      </Flex>
      <Flex
        $dir="row"
        $justifyC="space-between"
        $alignI="center"
        $background="#f2fdf8"
      >
        <StyledRow>
          {pots.map((pot, index) => (  // Changed from 'plant' to 'pot'
            <PotCard key={index} id={pot.id} plantName={pot.potName} />
          ))}
        </StyledRow>
        {isOwner && <i
          className="bi bi-plus-circle"
          role="button"
          aria-label="Add plant"
          onClick={() => navigate(`/addplant/${plant.name}`)}
        ></i>}
      </Flex>
    </Flex>
  );
};

export default PlantTypeRow;