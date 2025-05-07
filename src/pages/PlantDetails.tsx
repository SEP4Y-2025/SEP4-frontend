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
  const getStateValue = (stateArray: any): string => {
    if (stateArray && Array.isArray(stateArray) && stateArray.length > 1) {
      return String(stateArray[1]);
    }
    return 'N/A';
  };

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
      
      {/* Environment Status Card */}
      <div className="details-card">
        <h2>Environment Status</h2>
        
        <div className="detail-row">
          <span className="detail-label">Temperature</span>
          <span className="detail-value">
            {getStateValue(pot.state.temperature)}°C
          </span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Air Humidity</span>
          <span className="detail-value">
            {getStateValue(pot.state.airHumidity)}%
          </span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Soil Humidity</span>
          <span className="detail-value">
            {getStateValue(pot.state.soilHumidity)}%
          </span>
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