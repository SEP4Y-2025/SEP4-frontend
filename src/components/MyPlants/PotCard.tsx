import React from "react";
import { useNavigate } from "react-router-dom";
import Pot from "../../assets/pot.svg";
import "./PotCard.css";
import { StyledPot } from "../../Styles/MyPlants.style";
import Icon from "../common/Icon";

interface PotCardProps {
  id: string;
  plantName: string;
  onClick?: () => void;
}

const PotCard: React.FC<PotCardProps> = ({ id, plantName }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log('PotCard clicked with id:', id); // Debug log
    navigate(`/plant-details/${id}`);
  };

  return (
    <StyledPot onClick={handleClick}>
      <Icon source={Pot} summary="Plant Icon" />
      {plantName}
    </StyledPot>
  );
};

export default PotCard;