import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPlants.css";
import PotList from "../components/PotList";
import { Pot } from "../services/api"; // keeping the type only
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
  }
];

const dummyPots: Pot[] = [
  { _id: "pot_001", plant_type_id: "Aloe", environment_id: "env_greenhouse", water_tank_id: "tank_1", soil_humidity: 45 },
  { _id: "pot_002", plant_type_id: "Lemon", environment_id: "env_outdoor", water_tank_id: "tank_2", soil_humidity: 50 },
  { _id: "pot_003", plant_type_id: "Mint", environment_id: "env_greenhouse", water_tank_id: "tank_3", soil_humidity: 60 },
  { _id: "pot_004", plant_type_id: "Basil", environment_id: "env_balcony", water_tank_id: "tank_4", soil_humidity: 55 },
  { _id: "pot_005", plant_type_id: "Aloe", environment_id: "env_balcony", water_tank_id: "tank_1", soil_humidity: 40 },
];

const dummyEnvironments: Environment[] = [
  { id: "env_greenhouse", name: "Greenhouse" },
  { id: "env_outdoor", name: "Outdoor Garden" },
  { id: "env_balcony", name: "Balcony" }
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

  useEffect(() => {
    setPlantTypes(dummyPlantTypes);
    setPots(dummyPots.sort((a, b) => a._id.localeCompare(b._id)));
  }, []);

  const currentEnvironment = dummyEnvironments.find(env => env.id === currentEnvironmentId);
  const potsInCurrentEnvironment = pots.filter(pot => pot.environment_id === currentEnvironmentId);

  const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentEnvironmentId(e.target.value);
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
      plants: [],
      environmentId: currentEnvironmentId
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
      {plantTypes
  .filter((plantType) => {
    const existsInEnvironment = potsInCurrentEnvironment.some(
      (pot) => pot.plant_type_id === plantType.typeName
    );
    const isNewAndBelongsHere = 
      !pots.some(pot => pot.plant_type_id === plantType.typeName) &&
      plantType.environmentId === currentEnvironmentId;

    return existsInEnvironment || isNewAndBelongsHere;
  })

          .sort((a, b) => a.typeName.localeCompare(b.typeName))
          .map((plantType, index) => (
            <div key={index} className="plant-type-section">
              <div className="plant-type-title">Type: {plantType.typeName}</div>
              <div className="plant-box">
                {plantType.plants
                  .sort((a, b) => a.plantName.localeCompare(b.plantName))
                  .map((plant, idx) => (
                    <div key={idx} className="pot-container">
                      <div className="pot-image">
                        <img src={plantImage} alt="Plant pot" />
                      </div>
                      <div className="pot-name">{plant.plantName}</div>
                    </div>
                  ))}
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
          ))}
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
