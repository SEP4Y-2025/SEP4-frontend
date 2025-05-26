import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../Styles/common/Button.style";
import { Title } from "../../Styles/common/Title.style";
import { Input } from "../../Styles/common/Input.style";
import { Modal } from "../../Styles/modal/Modal.style";
import { Overlay } from "../../Styles/modal/Overlay.style";
import { Flex } from "../../Styles/common/Flex";
import { ErrorLabel } from "../../Styles/common/ErrorLabel";
import { TextFields } from "../../Styles/common/TextFields.style";  
import { toast } from "react-toastify";

interface AddEnvironmentModalProps {
    onClose: () => void;
    onSubmit: (name: string) => void;
}

const AddEnvironmentModal: React.FC<AddEnvironmentModalProps> = ({ onClose, onSubmit }) => {
    const [name, setName] = useState("");

    const handleSubmit = () => {
        if (!name.trim()) {
            toast.error("Environment name is required.");
            return;
        }
        
        onSubmit(name.trim());
    };

    return (
        <Overlay>
            <Modal>
                <Title>Add Environment</Title>
                <TextFields>
                    <Input
                        type="text"
                        placeholder="Environment Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </TextFields>
                <TextFields>
                    <Flex $dir="flex-end" $justifyC="center" $gap="1rem">
                        <Button onClick={handleSubmit}>Add</Button>
                        <Button onClick={onClose} $variant="cancel">Cancel</Button>
                    </Flex>
                </TextFields>
            </Modal>
        </Overlay>
    );
};

export default AddEnvironmentModal;
