
import React, { useState } from "react";
import "./PlantDetails.css";

interface PlantDetailsProps {
  plantName: string;
  typeName: string;
  wateringFrequency: number;
  dosage: number;
  onClose: () => void;
  onDelete: () => void;
}

const PlantDetails: React.FC<PlantDetailsProps> = ({
  plantName,
  typeName,
  wateringFrequency,
  dosage,
  onClose,
  onDelete
}) => {
  const [name, setName] = useState(plantName);

  return (
    <div className="modal-overlay">
      <div className="top-bar">
        <div className="logo-container">
         
        </div>
      </div>

      <div className="modal-content">
        <div className="modal-header">
          <h2>Plant Details</h2>
        </div>

        <div className="details-container">
          <div className="gear-icon-container">
            <div className="gear-icon">⚙️</div>
          </div>
          
          <div className="details-row">
            <div className="details-label">Name</div>
            <div className="details-value">Green Pot</div>
          </div>

          <div className="details-row">
            <div className="details-label">Type Details</div>
            <div className="details-value type-display">
              Watermelon <span>▼</span>
            </div>
          </div>

          <div className="details-row">
            <div className="details-label">Watering Frequency</div>
            <div className="details-value">2</div>
          </div>

          <div className="details-row">
            <div className="details-label">Dosage ml</div>
            <div className="details-value">300</div>
          </div>
        </div>

        <div className="footer-buttons">
          <button className="delete-button" onClick={onClose}>
            Save
          </button>
          <button className="delete-button" onClick={onDelete}>
            Delete Plant
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;