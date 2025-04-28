import React, { useState, useEffect } from "react";
import "./MyPlants.css";
import { useNavigate } from "react-router-dom";

interface PlantType {
  typeName: string;
  wateringFrequency: number;
  dosage: number;
}

interface PlantPot {
  id: string;
  label: string;
  typeName: string;
  lastWatering?: string;
  soilHumidity?: number;
}

// Initialize dummy data functions
const initializeDummyData = () => {
  // Check if we already have data
  const existingTypes = localStorage.getItem("plantTypes");
  
  if (!existingTypes) {
    // Sample plant types
    const dummyTypes = [
      {
        typeName: "Snake Plant",
        wateringFrequency: 1,
        dosage: 50
      },
      {
        typeName: "Monstera",
        wateringFrequency: 2,
        dosage: 100
      },
      {
        typeName: "Succulents",
        wateringFrequency: 1,
        dosage: 30
      },
      {
        typeName: "Peace Lily",
        wateringFrequency: 3,
        dosage: 75
      }
    ];
    
    localStorage.setItem("plantTypes", JSON.stringify(dummyTypes));
    return dummyTypes;
  }
  
  return JSON.parse(existingTypes);
};

// Sample plant pots data
const initializeDummyPots = () => {
  const existingPots = localStorage.getItem("plantPots");
  
  if (!existingPots) {
    const dummyPots = [
      {
        id: "pot1",
        label: "Kitchen Snake Plant",
        typeName: "Snake Plant",
        lastWatering: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        soilHumidity: 45
      },
      {
        id: "pot2",
        label: "Living Room Monstera",
        typeName: "Monstera",
        lastWatering: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        soilHumidity: 72
      },
      {
        id: "pot3",
        label: "Office Succulent",
        typeName: "Succulents",
        lastWatering: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        soilHumidity: 30
      }
    ];
    
    localStorage.setItem("plantPots", JSON.stringify(dummyPots));
    return dummyPots;
  }
  
  return JSON.parse(existingPots);
};

const MyPlants: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [dosage, setDosage] = useState("");
  const [error, setError] = useState("");
  const [plantTypes, setPlantTypes] = useState<PlantType[]>([]);
  const [plantPots, setPlantPots] = useState<PlantPot[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const navigate = useNavigate();
  
  // Load data when component mounts or when navigating back to this page
  useEffect(() => {
    loadData();
    
    // Add event listener for focus to reload data when returning to this page
    window.addEventListener('focus', loadData);
    
    // Cleanup
    return () => {
      window.removeEventListener('focus', loadData);
    };
  }, []);

  // Function to load data from localStorage
  const loadData = () => {
    // Load plant types
    const types = initializeDummyData();
    setPlantTypes(types);
    
    // Load plant pots
    const pots = initializeDummyPots();
    setPlantPots(pots);
    
    console.log("Loaded types:", types);
    console.log("Loaded pots:", pots);
  };

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

    const updatedTypes = [...plantTypes, newPlant];
    setPlantTypes(updatedTypes);
    localStorage.setItem("plantTypes", JSON.stringify(updatedTypes));
    
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

  const handleDeletePlant = (e: React.MouseEvent, id: string) => {
    // Stop propagation to prevent navigating to details page
    e.stopPropagation();
    setConfirmDelete(id);
  };

  const confirmDeletePlant = () => {
    if (!confirmDelete) return;
    
    const updatedPots = plantPots.filter(pot => pot.id !== confirmDelete);
    setPlantPots(updatedPots);
    localStorage.setItem("plantPots", JSON.stringify(updatedPots));
    setConfirmDelete(null);
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const viewPlantDetails = (id: string) => {
    navigate(`/plant/${id}`);
  };

  return (
    <div className="plants-page">
      <h1 className="page-title">My Plants - SpaceName</h1>

      <div className="plants-list">
        {plantTypes.map((type, index) => {
          // Filter pots that belong to this type
          const potsOfThisType = plantPots.filter(pot => pot.typeName === type.typeName);
          
          return (
            <div key={index} className="plant-type-section">
              <div className="plant-type-title">
                Type: {type.typeName} ({type.wateringFrequency}x/week, {type.dosage}ml)
              </div>
              <div className="plant-box">
                {potsOfThisType.map(pot => (
                  <div 
                    key={pot.id} 
                    className="plant-pot-item"
                    onClick={() => viewPlantDetails(pot.id)}
                  >
                    <div className="plant-pot-label">
                      {pot.label}
                    </div>
                    <button 
                      className="delete-pot-button" 
                      onClick={(e) => handleDeletePlant(e, pot.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
                <div className="add-pot-container">
                  <button 
                    className="add-pot-button" 
                    onClick={() => navigate(`/addplant/${type.typeName}`)}
                  >
                    +
                  </button>
                  <div className="add-pot-text">New</div>
                </div>
              </div>
            </div>
          );
        })}
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

      {confirmDelete && (
        <div className="modal-overlay">
          <div className="confirm-delete-modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this plant pot?</p>
            <div className="confirm-buttons">
              <button className="cancel-button" onClick={cancelDelete}>Cancel</button>
              <button className="delete-button" onClick={confirmDeletePlant}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPlants;