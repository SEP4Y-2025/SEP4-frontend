import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import {deletePot} from "../services/plantPotsApi";
import "./PlantDetails.css";

const PlantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pots, plantTypes, loading, error } = useEnvironmentCtx();

  // Debug logs to help troubleshoot
  console.log('PlantDetails - Looking for pot with id:', id);
  console.log('PlantDetails - Available pots:', pots);
  console.log('PlantDetails - Available plant types:', plantTypes);

  // Updated to use pot_id instead of potId
  const pot = pots.find((p) => p.pot_id === id);
  const plantType = pot
    ? plantTypes.find((type) => type._id === pot.plant_type_id)
    : null;

  console.log('PlantDetails - Found pot:', pot);
  console.log('PlantDetails - Found plant type:', plantType);

  const handleSave = () => navigate("/plants");
  const handleDelete = async () => {
    const environmentId = "680f8359688cb5341f9f9c19"; 
    //Hardcoded environment ID for now
    if (window.confirm("Are you sure you want to delete this plant?")) {
      try {
        await deletePot(id!, environmentId); 
        navigate("/plants");
        window.location.reload();
      } catch (error) {
        alert("Failed to delete plant.");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pot || !plantType) {
    return (
      <div>
        <div>Plant not found</div>
        <div>Debug info:</div>
        <div>ID: {id}</div>
        <div>Pot found: {pot ? 'Yes' : 'No'}</div>
        <div>Plant type found: {plantType ? 'Yes' : 'No'}</div>
        <div>Total pots: {pots.length}</div>
        <div>Total plant types: {plantTypes.length}</div>
      </div>
    );
  }

  // Updated to use the new state structure
  const temperatureValue = pot.state?.temperature || 0;
  const soilHumidityValue = pot.state?.soil_humidity || 0;
  const airHumidityValue = pot.state?.air_humidity || 0;
  
  // Calculate water percentage using the new state fields
  const waterLevel = pot.state?.water_level || 0;
  const waterCapacity = pot.state?.water_tank_capacity || 1;
  const waterPercentage = Math.round((waterLevel / waterCapacity) * 100);

  // Determine water tank status based on percentage
  const getWaterStatus = (percentage: number) => {
    if (percentage < 20) return "Low";
    if (percentage < 50) return "Medium";
    return "Good";
  };

  const waterStatus = getWaterStatus(waterPercentage);

  return (
    <div className="plant-details-page">
      <h1>Plant Details</h1>

      <div className="details-card">
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

      <div className="metrics-container">
        <div className="metric-box">
          <h3>Temperature:</h3>
          <div className="circular-metric temperature">
            <div className="metric-value" data-testid="temperature">
              {temperatureValue}°C
            </div>
          </div>
        </div>
        
        <div className="metric-box">
          <h3>Soil Humidity:</h3>
          <div className="circular-metric soil">
            <div className="metric-value" data-testid="soil-humidity">
              {soilHumidityValue}%
            </div>
          </div>
        </div>
        
        <div className="metric-box">
          <h3>Air Humidity:</h3>
          <div className="circular-metric air">
            <div className="metric-value" data-testid="air-humidity">
              {airHumidityValue}%
            </div>
          </div>
        </div>
      </div>

      <div className="details-card">
        <h2>Water Tank Status</h2>
        
        <div className="detail-row">
          <span className="detail-label">Current Level</span>
          <span className="detail-value">{waterLevel} ml</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Total Capacity</span>
          <span className="detail-value">{waterCapacity} ml</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Status</span>
          <span className="detail-value">{waterStatus}</span>
        </div>
        
        <div className="water-tank-visual">
          <div className="water-tank-container">
            <div 
              className="water-tank-level" 
              style={{ width: `${waterPercentage}%` }}
            ></div>
          </div>
          <div className="water-tank-percentage">{waterPercentage}%</div>
          <div className="tank-labels">
            <span>0 ml</span>
            <span>{waterCapacity} ml</span>
          </div>
        </div>
      </div>

      <div className="button-container">
        <button className="save-button" onClick={handleSave}>
          Go Back
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete Plant
        </button>
      </div>
    </div>
  );
};

export default PlantDetails;