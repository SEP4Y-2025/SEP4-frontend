import React from "react";

interface AddPlantModalProps {
  typeName: string;
  setTypeName: (val: string) => void;
  wateringFrequency: string;
  setWateringFrequency: (val: string) => void;
  dosage: string;
  setDosage: (val: string) => void;
  error: string;
  handleContinue: () => void;
  handleCancel: () => void;
}

const AddPlantTypeModal: React.FC<AddPlantModalProps> = ({
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
          {error && <p className="error">{error}</p>}

          <div className="input-group">
            <label htmlFor="type-name-input">Type</label>
            <input
              id="type-name-input"
              className="input"
              placeholder="Type name"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
            />
          </div>

          <div className="input-row-group">
            <div className="input-mini-group">
              <label htmlFor="watering-frequency-input">
                Watering frequency
              </label>
              <div className="input-with-unit">
                <input
                  id="watering-frequency-input"
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
              <label htmlFor="dosage-input">Dosage</label>
              <div className="input-with-unit">
                <input
                  id="dosage-input"
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

export default AddPlantTypeModal;
