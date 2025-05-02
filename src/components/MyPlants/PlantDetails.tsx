// components/MyPlants/PlantDetails.tsx
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
      <div className="modal-content">
        <div className="modal-header">
          <span role="img" aria-label="leaf">
            🌿
          </span>
          <h2>Plant Details</h2>
        </div>

        <div className="modal-body">
          <div className="input-group">
            <label>Name</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Type Details</label>
            <div className="type-display">
              {typeName} <span>▼</span>
            </div>
          </div>

          <div className="input-group">
            <label>Watering Frequency</label>
            <div className="type-display">{wateringFrequency}</div>
          </div>

          <div className="input-group">
            <label>Dosage ml</label>
            <div className="type-display">{dosage}</div>
          </div>

          <div className="modal-footer">
            <button className="delete-button" onClick={onDelete}>
              Delete Plant
            </button>
            <button className="save-button" onClick={onClose}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;