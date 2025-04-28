import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddPlant.css";

const AddPlant: React.FC = () => {
  const { typeName } = useParams<{ typeName: string }>();
  const navigate = useNavigate();
  
  const [potName, setPotName] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!potName.trim()) {
      setError("Please enter the pot name");
      return;
    }
    
    // Get existing pots
    const existingPots = JSON.parse(localStorage.getItem("plantPots") || "[]");
    
    // Create new pot
    const newPot = {
      id: `pot${Date.now()}`, // Generate a unique ID
      label: potName,
      typeName: typeName,
      lastWatering: new Date().toISOString(),
      soilHumidity: Math.floor(Math.random() * (80 - 40) + 40), // Random value between 40-80%
    };
    
    // Add the new pot and save to localStorage
    existingPots.push(newPot);
    localStorage.setItem("plantPots", JSON.stringify(existingPots));
    
    // Navigate back to the plants page
    navigate("/plants");
  };

  return (
    <div className="add-plant-container">
      <div className="add-plant-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span role="img" aria-label="back">⬅️</span>
        </button>
        <div className="header-content">
          <span className="plant-icon" role="img" aria-label="leaf">🌿</span>
          <h2>Add New Plant</h2>
        </div>
      </div>

      <div className="input-section">
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter pot name"
            value={potName}
            onChange={(e) => setPotName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Type</label>
          <input
            type="text"
            className="input-field disabled"
            value={typeName}
            disabled
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          <button className="cancel-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlant;