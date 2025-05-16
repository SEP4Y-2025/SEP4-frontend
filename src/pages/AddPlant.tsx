import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AddPlantPotRequest } from "../types/addPlantPotApiTypes";
import "./AddPlant.css";
import { useAddPlantPot } from "../hooks/useAddPlantPot";
import { toast } from "react-toastify";
import { StyledAddPlantModal, StyledInputGroup, StyledModalBody, StyledModalContent, StyledModalFooter, StyledModalHeader } from "../Styles/pages/AddPlant.style";

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
  const { addPlantPot } = useAddPlantPot();

  const handleSave = async () => {
    if (!plantName.trim() || !potId.trim()) {
      toast.error("Please fill in all fields");
      return;
    }


    try {
      const request: AddPlantPotRequest = {
        pot_id: potId,
        plant_pot_label: plantName,
        plant_type_id: plantTypeId!,
      };

      await addPlantPot(request);
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
    <StyledAddPlantModal>
      <StyledModalContent>
        <StyledModalHeader>
          <span role="img" aria-label="leaf">
            🌿
          </span>
          <h2>Add New Plant</h2>
        </StyledModalHeader>

        <StyledModalBody>
          <StyledInputGroup>
            <label>Device ID</label>
            <input
              className="input"
              placeholder="Enter device ID"
              value={potId}
              onChange={(e) => setPotId(e.target.value)}
            />
          </StyledInputGroup>

          <StyledInputGroup>
            <label>Name</label>
            <input
              className="input"
              placeholder="Enter plant name"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
            />
          </StyledInputGroup>

          <StyledInputGroup>
            <label>Type</label>
            <div className="type-display">{typeName}</div>
          </StyledInputGroup>

          {error && <div className="error-message">{error}</div>}

          <StyledModalFooter>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </StyledModalFooter>
        </StyledModalBody>
      </StyledModalContent>
    </StyledAddPlantModal>
  );
};

export default AddPlant;
