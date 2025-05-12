import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addPlantPot } from "../services/plantPotsApi";
import { getTypesByEnvironment } from "../services/plantTypesApi";
import "./AddPlant.css";

const AddPlant: React.FC = () => {
  const { typeName } = useParams<{ typeName: string }>();
  const navigate = useNavigate();

  const [plantTypeId, setPlantTypeId] = useState("");
  const [plantName, setPlantName] = useState("");
  const [arduinoId, setArduinoId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTypeId = async () => {
      try {
        const types = await getTypesByEnvironment("680f8359688cb5341f9f9c19");
        const match = types.find((t) => t.name === typeName);
        if (match) {
          setPlantTypeId(match._id);
        } else {
          setError("Plant type not found.");
        }
      } catch (e) {
        setError("Error fetching plant types.");
      }
    };

    if (typeName) {
      fetchTypeId();
    }
  }, [typeName]);

  const handleSave = async () => {
    setError("");

    if (!plantName.trim()) {
      setError("Please enter a plant name");
      return;
    }

    if (!arduinoId.trim()) {
      setError("Please enter a valid Arduino ID");
      return;
    }

    if (!plantTypeId) {
      setError("Plant type is not loaded yet.");
      return;
    }

    const pot = {
      plant_pot_label: plantName,
      plant_type_id: plantTypeId,
      arduino_id: arduinoId,
    };

    try {
      await addPlantPot(pot);
      setPlantName("");
      setArduinoId("");
      navigate("/plants");
    } catch (err: any) {
      console.error("Failed to add plant pot", err);
      setError("Failed to add plant pot.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="add-plant-modal">
      <div className="modal-content">
        <div className="modal-header">
          <span role="img" aria-label="leaf">🌿</span>
          <h2>Add new Plant</h2>
        </div>

        <div className="modal-body">
          <div className="input-group">
            <label>Name</label>
            <input
              className="input"
              placeholder="Enter plant name"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Type</label>
            <div className="type-display">{typeName}</div>
          </div>

          <div className="input-group">
            <label>Arduino ID</label>
            <input
              className="input"
              placeholder="Enter Arduino ID"
              value={arduinoId}
              onChange={(e) => setArduinoId(e.target.value)}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-footer">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlant;
