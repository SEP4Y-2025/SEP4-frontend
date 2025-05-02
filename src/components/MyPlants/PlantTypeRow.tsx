// components/MyPlants/PlantTypeRow.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PotCard from "./PotCard";

interface PlantType {
  typeName: string;
  wateringFrequency: number;
  dosage: number;
}

interface PlantTypeRowProps {
  plant: PlantType;
  plants: { plantName: string }[];
  onSelectPlant: (typeName: string, plantName: string) => void;
}

const PlantTypeRow: React.FC<PlantTypeRowProps> = ({ 
  plant, 
  plants, 
  onSelectPlant 
}) => {
  const navigate = useNavigate();

  return (
    <div className="plant-type-section">
      <div className="plant-type-title">
        Type: {plant.typeName} ({plant.wateringFrequency}x/week, {plant.dosage}ml)
      </div>
      <div className="plant-box">
        <div className="plants-list">
          {plants.map((pot, index) => (
            <PotCard 
              key={index} 
              plantName={pot.plantName} 
              onClick={() => onSelectPlant(plant.typeName, pot.plantName)}
            />
          ))}
        </div>
        <div className="add-pot-container">
          <button 
            className="add-pot-button" 
            onClick={() => navigate(`/addplant/${plant.typeName}`)}
          >
            +
          </button>
          <div className="add-pot-text">New</div>
        </div>
      </div>
    </div>
  );
};

export default PlantTypeRow;