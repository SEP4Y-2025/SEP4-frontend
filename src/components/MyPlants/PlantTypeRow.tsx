import React from "react";

interface PlantType {
  typeName: string;
  wateringFrequency: number;
  dosage: number;
}

interface PlantTypeSectionProps {
  plant: PlantType;
}

const PlantTypeSection: React.FC<PlantTypeSectionProps> = ({ plant }) => {
  return (
    <div className="plant-type-section">
      <div className="plant-type-title">
        Type: {plant.typeName} ({plant.wateringFrequency}x/week, {plant.dosage}ml)
      </div>
      <div className="plant-box">
        <div className="add-pot-container">
          <button className="add-pot-button">+</button>
          <div className="add-pot-text">New</div>
        </div>
      </div>
    </div>
  );
};

export default PlantTypeSection;