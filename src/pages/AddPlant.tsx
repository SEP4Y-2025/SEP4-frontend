import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addPlantPot } from "../services/plantPotsApi";
import { AddPlantPotRequest } from "../types/addPlantPotApiTypes";
import "./AddPlant.css";

const AddPlant: React.FC = () => {
  const { environmentId, plantTypeId, typeName } = useParams<{
    environmentId: string;
    plantTypeId: string;
    typeName: string;
  }>();

  const navigate = useNavigate();
  const [plantName, setPlantName] = useState("");
  const [potId, setPotId] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!plantName.trim() || !potId.trim()) {
      setError("Please enter both plant name and pot ID");
      return;
    }

    try {
      const request: AddPlantPotRequest = {
        pot_id: potId,
        plant_pot_label: plantName,
        plant_type_id: plantTypeId!,
      };

      await addPlantPot(environmentId!, request);
      navigate("/plants");
    } catch (e: any) {
      console.error(e);
      setError("Failed to add plant. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="add-plant-modal">
      <div className="modal-content">
        <div className="modal-header">
          <span role="img" aria-label="leaf">🌿</span>
          <h2>Add New Plant</h2>
        </div>

        <div className="modal-body">
          <div className="input-group">
            <label>Arduino ID</label>
            <input
              className="input"
              placeholder="Enter arduino ID"
              value={potId}
              onChange={(e) => setPotId(e.target.value)}
            />
          </div>

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
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlant;
