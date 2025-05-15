
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import "./PlantDetails.css";
import { useWaterStatus } from "../hooks/useWaterStatus";
import { useDeletePot } from "../hooks/useDeletePot";

const PlantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {deletePot}=useDeletePot()
  const navigate = useNavigate();
  const { pots, plantTypes, loading, error } = useEnvironmentCtx();

  const pot = pots.find((p) => p.pot_id === id);
  const plantType = pot
    ? plantTypes.find((type) => type._id === pot.plant_type_id)
    : null;

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

  const { waterPercentage, status: waterStatus } = useWaterStatus(
    pot?.state?.water_level || 0,
    pot?.state?.water_tank_capacity || 1
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pot || !plantType) return <div>Plant not found</div>;

  const getStateValue = (stateArray: any): number => {
    if (stateArray && Array.isArray(stateArray) && stateArray.length > 1) {
      return Number(stateArray[1]);
    }
    return 0;
  };

  const temperatureValue = pot.state?.temperature || 0;
  const soilHumidityValue = pot.state?.soil_humidity || 0;
  const airHumidityValue = pot.state?.air_humidity || 0;
  const lightIntensityValue = pot.state?.light_intensity || 0;

  const waterLevel = pot.state?.water_level || 0;
  const waterCapacity = pot.state?.water_tank_capacity || 1;


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
        
        <div className="metric-box">
          <h3>Light Intensity:</h3>
          <div className="circular-metric light">
            <div className="metric-value" data-testid="light-intensity">
              {lightIntensityValue}%
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