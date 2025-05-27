import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTypesByEnvironment } from "../hooks/pots/useGetTypesByEnvironment";
import { useEffect } from "react";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { AddPlantPotRequest } from "../types/addPlantPotApiTypes";
import { useAddPlantPot } from "../hooks/pots/useAddPlantPot";
import { toast } from "react-toastify";
import { StyledAddPlantModal, StyledInputGroup, StyledModalBody,
   StyledModalContent, StyledModalFooter, StyledModalHeader,Label,  FormTitle
  } from "../Styles/pages/AddPlant.style";
import { Overlay } from "../Styles/modal/Overlay.style";
import { CircularProgress } from "@mui/material";
import { ErrorLabel } from "../Styles/common/ErrorLabel";
import { Button } from "../Styles/common/Button.style";
import plant1 from "../assets/plant1.png";
import { Input } from "../Styles/common/Input.style";
import {Flex} from "../Styles/common/Flex";

const AddPlant: React.FC = () => {
  const { typeName } = useParams<{
    typeName: string;
  }>();
  const { environmentID } = useEnvironmentCtx();

  const { types } = useGetTypesByEnvironment(environmentID);
  const plantTypeId = types.find((type) => type.name === typeName)?._id ?? "";

  const navigate = useNavigate();
  const [plantName, setPlantName] = useState("");
  const [potId, setPotId] = useState("");
  const [error, setError] = useState("");
  const { addPlantPot, loading } = useAddPlantPot();

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
      await addPlantPot(environmentID, request);
      toast.success("Plant added successfully");
      navigate("/plants");
    } catch (e: any) {
      console.error("Add plant error:", e.message);

      if (e.message.includes("Timeout waiting for Arduino response")) {
        toast.error("Failed to connect to Arduino. Make sure it's connected.");
      }
      else if (e.message.includes("Unknown or unregistered Arduino")) {
        toast.error("Unregistered Arduino. Please register it first.");
      }
      else {
        toast.error("Failed to add plant. Please try again.");
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
    
        <img src={plant1} alt="leaf icon" width="40" height="40" />
        <FormTitle>Add new plant</FormTitle>
      
        </StyledModalHeader>

        <StyledModalBody>
          <Flex $dir="column" $gap="1rem" $overflow="visible" $colour="green">
          
            <Label>Device ID</Label>
            <Input
              className="input"
              placeholder="Enter device ID"
              value={potId}
              onChange={(e) => setPotId(e.target.value)

              }
            />
          </Flex>

        <Flex $dir="column" $gap="1rem" $overflow="visible" $colour="green">
          
            <Label>Name</Label>
            <Input
              className="input"
              placeholder="Enter plant name"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)
              }
            />
          </Flex>

          <Flex $dir="column" $gap="1rem" $overflow="visible" $colour="green">
            <Label>Type</Label>
          </Flex>
          <StyledInputGroup>
            <div className="type-display">{typeName}</div>
          </StyledInputGroup>

          {error && <ErrorLabel className="error-message">{error}</ErrorLabel>}

          <StyledModalFooter>
            <Button $variant="cancel" className="cancel-button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="save-button" onClick={handleSave}>
              Save
            </Button>
          </StyledModalFooter>
          {loading && (
            <Overlay>
              <CircularProgress size={80} />
            </Overlay>
          )}
        </StyledModalBody>
      </StyledModalContent>
    </StyledAddPlantModal>
  );
};

export default AddPlant;
