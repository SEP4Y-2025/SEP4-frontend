import React, { useState } from "react";
import styled from "styled-components";
import { Overlay } from "../../Styles/modal/Overlay.style";
import { Title } from "../../Styles/common/Title.style";
import { Input } from "../../Styles/common/Input.style";
import { Modal } from "../../Styles/modal/Modal.style";
import { ErrorLabel } from "../../Styles/common/ErrorLabel";
import { Button } from "../../Styles/common/Button.style";
import { Flex } from "../../Styles/common/Flex";
import { useInviteAssistants } from "../../hooks/users/useInviteAssistant";
import { useEnvironmentCtx } from "../../contexts/EnvironmentContext";
import { toast } from "react-toastify";
import { TextFields } from "../../Styles/common/TextFields.style";

interface AddAssistantModalProps {
  onClose: () => void;
}

const AddAssistantModal: React.FC<AddAssistantModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const { invite } = useInviteAssistants();
  const { environmentID } = useEnvironmentCtx();

  const handleSubmit = async () => {
    if (!email.trim()) {
     toast.error("Please input an email address.");
    return;
    }
    const { success, error } = await invite(environmentID, email, onClose);
    if (!success) {
      toast.error(error || "Failed to delete environment.");
    } else {
      toast.success("Assistant added successfully.");
    }
  };

  return (
    <Overlay>
      <Modal>
        <Title>Add Assistant</Title>
        <TextFields>
          <Input
            type="email"
            placeholder="Assistant Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </TextFields>
        <Flex $justifyC="center" $alignI="center" $gap="1rem">
          <Button onClick={handleSubmit}>Add</Button>
          <Button onClick={onClose} $variant="cancel">
            Cancel
          </Button>
        </Flex>
      </Modal>
    </Overlay>
  );
};

export default AddAssistantModal;
