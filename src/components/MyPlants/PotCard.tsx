import React from "react";
import { useNavigate } from "react-router-dom";
import Pot from "../../assets/PotIcon.svg";
import { StyledPot } from "../../Styles/pages/MyPlants.style";
import Icon from "../common/Icon";



interface PotCardProps {
    id: string;
    plantName: string;
    onClick?: () => void;
}

const PotCard: React.FC<PotCardProps> = ({ id, plantName }) => {
    const navigate = useNavigate();
    return (
        <StyledPot onClick={() => navigate(`/plant-details/${id}`, {

        })}>
            <Icon source={Pot} summary="Plant Icon" />
            {plantName}
        </StyledPot>
    );
};

export default PotCard;