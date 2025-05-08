import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { addPotToPlantType } from "../services/plantPotsRepo";
import "./AddPlant.css";

const AddPlant: React.FC = () => {
  const { typeName } = useParams<{ typeName: string }>();
  const navigate = useNavigate();
  
  const [plantName, setPlantName] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    
    if (!plantName.trim()) {
      setError("Please enter a plant name");
      return;
    }
    // await addPotToPlantType(typeName || "", plantName);

    // Navigate back to MyPlants page
    navigate("/plants");
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="add-plant-modal">
      <div className="modal-content">
        <div className="modal-header">
          <span role="img" aria-label="leaf">🌿</span>
          <h2>Add new Plant</h2>
        </div>

        <div className="modal-body">
          <div className="input-group">
            <label>Name</label>
            <input
              className="input"
              placeholder="Enter plant name"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Type</label>
            <div className="type-display">{typeName}</div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-footer">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlant;