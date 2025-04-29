import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MyPlants.css";
import plantImage from "../images/image.png";

interface Plant {
  plantName: string;
}

interface PlantType {
  typeName: string;
  wateringFrequency: number;
  dosage: number;
  plants: Plant[];
  environmentId?: string;
}

interface Environment {
  id: string;
  name: string;
}

interface Pot {
  _id: string;
  plant_type_id: string;
  environment_id: string;
  water_tank_id: string;
  soil_humidity: number;
}

// Dummy Data
const dummyPlantTypes: PlantType[] = [
  {
    typeName: "Aloe",
    wateringFrequency: 1,
    dosage: 30,
    plants: [{ plantName: "Greenie" }, { plantName: "Spiky" }]
  },
  {
    typeName: "Basil",
    wateringFrequency: 3,
    dosage: 50,
    plants: [{ plantName: "Basil Jr" }, { plantName: "YumYum" }]
  },
  {
    typeName: "Lemon",
    wateringFrequency: 2,
    dosage: 100,
    plants: [{ plantName: "Lemony" }, { plantName: "AAron" }]
  },
  {
    typeName: "Mint",
    wateringFrequency: 4,
    dosage: 40,
    plants: [{ plantName: "Freshy" }]
  },
  {
    typeName: "Watermelon",
    wateringFrequency: 2,
    dosage: 300,
    plants: [{ plantName: "Green Pot" }]
  }
];

const dummyPots: Pot[] = [
  { _id: "pot_001", plant_type_id: "Aloe", environment_id: "env_greenhouse", water_tank_id: "tank_1", soil_humidity: 45 },
  { _id: "pot_002", plant_type_id: "Lemon", environment_id: "env_outdoor", water_tank_id: "tank_2", soil_humidity: 50 },
  { _id: "pot_003", plant_type_id: "Mint", environment_id: "env_greenhouse", water_tank_id: "tank_3", soil_humidity: 60 },
  { _id: "pot_004", plant_type_id: "Basil", environment_id: "env_balcony", water_tank_id: "tank_4", soil_humidity: 55 },
  { _id: "pot_005", plant_type_id: "Aloe", environment_id: "env_balcony", water_tank_id: "tank_1", soil_humidity: 40 },
  { _id: "pot_006", plant_type_id: "Watermelon", environment_id: "env_kitchen", water_tank_id: "tank_5", soil_humidity: 65 }
];

const dummyEnvironments: Environment[] = [
  { id: "env_greenhouse", name: "Greenhouse" },
  { id: "env_outdoor", name: "Outdoor Garden" },
  { id: "env_balcony", name: "Balcony" },
  { id: "env_kitchen", name: "Kitchen" }
];

const MyPlants: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [dosage, setDosage] = useState("");
  const [error, setError] = useState("");

  const [plantTypes, setPlantTypes] = useState<PlantType[]>([]);
  const [pots, setPots] = useState<Pot[]>([]);
  const [currentEnvironmentId, setCurrentEnvironmentId] = useState<string>("env_greenhouse");
  
  const navigate = useNavigate();
  const location = useLocation();

  // Load data from localStorage or use dummy data
  const loadData = () => {
    console.log("Loading data...");
    
    // Check for stored plant types
    const storedPlantTypes = localStorage.getItem("plantTypes");
    if (storedPlantTypes) {
      console.log("Found stored plant types");
      setPlantTypes(JSON.parse(storedPlantTypes));
    } else {
      console.log("Using dummy plant types");
      setPlantTypes(dummyPlantTypes);
      // Initialize localStorage with dummy data
      localStorage.setItem("plantTypes", JSON.stringify(dummyPlantTypes));
    }
    
    // Check for stored pots
    const storedPots = localStorage.getItem("pots");
    if (storedPots) {
      console.log("Found stored pots");
      setPots(JSON.parse(storedPots).sort((a: Pot, b: Pot) => a._id.localeCompare(b._id)));
    } else {
      console.log("Using dummy pots");
      setPots(dummyPots.sort((a, b) => a._id.localeCompare(b._id)));
      // Initialize localStorage with dummy data
      localStorage.setItem("pots", JSON.stringify(dummyPots));
    }
    
    // Check for stored environment preference
    const storedEnvironment = localStorage.getItem("currentEnvironment");
    if (storedEnvironment) {
      console.log("Found stored environment:", storedEnvironment);
      setCurrentEnvironmentId(storedEnvironment);
    }
    
    // Clear the plant added flag
    localStorage.removeItem("plantAdded");
  };

  useEffect(() => {
    loadData();
  }, []);
  
  // Check for navigation back from AddPlant component
  useEffect(() => {
    // This effect will run whenever location changes (e.g., when navigating back from AddPlant)
    const plantAdded = localStorage.getItem("plantAdded");
    if (plantAdded === "true") {
      console.log("Plant was added, reloading data");
      loadData(); // Reload data to show newly added plants
    }
  }, [location]);

  const currentEnvironment = dummyEnvironments.find(env => env.id === currentEnvironmentId);
  const potsInCurrentEnvironment = pots.filter(pot => pot.environment_id === currentEnvironmentId);

  const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEnvironmentId = e.target.value;
    console.log("Environment changed to:", newEnvironmentId);
    setCurrentEnvironmentId(newEnvironmentId);
    
    // Store the selected environment in localStorage so AddPlant can use it
    localStorage.setItem("currentEnvironment", newEnvironmentId);
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

    console.log("Adding new plant type:", typeName);
    
    // Create new plant type with the current environment
    const newPlant: PlantType = {
      typeName,
      wateringFrequency: watering,
      dosage: dose,
      plants: [],
      environmentId: currentEnvironmentId
    };

    // Add to plant types array
    const updatedPlantTypes = [...plantTypes, newPlant];
    setPlantTypes(updatedPlantTypes);
    localStorage.setItem("plantTypes", JSON.stringify(updatedPlantTypes));
    
    // Reset form
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

  const handlePotClick = (potId: string) => {
    console.log("Pot clicked:", potId);
    navigate(`/plant/${potId}`);
  };

  return (
    <div className="plants-page">
      <h1 className="page-title">My Plants - {currentEnvironment?.name || "Unknown"}</h1>

      {/* Environment selector */}
      <div className="environment-selector">
        <label htmlFor="environment-select">Select Environment: </label>
        <select id="environment-select" value={currentEnvironmentId} onChange={handleEnvironmentChange}>
          {dummyEnvironments.map((env) => (
            <option key={env.id} value={env.id}>
              {env.name}
            </option>
          ))}
        </select>
      </div>
 
      <div className="plants-list">
        {/* Display all plant types that exist in the current environment */}
        {plantTypes
          .filter((plantType) => {
            // Show plant types that have pots in this environment
            const existsInEnvironment = potsInCurrentEnvironment.some(
              (pot) => pot.plant_type_id === plantType.typeName
            );
            
            // Show plant types that were newly added to this environment
            const isNewAndBelongsHere = 
              plantType.environmentId === currentEnvironmentId;
              
            // Show plant types with no environment specified (for backward compatibility)
            const hasNoEnvironment = !plantType.environmentId;
            
            return existsInEnvironment || isNewAndBelongsHere || hasNoEnvironment;
          })
          .sort((a, b) => a.typeName.localeCompare(b.typeName))
          .map((plantType, index) => {
            // Get pots for this plant type in the current environment
            const potsOfThisType = potsInCurrentEnvironment.filter(
              pot => pot.plant_type_id === plantType.typeName
            );
            
            return (
              <div key={index} className="plant-type-section">
                <div className="plant-type-title">Type: {plantType.typeName}</div>
                <div className="plant-box">
                  {/* Show actual pots for this plant type */}
                  {potsOfThisType.length > 0 && potsOfThisType.map((pot, potIdx) => (
                    <div 
                      key={pot._id} 
                      className="pot-container" 
                      onClick={() => handlePotClick(pot._id)}
                    >
                      <div className="pot-image">
                        <img src={plantImage} alt="Plant pot" />
                      </div>
                      <div className="pot-name">{pot._id}</div>
                      {/* Removed soil humidity display from list view */}
                    </div>
                  ))}
                  
                  {/* Show plants based on plant.plantName */}
                  {plantType.plants
                    .filter(plant => {
                      // Only show plants that don't already have a pot
                      return !potsOfThisType.some(pot => 
                        pot._id.includes(plant.plantName.replace(/\s+/g, '_'))
                      );
                    })
                    .sort((a, b) => a.plantName.localeCompare(b.plantName))
                    .map((plant, idx) => {
                      // Create a mock pot ID
                      const mockPotId = `pot_${plantType.typeName}_${plant.plantName.replace(/\s+/g, '_')}`;
                      
                      return (
                        <div 
                          key={`plant-${idx}`} 
                          className="pot-container"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handlePotClick(mockPotId)}
                        >
                          <div className="pot-image">
                            <img src={plantImage} alt="Plant pot" />
                          </div>
                          <div className="pot-name">{plant.plantName}</div>
                          {/* No soil humidity displayed here either */}
                        </div>
                      );
                    })}
                  
                  {/* Add new plant button */}
                  <div className="add-pot-container">
                    <button
                      className="add-pot-button"
                      onClick={() => navigate(`/addplant/${plantType.typeName}`)}
                    >
                      ➕
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
              <span role="img" aria-label="leaf">🌿</span>
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