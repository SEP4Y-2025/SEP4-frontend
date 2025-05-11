import React from "react";
import { StyledTypeContent } from "../../Styles/MyPlants.style";
import { Flex } from "../../Styles/Flex";
import { Input } from "../../Styles/Input.style";
import { ErrorLabel } from "../../Styles/ErrorLabel";

interface AddPlantModalProps {
  typeName: string;
  setTypeName: (value: string) => void;
  wateringFrequency: string;
  setWateringFrequency: (value: string) => void;
  dosage: string;
  setDosage: (value: string) => void;
  error: string;
  handleContinue: () => void;
  handleCancel: () => void;
}

const AddPlantModal: React.FC<AddPlantModalProps> = ({
  typeName,
  setTypeName,
  wateringFrequency,
  setWateringFrequency,
  dosage,
  setDosage,
  error,
  handleContinue,
  handleCancel,
}) => {
  return (
    <div className="modal-overlay">
      <StyledTypeContent>
        <Flex
          $background="#f1f8e9"
          $alignI="center"
          $gap="0.5rem"
          $colour="black"
        >
          <span role="img" aria-label="leaf">
            🌿
          </span>
          <h2>Add new type</h2>
        </Flex>

        <Flex $dir="column" $gap="1rem" $overflow="visible" $colour="green">
          <label htmlFor="type-name-input">Type</label>
          <Input
            id="type-name-input"
            $width="100%"
            $border="1px solid #ccc"
            $padding="0.5rem"
            $borderR="0.5rem"
            placeholder="Type name"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
          />

          <Flex $justifyC="space-between" >
            <Flex $dir="column" $alignI="center" $colour="green">
              <label  htmlFor="water-frequency-input">Watering frequency</label>
              <Flex $alignI="center" $justifyC="center">
                <Input
                  id="water-frequency-input"
                  $width="80px"
                  $border="1px solid #ccc"
                  $padding="0.5rem"
                  $borderR="0.5rem"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={wateringFrequency}
                  onChange={(e) => setWateringFrequency(e.target.value)}
                />
                <span className="unit-text">times/week</span>
              </Flex>
            </Flex>

            <Flex $dir="column" $alignI="center" $colour="green">
              <label htmlFor="dosage-input">Dosage</label>
              <Flex $alignI="center" $justifyC="center">
                <Input
                  id="dosage-input"
                  $width="80px"
                  $border="1px solid #ccc"
                  $padding="0.5rem"
                  $borderR="0.5rem"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                />
                <span className="unit-text">ml</span>
              </Flex>
            </Flex>
          </Flex>

          {true && (
            <ErrorLabel>
              {error}
            </ErrorLabel>
          )}

          <Flex $justifyC="space-between" $margin="1rem">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="continue-button" onClick={handleContinue}>
              Continue
            </button>
          </Flex>
        </Flex>
      </StyledTypeContent>
    </div>
  );
};

export default AddPlantModal;
