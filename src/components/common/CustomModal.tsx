import React, { useState } from "react";
import styled from "styled-components";

interface FieldConfig {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
}

interface CustomFormModalProps {
    title: string;
    fields: FieldConfig[];
    onClose: () => void;
    onSubmit: (data: Record<string, string>) => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  margin: 0.5rem 0 1rem 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button<{ variant?: "cancel" }>`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.variant === "cancel" ? "#ccc" : "#007BFF")};
  color: ${(props) => (props.variant === "cancel" ? "#333" : "#fff")};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const CustomFormModal: React.FC<CustomFormModalProps> = ({ title, fields, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, string>>(
        () => fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
    );
    const [error, setError] = useState("");

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const missing = fields.find((field) => field.required && !formData[field.name].trim());
        if (missing) {
            setError(`"${missing.label}" is required.`);
            return;
        }

        setError("");
        onSubmit(formData);
        onClose();
    };

    return (
        <Overlay>
            <Modal>
                <Title>{title}</Title>
                {error && <Error>{error}</Error>}
                {fields.map((field) => (
                    <div key={field.name}>
                        <Label htmlFor={field.name}>{field.label}</Label>
                        <Input
                            id={field.name}
                            type={field.type || "text"}
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                        />
                    </div>
                ))}
                <Actions>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button variant="cancel" onClick={onClose}>Cancel</Button>
                </Actions>
            </Modal>
        </Overlay>
    );
};

export default CustomFormModal;
