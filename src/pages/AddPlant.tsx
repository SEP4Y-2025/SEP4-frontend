import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddPlant.css";

const AddPlant: React.FC = () => {
  const { typeName } = useParams<{ typeName: string }>();
  const navigate = useNavigate();
  
  const [plantName, setPlantName] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!plantName.trim()) {
      setError("Please enter a plant name");
      return;
    }
    
    // Get current environment from localStorage or use default
    const currentEnvironmentId = localStorage.getItem("currentEnvironment") || "env_greenhouse";

    // Get existing plant types from localStorage or use our dummy data
    const storedPlantTypes = localStorage.getItem("plantTypes");
    let plantTypes = storedPlantTypes ? JSON.parse(storedPlantTypes) : [
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

    // Find the plant type and add the new plant - COMMENTING OUT THIS PART
    // to avoid duplication of plants
    /*
    const updatedPlantTypes = plantTypes.map((plant: any) => {
      if (plant.typeName === typeName) {
        // Add the new plant to this type
        return {
          ...plant,
          plants: [...plant.plants, { plantName: plantName }]
        };
      }
      return plant;
    });

    // Update localStorage
    localStorage.setItem("plantTypes", JSON.stringify(updatedPlantTypes));
    */

    // Instead, we'll just add the pot without modifying the plantTypes plants array
    // Get stored pots from localStorage
    const storedPots = localStorage.getItem("pots");
    let pots = storedPots ? JSON.parse(storedPots) : [
      { _id: "pot_001", plant_type_id: "Aloe", environment_id: "env_greenhouse", water_tank_id: "tank_1", soil_humidity: 45 },
      { _id: "pot_002", plant_type_id: "Lemon", environment_id: "env_outdoor", water_tank_id: "tank_2", soil_humidity: 50 },
      { _id: "pot_003", plant_type_id: "Mint", environment_id: "env_greenhouse", water_tank_id: "tank_3", soil_humidity: 60 },
      { _id: "pot_004", plant_type_id: "Basil", environment_id: "env_balcony", water_tank_id: "tank_4", soil_humidity: 55 },
      { _id: "pot_005", plant_type_id: "Aloe", environment_id: "env_balcony", water_tank_id: "tank_1", soil_humidity: 40 },
    ];

    // Create a unique ID for the new pot that includes the plant name
    const safePlantName = plantName.replace(/\s+/g, '_');
    const newPotId = `pot_${safePlantName}_${Date.now().toString().slice(-3)}`;
    
    // Add new pot to the pots collection
    const newPot = { 
      _id: newPotId, 
      plant_type_id: typeName || "", 
      environment_id: currentEnvironmentId,
      water_tank_id: "tank_1", // Default tank
      soil_humidity: Math.floor(Math.random() * 30) + 40, // Random humidity between 40-70%
      plantName: plantName // Add plantName to the pot object for reference
    };
    
    pots.push(newPot);
    localStorage.setItem("pots", JSON.stringify(pots));

    // Set a flag in localStorage to indicate a new plant was added
    localStorage.setItem("plantAdded", "true");
    
    // Navigate back to MyPlants page
    navigate("/plants");
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
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