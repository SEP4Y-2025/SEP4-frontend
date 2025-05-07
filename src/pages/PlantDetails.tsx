// src/pages/PlantDetails.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import "./PlantDetails.css";

const PlantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pots, plantTypes, loading, error } = useEnvironmentCtx();

  // Find the pot and its plant type
  const pot = pots.find(p => p.potId === id);
  const plantType = pot ? plantTypes.find(type => type._id === pot.plantTypeId) : null;

  const handleSave = () => {
    // Navigate back to plants page
    navigate("/plants");
  };

  const handleDelete = () => {
    // Placeholder for delete functionality
    alert("Delete functionality would go here");
    // After deletion, navigate back to plants page
    // navigate("/plants");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pot || !plantType) return <div>Plant not found</div>;

  // Safely extract values - these approaches avoid TypeScript errors
  const getStateValue = (stateArray: any): number => {
    if (stateArray && Array.isArray(stateArray) && stateArray.length > 1) {
      return Number(stateArray[1]);
    }
    return 0;
  };

  // Get values for display
  const temperatureValue = getStateValue(pot.state.temperature);
  const soilHumidityValue = getStateValue(pot.state.soilHumidity);
  const airHumidityValue = getStateValue(pot.state.airHumidity);
  
  // Calculate water tank percentage
  const waterPercentage = Math.round(
    (pot.waterTank.currentLevelMl / pot.waterTank.capacityMl) * 100
  );

  return (
    <div className="plant-details-page">
      <h1>Plant Details</h1>
      
      <div className="details-card">
        <div className="plant-icon">
          <svg viewBox="0 0 24 24" width="32" height="32">
            <circle cx="12" cy="12" r="8" fill="none" stroke="#6cb66c" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" fill="#6cb66c"/>
          </svg>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Name</span>
          <span className="detail-value">{pot.name}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Type Details</span>
          <span className="detail-value with-arrow">{plantType.name} ▼</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Watering Frequency</span>
          <span className="detail-value">{plantType.water_frequency}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Dosage ml</span>
          <span className="detail-value">{plantType.water_dosage}</span>
        </div>
      </div>
      
      {/* Plant Metrics with Graphics */}
      <div className="metrics-container">
        <div className="metric-box">
          <h3>Temperature:</h3>
          <div className="circular-metric temperature">
            <div className="metric-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <rect x="11" y="3" width="2" height="14" rx="1" fill="#6cb66c"/>
                <circle cx="12" cy="17" r="4" fill="#6cb66c"/>
                <circle cx="12" cy="17" r="6" fill="none" stroke="#6cb66c" strokeWidth="1"/>
              </svg>
            </div>
            <div className="metric-value">{temperatureValue}°C</div>
          </div>
        </div>
        
        <div className="metric-box">
          <h3>Soil humidity:</h3>
          <div className="circular-metric soil">
            <div className="metric-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M12,3 C8,9 5,14 5,17 C5,20.866 8.134,24 12,24 C15.866,24 19,20.866 19,17 C19,14 16,9 12,3 Z" 
                  fill="none" stroke="#6cb66c" strokeWidth="1.5"/>
                <path d="M12,21 C10.343,21 9,19.657 9,18 C9,16.5 10,15 12,13 C14,15 15,16.5 15,18 C15,19.657 13.657,21 12,21 Z" 
                  fill="#6cb66c"/>
              </svg>
            </div>
            <div className="metric-value">{soilHumidityValue}%</div>
          </div>
        </div>
        
        <div className="metric-box">
          <h3>Air humidity:</h3>
          <div className="circular-metric air">
            <div className="metric-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M3,15 C3,11.686 5.686,9 9,9 C11.28,9 13.28,10.28 14.4,12.16 C14.92,12.06 15.46,12 16,12 C19.314,12 22,14.686 22,18 C22,21.314 19.314,24 16,24 L9,24 C5.686,24 3,21.314 3,18 L3,15 Z" 
                  fill="none" stroke="#6cb66c" strokeWidth="1.5"/>
                <path d="M17,16 C16.44,16 16,16.44 16,17 C16,17.56 16.44,18 17,18 C17.56,18 18,17.56 18,17 C18,16.44 17.56,16 17,16 Z M14,19 C13.44,19 13,19.44 13,20 C13,20.56 13.44,21 14,21 C14.56,21 15,20.56 15,20 C15,19.44 14.56,19 14,19 Z M9,17 C8.44,17 8,17.44 8,18 C8,18.56 8.44,19 9,19 C9.56,19 10,18.56 10,18 C10,17.44 9.56,17 9,17 Z" 
                  fill="#6cb66c"/>
              </svg>
            </div>
            <div className="metric-value">{airHumidityValue}%</div>
          </div>
        </div>
      </div>
      
      {/* Water Tank Status Card */}
      <div className="details-card">
        <h2>Water Tank Status</h2>
        
        <div className="detail-row">
          <span className="detail-label">Current Level</span>
          <span className="detail-value">{pot.waterTank.currentLevelMl} ml</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Total Capacity</span>
          <span className="detail-value">{pot.waterTank.capacityMl} ml</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Status</span>
          <span className="detail-value">{pot.waterTank.status}</span>
        </div>
        
        <div className="water-tank-visual">
          <div className="water-tank-container">
            <div 
              className="water-tank-level" 
              style={{ height: `${waterPercentage}%` }}
            ></div>
          </div>
          <span className="water-tank-percentage">{waterPercentage}%</span>
        </div>
      </div>
      
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>Save</button>
        <button className="delete-button" onClick={handleDelete}>Delete Plant</button>
      </div>
    </div>
  );
};

export default PlantDetails;