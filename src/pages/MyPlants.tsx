import React, { useState } from "react";
import "./MyPlants.css";

interface PlantType {
  typeName: string;
  wateringFrequency: number;
  dosage: number;
}

const MyPlants: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [dosage, setDosage] = useState("");
  const [error, setError] = useState("");
  const [plantTypes, setPlantTypes] = useState<PlantType[]>([]);

  const handleContinue = () => {
    if (!typeName || !wateringFrequency || !dosage) {
      setError("Please fill out all fields.");
      return;
    }

    const watering = parseInt(wateringFrequency, 10);
    const dose = parseInt(dosage, 10);

    if (watering < 0 || dose < 0) {
      setError("Values cannot be negative.");
      return;
    }

    const newPlant: PlantType = {
      typeName,
      wateringFrequency: watering,
      dosage: dose,
    };

    setPlantTypes([...plantTypes, newPlant]);
    setTypeName("");
    setWateringFrequency("");
    setDosage("");
    setError("");
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setError("");
  };

  return (
    <div className="plants-page">
      <h1 className="page-title">My Plants - SpaceName</h1>

      <div className="plants-list">
        {plantTypes.map((plant, index) => (
          <div key={index} className="plant-type-section">
            <div className="plant-type-title">
              Type: {plant.typeName} ({plant.wateringFrequency}x/week,{" "}
              {plant.dosage}ml)
            </div>
            <div className="plant-box">
              <div className="add-pot-container">
                <button className="add-pot-button">+</button>
                <div className="add-pot-text">New</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="add-type-button" onClick={() => setOpen(true)}>
        Add new type
      </button>

      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <span role="img" aria-label="leaf">
                🌿
              </span>
              <h2>Add new type</h2>
            </div>

            <div className="modal-body">
              <div className="input-group">
                <label>Type</label>
                <input
                  className="input"
                  placeholder="Type name"
                  value={typeName}
                  onChange={(e) => setTypeName(e.target.value)}
                />
              </div>

              <div className="input-row-group">
                <div className="input-mini-group">
                  <label>Watering frequency</label>
                  <div className="input-with-unit">
                    <input
                      className="input-short"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={wateringFrequency}
                      onChange={(e) => setWateringFrequency(e.target.value)}
                    />
                    <span className="unit-text">times/week</span>
                  </div>
                </div>

                <div className="input-mini-group">
                  <label>Dosage</label>
                  <div className="input-with-unit">
                    <input
                      className="input-short"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                    />
                    <span className="unit-text">ml</span>
                  </div>
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="modal-footer">
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="continue-button" onClick={handleContinue}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPlants;
