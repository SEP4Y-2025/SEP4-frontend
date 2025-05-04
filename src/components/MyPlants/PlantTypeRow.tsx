import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PotCard from "./PotCard";
import { PlantType} from "../../types";



export interface PlantTypeRowProps {
  plant: PlantType;
  plants: {id: string, plantName: string }[]; 
}

const PlantTypeRow: React.FC<PlantTypeRowProps> = ({ plant, plants}) => {
  const navigate = useNavigate();

  return (
    <div className="plant-type-section">
      <div className="plant-type-title">
        Type: {plant.typeName} ({plant.wateringFrequency}x/week, {plant.dosage}ml)
      </div>
      <div className="plant-box">
      <div className="plants-list">
          {plants.map((plant, index) => (
          <PotCard key={index} id={plant.id} plantName={plant.plantName} />
          ))}
        </div>
        <div className="add-pot-container">
          <button className="add-pot-button" onClick={() =>
            navigate(`/addplant/${plant.typeName}`)
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