import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddPlant: React.FC = () => {
  const { typeName } = useParams<{ typeName: string }>();
  const navigate = useNavigate();
  const [potName, setPotName] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if(!potName.trim()) {
      setError("Please eneter the pot name");
      return;
    }
    navigate("/plants");
  };


  return (
    <div className="add-plant-container">
      <div className="add-plant-header">
        <button className="back-button" onClick={() => navigate(-1)}>🔙</button>
        <span className="plant-icon" role="img" aria-label="leaf">🌿</span>
        <h2>Add new Plant</h2>
      </div>

      <div className="input-section">
        <label>Name</label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter pot name"
          value={potName}
          onChange={(e) => setPotName(e.target.value)}
        />

        <label>Type</label>
        <input
          type="text"
          className="input-field disabled"
          value={typeName}
          disabled
        />

        {error && <div className="error-label">{error}</div>}

        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddPlant;

