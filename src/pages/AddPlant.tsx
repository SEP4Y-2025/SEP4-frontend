import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTypesByEnvironment } from "../hooks/useGetTypesByEnvironment";
import { useEffect } from "react";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { AddPlantPotRequest } from "../types/addPlantPotApiTypes";
import "./AddPlant.css";
import { useAddPlantPot } from "../hooks/useAddPlantPot";
import { toast } from "react-toastify";
import { StyledAddPlantModal, StyledInputGroup, StyledModalBody, StyledModalContent, StyledModalFooter, StyledModalHeader } from "../Styles/pages/AddPlant.style";

const AddPlant: React.FC = () => {
  const { typeName } = useParams<{
    typeName: string;
  }>();
  const {environmentID} = useEnvironmentCtx();
  
  const { types} = useGetTypesByEnvironment(environmentID);
  const plantTypeId = types.find((type) => type.name === typeName)?._id ?? "";
  
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
        plant_type_id: plantTypeId,
      };
      console.log("Request payload:", request);
      await addPlantPot(environmentID, request);
      toast.success("Plant added successfully");
      navigate("/plants");
    } catch (e: any) {
    console.error("Add plant error:", e.message);

    if (e.message.includes("Timeout waiting for Arduino response")) {
      toast.error("Failed to connect to Arduino. Make sure it's connected.");
    } 
    else if(e.message.includes("Unknown or unregistered Arduino")) {
      toast.error("Unregistered Arduino. Please register it first.");
    }
      else {
      toast.error(e.message || "Failed to add plant. Please try again.");
    }

    //setError(e.message);
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
              onChange={(e) => setPotId(e.target.value)
               
              }
            />
          </StyledInputGroup>

          <StyledInputGroup>
            <label>Name</label>
            <input
              className="input"
              placeholder="Enter plant name"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)
            }
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
