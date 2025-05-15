import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../Styles/common/Button.style";
import { Label } from "../../Styles/common/Label.style";
import { ErrorLabel } from "../../Styles/common/ErrorLabel";
import { Title } from "../../Styles/common/Title.style";
import { Input } from "../../Styles/common/Input.style";
import { Flex } from "../../Styles/common/Flex";
import { Overlay } from "../../Styles/modal/Overlay.style";
import { Modal } from "../../Styles/modal/Modal.style";

interface EditPasswordModalProps {
  onClose: () => void;
  onSubmit: (oldPassword: string, newPassword: string) => void;
}

const EditPasswordModal: React.FC<EditPasswordModalProps> = ({ onClose, onSubmit }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    onSubmit(oldPassword, newPassword);
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <Title>Change Password</Title>
        {error && <ErrorLabel>{error}</ErrorLabel>}
        <Input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Flex dir="flex-end" $justifyC="flex-end" $gap="1rem">
          <Button onClick={handleSubmit}>Change</Button>
          <Button onClick={onClose} $variant="cancel">Cancel</Button>
        </Flex>
      </Modal>
    </Overlay>
  );
};

export default EditPasswordModal;
