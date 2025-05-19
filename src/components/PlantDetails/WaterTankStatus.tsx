import React from "react";
import {
    StyledDetailsCard,
    StyledDetailRow,
    StyledWaterTankVisual,
    StyledWaterTankContainer,
    StyledWaterTankLevel,
    StyledWaterTankPercentage,
    StyledTankLabels,
} from "../../Styles/pages/PlantDetails.style";

interface WaterTankStatusProps {
    waterLevel: number;
    waterCapacity: number;
    waterStatus: string;
    waterPercentage: number;
}

const WaterTankStatus: React.FC<WaterTankStatusProps> = ({
    waterLevel,
    waterCapacity,
    waterStatus,
    waterPercentage,
}) => (
    <StyledDetailsCard>
        <h2>Water Tank Status</h2>

        <StyledDetailRow>
            <span className="detail-label">Current Level</span>
            <span className="detail-value">{waterLevel} ml</span>
        </StyledDetailRow>

        <StyledDetailRow>
            <span className="detail-label">Total Capacity</span>
            <span className="detail-value">{waterCapacity} ml</span>
        </StyledDetailRow>

        <StyledDetailRow>
            <span className="detail-label">Status</span>
            <span className="detail-value">{waterStatus}</span>
        </StyledDetailRow>

        <StyledWaterTankVisual>
            <StyledWaterTankContainer>
                <StyledWaterTankLevel $waterPercentage={waterPercentage} />
            </StyledWaterTankContainer>
            <StyledWaterTankPercentage>
                {waterPercentage}%
            </StyledWaterTankPercentage>
            <StyledTankLabels>
                <span>0 ml</span>
                <span>{waterCapacity} ml</span>
            </StyledTankLabels>
        </StyledWaterTankVisual>
    </StyledDetailsCard>
);

export default WaterTankStatus;