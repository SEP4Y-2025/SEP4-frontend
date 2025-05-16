import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { useWaterStatus } from "../hooks/useWaterStatus";
import { useDeletePot } from "../hooks/useDeletePot";
import {
  StyledPlantDetailsPage,
  StyledDetailsCard,
  StyledDetailRow,
  StyledMetricsContainer,
  StyledMetricBox,
  StyledCircularMetric,
  StyledWaterTankVisual,
  StyledWaterTankContainer,
  StyledWaterTankLevel,
  StyledWaterTankPercentage,
  StyledTankLabels,
  StyledSaveButton,
  StyledDeleteButton,
} from "../Styles/pages/PlantDetails.style";
import { Title } from "../Styles/common/Title.style";
import { Flex } from "../Styles/common/Flex";

const PlantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { deletePot } = useDeletePot();
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

  //   if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error}</div>;
  //   if (!pot || !plantType) return <div>Plant not found</div>;

  const temperatureValue = pot.state?.temperature || 0;
  const soilHumidityValue = pot.state?.soil_humidity || 0;
  const airHumidityValue = pot.state?.air_humidity || 0;
  const lightIntensityValue = pot.state?.light_intensity || 0;

  const waterLevel = pot.state?.water_level || 0;
  const waterCapacity = pot.state?.water_tank_capacity || 1;

  return (
    <StyledPlantDetailsPage>
      <Title>Plant Details</Title>

      <StyledDetailsCard>
        <StyledDetailRow>
          <span className="detail-label">Name</span>
          <span className="detail-value">{pot.name}</span>
        </StyledDetailRow>
        <StyledDetailRow>
          <span className="detail-label">Type Details</span>
          <span className="detail-value with-arrow">{plantType.name} ▼</span>
        </StyledDetailRow>
        <StyledDetailRow>
          <span className="detail-label">Watering Frequency</span>
          <span className="detail-value">{plantType.water_frequency}</span>
        </StyledDetailRow>
        <StyledDetailRow>
          <span className="detail-label">Dosage ml</span>
          <span className="detail-value">{plantType.water_dosage}</span>
        </StyledDetailRow>
      </StyledDetailsCard>

      <StyledMetricsContainer>
        <StyledMetricBox>
          <h3>Temperature:</h3>
          <StyledCircularMetric className="temperature">
            <div className="metric-value" data-testid="temperature">
              {temperatureValue}°C
            </div>
          </StyledCircularMetric>
        </StyledMetricBox>

        <StyledMetricBox>
          <h3>Soil Humidity:</h3>
          <StyledCircularMetric className="soil">
            <div className="metric-value" data-testid="soil-humidity">
              {soilHumidityValue}%
            </div>
          </StyledCircularMetric>
        </StyledMetricBox>

        <StyledMetricBox>
          <h3>Air Humidity:</h3>
          <StyledCircularMetric className="air">
            <div className="metric-value" data-testid="air-humidity">
              {airHumidityValue}%
            </div>
          </StyledCircularMetric>
        </StyledMetricBox>

        <StyledMetricBox>
          <h3>Light Intensity:</h3>
          <StyledCircularMetric className="light">
            <div className="metric-value" data-testid="light-intensity">
              {lightIntensityValue}%
            </div>
          </StyledCircularMetric>
        </StyledMetricBox>
      </StyledMetricsContainer>

      <StyledDetailsCard>
        <h2>Water Tank Status</h2>

        <StyledDetailRow>
          <span className="detail-label">Current Level</span>
          <span className="detail-value">{waterLevel} ml</span>
        </StyledDetailRow>

        <StyledDetailRow>
          <span className="detail-label">Total Capacity</span>
          <span className="detail-value">{waterCapacity} ml</span>
        </StyledDetailRow>

        <StyledDetailRow>
          <span className="detail-label">Status</span>
          <span className="detail-value">{waterStatus}</span>
        </StyledDetailRow>

        <StyledWaterTankVisual>
          <StyledWaterTankContainer>
            <StyledWaterTankLevel $waterPercentage={waterPercentage} />
          </StyledWaterTankContainer>
          <StyledWaterTankPercentage>
            {waterPercentage}%
          </StyledWaterTankPercentage>
          <StyledTankLabels>
            <span>0 ml</span>
            <span>{waterCapacity} ml</span>
          </StyledTankLabels>
        </StyledWaterTankVisual>
      </StyledDetailsCard>

      <Flex $justifyC="center" $gap="20px" $width="600px" $margin="40px auto 0">
        <StyledSaveButton onClick={handleSave}>Go Back</StyledSaveButton>
        <StyledDeleteButton onClick={handleDelete}>
          Delete Plant
        </StyledDeleteButton>
      </Flex>
    </StyledPlantDetailsPage>
  );
};

export default PlantDetails;
