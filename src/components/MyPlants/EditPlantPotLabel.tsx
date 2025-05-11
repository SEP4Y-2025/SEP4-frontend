import React, { useState, useEffect, useRef } from 'react';
import '../../pages/PlantDetails.css'; // Assuming you have some CSS for styling

interface EditPlantPotLabelProps {
  potName: string;
  onSave: (newName: string) => void;
}

const EditPlantPotLabel: React.FC<EditPlantPotLabelProps> = ({ potName, onSave }) => {
  const [name, setName] = useState(potName);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(potName);
  }, [potName]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onSave(name); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
    
   return isEditing ? (
    <input
      ref={inputRef}
      className="detail-value input-edit"
      type="text"
      value={name}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  ) : (
    <span className="detail-value" onClick={handleTextClick}>
      {name}
    </span>
  );
};

export default EditPlantPotLabel;
