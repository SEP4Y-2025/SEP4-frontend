import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { useGetPotById } from "../hooks/useGetPotById";
import "./PlantDetails.css";
import { useDeletePot } from "../hooks/useDeletePot";

const PlantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { deletePot } = useDeletePot();
  const navigate = useNavigate();
  const { plantTypes, environmentID } = useEnvironmentCtx();

  // Use the hook to get pot details
  const { pot, loading: potLoading, error: potError } = useGetPotById(id!, environmentID);

  console.log('PlantDetails - Looking for pot with id:', id);
  console.log('PlantDetails - Environment ID:', environmentID);
  console.log('PlantDetails - Fetched pot:', pot);
  console.log('PlantDetails - Available plant types:', plantTypes);

  // Find plant type based on the pot's plant_type_id with ObjectId handling
  const plantType = pot
    ? plantTypes.find((type) => {
        // Handle ObjectId conversion for both pot's plant_type_id and type's _id
        const typeId = typeof type._id === 'object' && (type._id as any).$oid 
          ? (type._id as any).$oid 
          : type._id;
        const potTypeId = typeof pot.plant_type_id === 'object' && (pot.plant_type_id as any).$oid
          ? (pot.plant_type_id as any).$oid
          : pot.plant_type_id;
        
        console.log('Comparing type._id:', typeId, 'with pot.plant_type_id:', potTypeId);
        return typeId === potTypeId;
      })
    : null;

  console.log('PlantDetails - Found plant type:', plantType);

  const handleSave = () => navigate("/plants");
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      try {
        await deletePot(id!, environmentID);
        navigate("/plants");
        window.location.reload();
      } catch (error) {
        console.error('Delete error:', error);
        alert("Failed to delete plant.");
      }
    }
  };

  if (potLoading) return <div>Loading...</div>;
  if (potError) return <div>Error: {potError.message}</div>;
  
  if (!pot || !plantType) {
    return (
      <div style={{ padding: '20px' }}>
        <div>Plant not found</div>
        <div><strong>Debug info:</strong></div>
        <div>ID: {id}</div>
        <div>Environment ID: {environmentID}</div>
        <div>Pot found: {pot ? 'Yes' : 'No'}</div>
        <div>Plant type found: {plantType ? 'Yes' : 'No'}</div>
        <div>Total plant types: {plantTypes.length}</div>
        {pot && (
          <div>
            <div>Found pot ID: {typeof pot.pot_id === 'object' ? JSON.stringify(pot.pot_id) : pot.pot_id}</div>
            <div>Found pot type ID: {typeof pot.plant_type_id === 'object' ? JSON.stringify(pot.plant_type_id) : pot.plant_type_id}</div>
          </div>
        )}
        {plantTypes.length > 0 && (
          <div>
            <div>Available plant types:</div>
            <pre>{JSON.stringify(plantTypes.map(pt => ({ _id: pt._id, name: pt.name })), null, 2)}</pre>
          </div>
        )}
        <button onClick={() => navigate("/plants")}>Go Back</button>
      </div>
    );
  }

  // Updated to use the new state structure
  const temperatureValue = pot.state?.temperature || 0;
  const soilHumidityValue = pot.state?.soil_humidity || 0;
  const airHumidityValue = pot.state?.air_humidity || 0;
  const lightIntensityValue = pot.state?.light_intensity || 0;

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
          <span className="detail-value">{plantType.water_frequency}x/week</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Dosage</span>
          <span className="detail-value">{plantType.water_dosage} ml</span>
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