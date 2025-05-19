import React from "react";
import { Flex } from "../../Styles/common/Flex";
import {
    StyledSaveButton,
    StyledDeleteButton,
} from "../../Styles/pages/PlantDetails.style";

interface ActionButtonsProps {
    onSave: () => void;
    onDelete: () => void;
    isDeleting: boolean;
    potLabel: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    onSave,
    onDelete,
    isDeleting,
    potLabel,
}) => (
    <Flex $justifyC="center" $gap="20px" $width="600px" $margin="40px auto 0">
        <StyledSaveButton onClick={onSave}>Go Back</StyledSaveButton>
        <StyledDeleteButton onClick={onDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : `Delete ${potLabel}`}
        </StyledDeleteButton>
    </Flex>
);

export default ActionButtons;