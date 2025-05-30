import React, { useState } from "react";
import styled from "styled-components";
import { Overlay } from "../../Styles/modal/Overlay.style";
import { Title } from "../../Styles/common/Title.style";
import { Input } from "../../Styles/common/Input.style";
import { Modal } from "../../Styles/modal/Modal.style";
import { ErrorLabel } from "../../Styles/common/ErrorLabel";
import { Button } from "../../Styles/common/Button.style";
import { Flex } from "../../Styles/common/Flex";
import { useInvitePlantAssistant } from "../../hooks/useInviteAssistant";
import { useEnvironmentCtx } from "../../contexts/EnvironmentContext";

interface AddAssistantModalProps {
    onClose: () => void;
}

const AddAssistantModal: React.FC<AddAssistantModalProps> = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const { invite, errorOnInvite } = useInvitePlantAssistant();
    const { environmentID } = useEnvironmentCtx();

    const handleSubmit = async () => {
        if (!email.trim()) {
            setError("Email is required.");
            return;
        }
        setError("");
        await invite(environmentID, email);
    };

    React.useEffect(() => {
        if (errorOnInvite) {
            setError(errorOnInvite);
        } else if (errorOnInvite === null) {
            // If invite was successful, close modal
            onClose();
        }
    }, [errorOnInvite, onClose]);

    return (
        <Overlay>
            <Modal>
                <Title>Add Assistant</Title>
                {error && <ErrorLabel>{error}</ErrorLabel>}
                <Input
                    type="email"
                    placeholder="Assistant Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Flex $justifyC="flex-end" $alignI="center" $gap="1rem">
                    <Button onClick={handleSubmit}>Add</Button>
                    <Button onClick={onClose} $variant="cancel">Cancel</Button>
                </Flex>
            </Modal>
        </Overlay>
    );
};

export default AddAssistantModal;
