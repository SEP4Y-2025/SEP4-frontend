import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PlantDetails.css";
import { Pot, PlantType } from "../types";


// Visual Circle Gauge Component
const CircleGauge: React.FC<{
  value: number;
  maxValue: number;
  unit: string;
  label: string;
}> = ({ value, maxValue, unit, label }) => {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  const circumference = 2 * Math.PI * 40; // Circle radius is 40
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="gauge-container">
      <h3>{label}</h3>
      <div className="gauge">
        <svg width="100" height="100" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="10"
          />
          {/* Foreground circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#8bc34a"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
            fontWeight="bold"
          >
            {value}
            {unit}
          </text>
        </svg>
      </div>
    </div>
  );
};

// Temperature Gauge Component
const TemperatureGauge: React.FC<{ temperature: number }> = ({ temperature }) => {
  return (
    <div className="gauge-container">
      <h3>Temperature:</h3>
      <div className="gauge">
        <svg width="100" height="100" viewBox="0 0 100 100">
          {/* Thermometer background */}
          <rect x="45" y="20" width="10" height="60" rx="5" fill="#e0e0e0" />
          <circle cx="50" cy="80" r="10" fill="#e0e0e0" />
          
          {/* Thermometer fill */}
          <rect 
            x="45" 
            y={80 - Math.min(60, Math.max(0, (temperature / 40) * 60))} 
            width="10" 
            height={Math.min(60, Math.max(0, (temperature / 40) * 60))} 
            rx="5" 
            fill={temperature > 30 ? "#f44336" : temperature > 20 ? "#8bc34a" : "#2196f3"} 
          />
          <circle cx="50" cy="80" r="10" fill={temperature > 30 ? "#f44336" : temperature > 20 ? "#8bc34a" : "#2196f3"} />
          
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
            fontWeight="bold"
            fill="#333"
          >
            {temperature}°C
          </text>
        </svg>
      </div>
    </div>
  );
};

const PlantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [pot, setPot] = useState<Pot | null>(null);
  const [plantType, setPlantType] = useState<PlantType | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tankLevel, setTankLevel] = useState(85); // Default tank level (%)
  const [temperature, setTemperature] = useState(22); // Default temperature (°C)
  
  // Load pot and plant type data
  useEffect(() => {
    console.log("Loading plant details for ID:", id);
    
    if (!id) return;
    
    // Load pot data from localStorage
    const storedPots = localStorage.getItem("pots");
    if (!storedPots) {
      console.error("No pots found in localStorage");
      return;
    }
    
    const pots: Pot[] = JSON.parse(storedPots);
    const foundPot = pots.find(p => p._id === id);
    
    if (!foundPot) {
      console.error("Pot not found with ID:", id);
      // If ID doesn't exist in pots, try to create a virtual pot based on plant name
      // This is for handling plants that don't have a real pot yet
      if (id.includes("pot_")) {
        const parts = id.split("_");
        if (parts.length >= 2) {
          const plantTypeId = parts[1];
          // Create a virtual pot
          const virtualPot: Pot = {
            _id: id,
            plant_type_id: plantTypeId,
            environment_id: localStorage.getItem("currentEnvironment") || "env_greenhouse",
            water_tank_id: "tank_virtual",
            soil_humidity: 50 // Default value
          };
          setPot(virtualPot);
          
          // Also load the plant type
          const storedPlantTypes = localStorage.getItem("plantTypes");
          if (storedPlantTypes) {
            const plantTypes: PlantType[] = JSON.parse(storedPlantTypes);
            const foundType = plantTypes.find(type => type.typeName === plantTypeId);
            if (foundType) {
              setPlantType(foundType);
            }
          }
        }
      }
      return;
    }
    
    console.log("Found pot:", foundPot);
    setPot(foundPot);
    
    // Load plant type data from localStorage
    const storedPlantTypes = localStorage.getItem("plantTypes");
    if (!storedPlantTypes) {
      console.error("No plant types found in localStorage");
      return;
    }
    
    const plantTypes: PlantType[] = JSON.parse(storedPlantTypes);
    const foundType = plantTypes.find(type => type.typeName === foundPot.plant_type_id);
    
    if (!foundType) {
      console.error("Plant type not found:", foundPot.plant_type_id);
      return;
    }
    
    console.log("Found plant type:", foundType);
    setPlantType(foundType);
    
    // Simulate loading random tank level and temperature
    // In a real app, these would come from sensors or API
    setTankLevel(Math.floor(Math.random() * 30) + 70); // Random between 70-100
    setTemperature(Math.floor(Math.random() * 10) + 18); // Random between 18-28
  }, [id]);

  // Handle delete pot
  const handleDelete = () => {
    if (!pot || !id) return;
    
    console.log("Deleting pot:", id);
    
    // Get current pots from localStorage
    const storedPots = localStorage.getItem("pots");
    if (!storedPots) return;
    
    // Remove the pot
    const pots: Pot[] = JSON.parse(storedPots);
    const updatedPots = pots.filter(p => p._id !== id);
    
    // Update localStorage
    localStorage.setItem("pots", JSON.stringify(updatedPots));
    console.log("Pot deleted, remaining pots:", updatedPots.length);
    
    // Close modal
    setShowDeleteConfirm(false);
    
    // Navigate back to plants page
    navigate("/plants");
  };

  // Handle save (stub)
  const handleSave = () => {
    console.log("Saving plant data...");
    // Here you would update the pot data in localStorage
    // For now, just show a confirmation
    alert("Plant data saved!");
  };

  if (!pot || !plantType) {
    return (
      <div className="plant-details-container">
        <h1>Plant Details</h1>
        <p>Loading plant information...</p>
        <button className="back-button" onClick={() => navigate("/plants")}>Back to Plants</button>
      </div>
    );
  }

  return (
    <div className="plant-details-container">
      <h1>Plant Details</h1>
      
      <div className="plant-info-main">
        <div className="plant-info-card">
          <div className="plant-icon">
            <svg viewBox="0 0 24 24" width="40" height="40">
              <circle cx="12" cy="12" r="10" fill="#e8f5e9" stroke="#66bb6a" strokeWidth="1.5" />
              <path d="M12,2 C16.42,2 20,5.58 20,10 C20,16 12,22 12,22 C12,22 4,16 4,10 C4,5.58 7.58,2 12,2 Z" fill="none" stroke="#66bb6a" strokeWidth="1.5" />
            </svg>
          </div>
          
          <div className="plant-info-section">
            <div className="info-row">
              <label>Name</label>
              <span>{pot._id.includes("pot_") ? pot._id.split("_").slice(2).join(" ") : pot._id}</span>
            </div>
            
            <div className="info-row">
              <label>Type Details</label>
              <span>{plantType.typeName} ▼</span>
            </div>
            
            <div className="info-row">
              <label>Watering Frequency</label>
              <span>{plantType.wateringFrequency}</span>
            </div>
            
            <div className="info-row">
              <label>Dosage ml</label>
              <span>{plantType.dosage}</span>
            </div>
          </div>
        </div>
        
        <div className="plant-gauges">
          <CircleGauge 
            value={tankLevel} 
            maxValue={100} 
            unit="%" 
            label="Tank level:" 
          />
          
          <CircleGauge 
            value={pot.soil_humidity} 
            maxValue={100} 
            unit="%" 
            label="Soil humidity:" 
          />
          
          <TemperatureGauge temperature={temperature} />
        </div>
      </div>
      
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="delete-button" onClick={() => setShowDeleteConfirm(true)}>
          Delete Plant
        </button>
      </div>
      
      {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this plant pot?</p>
            <div className="button-row">
              <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button onClick={handleDelete} className="delete-button">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDetails;