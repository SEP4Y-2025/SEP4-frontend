// components/MyPlants/PotCard.tsx
import React from "react";
import Pot from "../../assets/pot.svg";
import "./PotCard.css";

interface PotCardProps {
  plantName: string;
  onClick?: () => void;
}

const PotCard: React.FC<PotCardProps> = ({ plantName, onClick }) => {
  return (
    <button className="pot-card" onClick={onClick}>
      <img src={Pot} alt="Plant Icon" className="pot-icon" />
      <div className="pot-name">{plantName}</div>
    </button>
  );
};

export default PotCard;