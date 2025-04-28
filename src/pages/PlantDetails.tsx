import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PlantDetails.css";

interface PlantPot {
  id: string;
  label: string;
  typeName: string;
  lastWatering?: string;
  soilHumidity?: number;
}

interface PlantType {
  typeName: string;
  wateringFrequency: number;
  dosage: number;
}

interface WateringLog {
  timestamp: string;
  operation: string; // "watering", "window_open", "window_close"
  initiator: string;
}

const PlantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [plant, setPlant] = useState<PlantPot | null>(null);
  const [plantType, setPlantType] = useState<PlantType | null>(null);
  const [logs, setLogs] = useState<WateringLog[]>([]);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  
  // Environmental data (mock)
  const [soilHumidity, setSoilHumidity] = useState(65);
  const [waterLevel, setWaterLevel] = useState(78);
  const [temperature, setTemperature] = useState(22.5);
  const [airHumidity, setAirHumidity] = useState(45);
  const [lightIntensity, setLightIntensity] = useState(820);
  const [tankCapacity, setTankCapacity] = useState(500); // ml

  useEffect(() => {
    if (!id) return;
    
    console.log("Loading plant details for ID:", id);
    
    // Load plant pot data
    const savedPots = JSON.parse(localStorage.getItem("plantPots") || "[]");
    const foundPlant = savedPots.find((pot: PlantPot) => pot.id === id);
    
    if (foundPlant) {
      console.log("Found plant:", foundPlant);
      setPlant(foundPlant);
      setSoilHumidity(foundPlant.soilHumidity || Math.floor(Math.random() * 100));
      
      // Load plant type data
      const savedTypes = JSON.parse(localStorage.getItem("plantTypes") || "[]");
      const foundType = savedTypes.find((type: PlantType) => type.typeName === foundPlant.typeName);
      
      if (foundType) {
        console.log("Found plant type:", foundType);
        setPlantType(foundType);
      }
      
      // Generate mock watering logs
      generateMockLogs(foundPlant.lastWatering || new Date().toISOString());
      
      // Set random environment values
      setWaterLevel(Math.floor(Math.random() * 100));
      setTemperature(20 + Math.random() * 5);
      setAirHumidity(40 + Math.random() * 20);
      setLightIntensity(500 + Math.random() * 500);
      setIsWindowOpen(Math.random() > 0.5);
    } else {
      console.log("Plant not found with ID:", id);
    }
  }, [id]);

  // Generate mock logs based on the last watering date
  const generateMockLogs = (lastWatering: string) => {
    const lastWateringDate = new Date(lastWatering);
    
    // Generate logs for the past 2 weeks
    const mockLogs: WateringLog[] = [];
    
    // Add the most recent watering
    mockLogs.push({
      timestamp: lastWateringDate.toISOString(),
      operation: "watering",
      initiator: "System"
    });
    
    // Add some random window operations
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    mockLogs.push({
      timestamp: twoDaysAgo.toISOString(),
      operation: "window_open",
      initiator: "User"
    });
    
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    
    mockLogs.push({
      timestamp: threeDaysAgo.toISOString(),
      operation: "window_close",
      initiator: "System"
    });
    
    // Add more watering events
    for (let i = 1; i <= 3; i++) {
      const date = new Date(lastWateringDate);
      date.setDate(date.getDate() - (i * 7)); // Weekly watering
      
      mockLogs.push({
        timestamp: date.toISOString(),
        operation: "watering",
        initiator: Math.random() > 0.5 ? "System" : "User"
      });
    }
    
    // Sort logs by timestamp (newest first)
    mockLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    setLogs(mockLogs);
  };

  const toggleWindow = () => {
    const newWindowState = !isWindowOpen;
    setIsWindowOpen(newWindowState);
    
    // Add a new log entry
    const newLog: WateringLog = {
      timestamp: new Date().toISOString(),
      operation: newWindowState ? "window_open" : "window_close",
      initiator: "User"
    };
    
    setLogs([newLog, ...logs]);
  };

  const calculateNextWatering = () => {
    if (!plant?.lastWatering || !plantType) return "Unknown";
    
    const lastWateringDate = new Date(plant.lastWatering);
    const daysPerWatering = 7 / plantType.wateringFrequency;
    
    const nextWateringDate = new Date(lastWateringDate);
    nextWateringDate.setDate(lastWateringDate.getDate() + daysPerWatering);
    
    return nextWateringDate.toLocaleDateString();
  };

  if (!plant) {
    return (
      <div className="plant-details-container">
        <div className="plant-details-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <span role="img" aria-label="back">⬅️</span>
          </button>
          <h2>Plant Not Found</h2>
          <p>Unable to find plant details for the specified ID.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="plant-details-container">
      <div className="plant-details-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span role="img" aria-label="back">⬅️</span>
        </button>
        <div className="header-content">
          <span className="plant-icon" role="img" aria-label="leaf">🌿</span>
          <h2>{plant.label}</h2>
        </div>
      </div>

      <div className="plant-info-section">
        <h3>Plant Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Type:</label>
            <span>{plant.typeName}</span>
          </div>
          <div className="info-item">
            <label>Watering Frequency:</label>
            <span>{plantType?.wateringFrequency || "Unknown"} times/week</span>
          </div>
          <div className="info-item">
            <label>Water Dosage:</label>
            <span>{plantType?.dosage || "Unknown"} ml</span>
          </div>
          <div className="info-item">
            <label>Last Watering:</label>
            <span>{plant.lastWatering ? new Date(plant.lastWatering).toLocaleDateString() : "Unknown"}</span>
          </div>
          <div className="info-item">
            <label>Next Watering:</label>
            <span>{calculateNextWatering()}</span>
          </div>
        </div>
      </div>

      <div className="sensor-data-section">
        <h3>Current Conditions</h3>
        <div className="info-grid">
          <div className="sensor-item">
            <div className="sensor-icon">💧</div>
            <label>Soil Humidity:</label>
            <span>{soilHumidity}%</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${soilHumidity}%`, backgroundColor: soilHumidity < 30 ? '#e74c3c' : soilHumidity > 70 ? '#2ecc71' : '#f39c12' }}></div>
            </div>
          </div>
          <div className="sensor-item">
            <div className="sensor-icon">🌡️</div>
            <label>Temperature:</label>
            <span>{temperature.toFixed(1)}°C</span>
          </div>
          <div className="sensor-item">
            <div className="sensor-icon">💦</div>
            <label>Air Humidity:</label>
            <span>{airHumidity.toFixed(1)}%</span>
          </div>
          <div className="sensor-item">
            <div className="sensor-icon">☀️</div>
            <label>Light Intensity:</label>
            <span>{lightIntensity.toFixed(0)} lux</span>
          </div>
          <div className="water-tank-item">
            <div className="sensor-icon">🚰</div>
            <label>Water Tank:</label>
            <div className="water-level-container">
              <div className="water-level-info">
                <span>{waterLevel}%</span>
                <span className="water-volume">{Math.round(tankCapacity * waterLevel / 100)} / {tankCapacity} ml</span>
              </div>
              <div className="water-level-indicator">
                <div 
                  className="water-level-fill" 
                  style={{ 
                    height: `${waterLevel}%`,
                    backgroundColor: waterLevel < 20 ? '#e74c3c' : '#3498db' 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="controls-section">
        <h3>Controls</h3>
        <div className="controls-grid">
          <div className="control-item">
            <button className={`window-button ${isWindowOpen ? 'open' : 'closed'}`} onClick={toggleWindow}>
              <span className="window-icon">{isWindowOpen ? '🪟' : '🪟'}</span>
              <span>Window is {isWindowOpen ? 'Open' : 'Closed'}</span>
            </button>
          </div>
          <div className="control-item">
            <button className="water-now-button">
              <span className="water-icon">💧</span>
              <span>Water Now</span>
            </button>
          </div>
        </div>
      </div>

      <div className="logs-section">
        <h3>Activity History</h3>
        {logs.length > 0 ? (
          <div className="logs-list">
            {logs.map((log, index) => (
              <div key={index} className="log-item">
                <div className="log-timestamp">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
                <div className="log-details">
                  <span className="log-operation">
                    {log.operation === "watering" ? "💧 Watering" : 
                     log.operation === "window_open" ? "🪟 Window Opened" : 
                     "🪟 Window Closed"}
                  </span>
                  <span className="log-initiator">by {log.initiator}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-logs-message">No activity recorded yet.</div>
        )}
      </div>
    </div>
  );
};

export default PlantDetails;