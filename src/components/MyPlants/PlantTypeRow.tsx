import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PotCard from "./PotCard";
import { PlantType} from "../../types";



export interface PlantTypeRowProps {
  plant: PlantType;
  pots: {id: string, potName: string }[]; 
}

const PlantTypeRow: React.FC<PlantTypeRowProps> = ({ plant, pots}) => {
  const navigate = useNavigate();

  return (
    <div className="plant-type-section">
      <div className="plant-type-title">
        Type: {plant.name} ({plant.water_frequency}x/week, {plant.water_dosage}ml)
      </div>
      <div className="plant-box">
      <div className="plants-list">
          {pots.map((plant, index) => (
          <PotCard key={index} id={plant.id} plantName={plant.potName} />
          ))}
        </div>
        <div className="add-pot-container">
          <button className="add-pot-button" onClick={() =>
            navigate(`/addplant/${plant.name}`)
          }>
            +
          </button>
          <div className="add-pot-text">New</div>
        </div>
      </div>
    </div>
  );
};

export default PlantTypeRow;