import React from "react";
import { StyledTypeContent } from "../../Styles/pages/MyPlants.style";
import { Flex } from "../../Styles/common/Flex";
import { Input } from "../../Styles/common/Input.style";
import { ErrorLabel } from "../../Styles/common/ErrorLabel";
import { Button } from "../../Styles/common/Button.style";
import plant1 from "../../assets/plant1.png";
import {
  Label,
  FormTitle,
  SectionHeader,
} from "../../Styles/pages/addPlantType.style";

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
      <SectionHeader>
        <img src={plant1} alt="leaf icon" width="40" height="40" />
        <FormTitle>Add new Type</FormTitle>
      </SectionHeader>

        <Flex $dir="column" $gap="2rem" $overflow="visible" $colour="green">
          <Flex $dir="column" $gap="0.3rem" $colour="green">
            <Label htmlFor="type-name-input">Type</Label>
            <Input
              id="type-name-input"
              $width="100%"
              $border="2px solid #ccc"
              $padding="0.5rem"
              $borderR="0.5rem"
              placeholder="Type name"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
            />
        </Flex>
          <Flex $justifyC="space-between" >
            <Flex $dir="column" $alignI="center" $colour="green">
              <Label htmlFor="water-frequency-input">Watering frequency</Label>
              <Flex $alignI="center" $justifyC="center">
                <Input
                  id="water-frequency-input"
                  $width="80px"
                  $border="2px solid #ccc"
                  $padding="0.5rem"
                  $borderR="0.5rem"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={wateringFrequency}
                  onChange={(e) => setWateringFrequency(e.target.value)}
                />
                <span className="unit-text">once/x hours</span>
              </Flex>
            </Flex>

            <Flex $dir="column" $alignI="center" $colour="green">
              <Label htmlFor="dosage-input">Dosage</Label>
              <Flex $alignI="center" $justifyC="center">
                <Input
                  id="dosage-input"
                  $width="80px"
                  $border="2px solid #ccc"
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

          {error && (
            <ErrorLabel>
              {error}
            </ErrorLabel>
          )}

          <Flex $justifyC="space-between" $margin="1rem">
            <Button $variant="cancel" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleContinue}>
              Continue
            </Button>
          </Flex>
        </Flex>
      </StyledTypeContent>
    </div>
  );
};

export default AddPlantModal;
