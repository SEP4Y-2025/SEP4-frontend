import React from "react";
import { PlantType, Pot } from "../../types";
import { StyledDetailsCard, StyledDetailRow } from "../../Styles/pages/PlantDetails.style";

interface PlantInfoCardProps {
    pot: Pot;
    type: PlantType;
}

const PlantInfoCard: React.FC<PlantInfoCardProps> = ({ pot, type }) => (
    <StyledDetailsCard>
        <StyledDetailRow>
            <span>Name</span>
            <span>{pot.label}</span>
        </StyledDetailRow>
        <StyledDetailRow>
            <span>Type Details</span>
            <span>{type.name} ▼</span>
        </StyledDetailRow>
        <StyledDetailRow>
            <span>Watering Frequency</span>
            <span>
                {type.watering_frequency || "Not specified"}
            </span>
        </StyledDetailRow>
        <StyledDetailRow>
            <span>Dosage ml</span>
            <span>{type.water_dosage}</span>
        </StyledDetailRow>
    </StyledDetailsCard>
);

export default PlantInfoCard;