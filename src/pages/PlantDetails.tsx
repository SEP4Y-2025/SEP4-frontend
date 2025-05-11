import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import EditPlantPotLabel from "../components/MyPlants/EditPlantPotLabel";
import "./PlantDetails.css";

const PlantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pots, plantTypes, loading, error } = useEnvironmentCtx();

  const pot = pots.find((p) => p.potId === id);
  const plantType = pot
    ? plantTypes.find((type) => type._id === pot.plantTypeId)
    : null;

  const handleSave = () => navigate("/plants");
  const handleDelete = () => alert("Delete functionality would go here");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pot || !plantType) return <div>Plant not found</div>;

  const getStateValue = (stateArray: any): number => {
    if (stateArray && Array.isArray(stateArray) && stateArray.length > 1) {
      return Number(stateArray[1]);
    }
    return 0;
  };

  const temperatureValue = getStateValue(pot.state.temperature);

  return (
    <div className="plant-details-page">
      <h1>Plant Details</h1>

      <div className="details-card">
        <div className="detail-row">
        <span className="detail-label">Name</span>
        <EditPlantPotLabel
          potName={pot.name}
          onSave={(newName) => { pot.name = newName; }}
        />
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
      </div>

      <div className="button-container">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete Plant
        </button>
      </div>
    </div>
  );
};

export default PlantDetails;
