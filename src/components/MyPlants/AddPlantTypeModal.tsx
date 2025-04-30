import React from "react";

interface AddPlantModalProps {
  typeName: string;
  setTypeName: (value: string) => void;
  wateringFrequency: string;
  setWateringFrequency: (value: string) => void;
  dosage: string;
  setDosage: (value: string) => void;
  error: string;
  handleContinue: () => void;
  handleCancel: () => void;
}

const AddPlantModal: React.FC<AddPlantModalProps> = ({
  typeName,
  setTypeName,
  wateringFrequency,
  setWateringFrequency,
  dosage,
  setDosage,
  error,
  handleContinue,
  handleCancel,
}) => {
  return (
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
  );
};

export default AddPlantModal;