import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { useWaterStatus } from "../hooks/useWaterStatus";
import { useDeletePot } from "../hooks/useDeletePot";
import { useSoilHumidityPrediction } from "../hooks/useSoilHumidityPrediction";
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
  StyledSoilHumidityPrediction,
  StyledPredictionGraph,
  StyledTestingNote,
  StyledTimeSelector,
  StyledTimeSelectorLabel,
  StyledTimeSelectorDropdown,
  StyledLoadingMessage,
  StyledErrorMessage,
  StyledCustomTooltip,
  StyledTooltipValue,
} from "../Styles/pages/PlantDetails.style";
import { Title } from "../Styles/common/Title.style";
import { Flex } from "../Styles/common/Flex";
import { PlantType, Pot } from "../types";
import { useGetPotById } from "../hooks/useGetPotById";
import { useAuth } from "../contexts/UserAuthContext";
import { useGetTypesByEnvironment } from "../hooks/useGetTypesByEnvironment";

const PlantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { deletePot } = useDeletePot();
  const { environmentID } = useEnvironmentCtx();
  const { user } = useAuth();
  const { pot } = useGetPotById(user!.user_id, environmentID);
  const { types } = useGetTypesByEnvironment(environmentID);
  const navigate = useNavigate();
  console.log(pot?.label);
  console.log(environmentID);

  // State for prediction time selection
  const [predictionMinutes, setPredictionMinutes] = useState<number>(5);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // const pott = pots.find((p) => p.pot_id === id);
  const type = pot
    ? types.find((type) => type._id === pot.plant_type_id)
    : null;

  const {
    prediction,
    loading: predictionLoading,
    error: predictionError,
  } = useSoilHumidityPrediction(id || "", predictionMinutes);

  const handleSave = () => navigate("/plants");

  const handleDelete = async () => {
    if (!pot) return;

    const environmentId = "680f8359688cb5341f9f9c19";

    if (
      window.confirm(
        `Are you sure you want to delete ${pot.label}? This action cannot be undone.`
      )
    ) {
      setIsDeleting(true);

      try {
        const success = await deletePot(id!, environmentId);

        if (success) {
          alert(`${pot.label} has been successfully deleted.`);

          // await refreshEnvironmentData();

          navigate("/plants");
        } else {
          alert("Failed to delete the plant. Please try again.");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete the plant. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Handle prediction time change
  const handlePredictionTimeChange = (minutes: number) => {
    setPredictionMinutes(minutes);
  };

  const getTimeDisplayText = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    if (minutes < 1440)
      return `${minutes / 60} hour${minutes / 60 !== 1 ? "s" : ""}`;
    return `${minutes / 1440} day${minutes / 1440 !== 1 ? "s" : ""}`;
  };

  // Prepare data for the chart
  const chartData = prediction
    ? [
        {
          name: "Current",
          value: prediction.current_soil_humidity,
          type: "current",
        },
        {
          name: `Predicted (${getTimeDisplayText(predictionMinutes)})`,
          value: prediction.predicted_soil_humidity,
          type: "predicted",
        },
      ]
    : [];

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const color = data.payload.type === "current" ? "#8fd28f" : "#4a9eff";
      return (
        <StyledCustomTooltip>
          <p>{label}</p>
          <StyledTooltipValue $color={color}>
            {`Soil Humidity: ${data.value}%`}
          </StyledTooltipValue>
        </StyledCustomTooltip>
      );
    }
    return null;
  };

  const { waterPercentage, status: waterStatus } = useWaterStatus(
    pot?.state?.water_level || 0,
    pot?.state?.water_tank_capacity || 1
  );

  //   if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error}</div>;
  //   if (!pot || !plantType) return <div>Plant not found</div>;

  const temperatureValue = pot!.state?.temperature || 0;
  const soilHumidityValue = pot!.state?.soil_humidity || 0;
  const airHumidityValue = pot!.state?.air_humidity || 0;
  const lightIntensityValue = pot!.state?.light_intensity || 0; //TODO PROMISE POT INSTEAD

  const waterLevel = pot!.state?.water_level || 0;
  const waterCapacity = pot!.state?.water_tank_capacity || 1;

  return (
    <StyledPlantDetailsPage>
      <Title>Plant Details</Title>

      <StyledDetailsCard>
        <StyledDetailRow>
          <span className="detail-label">Name</span>
          <span className="detail-value">{pot!.label}</span>
        </StyledDetailRow>
        <StyledDetailRow>
          <span className="detail-label">Type Details</span>
          <span className="detail-value with-arrow">{type!.name} ▼</span>
        </StyledDetailRow>
        <StyledDetailRow>
          <span className="detail-label">Watering Frequency</span>
          <span className="detail-value">
            {type!.watering_frequency ||
              type!.watering_frequency ||
              "Not specified"}
          </span>
        </StyledDetailRow>
        <StyledDetailRow>
          <span className="detail-label">Dosage ml</span>
          <span className="detail-value">{type!.water_dosage}</span>
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

      {/* Soil Humidity Prediction Section */}
      <StyledSoilHumidityPrediction>
        <h2>Current Soil Humidity for {pot!.label}</h2>
        <StyledTestingNote>
          (Currently displaying predictions for pot_1 for testing purposes)
        </StyledTestingNote>

        {/* Time Selection for Predictions */}
        <StyledTimeSelector>
          <StyledTimeSelectorLabel>Prediction Time:</StyledTimeSelectorLabel>
          <StyledTimeSelectorDropdown
            value={predictionMinutes}
            onChange={(e) => handlePredictionTimeChange(Number(e.target.value))}
          >
            <optgroup label="Minutes">
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={11}>11 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
            </optgroup>
            <optgroup label="Hours">
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={180}>3 hours</option>
              <option value={240}>4 hours</option>
              <option value={360}>6 hours</option>
              <option value={480}>8 hours</option>
              <option value={720}>12 hours</option>
            </optgroup>
            <optgroup label="Days">
              <option value={1440}>1 day</option>
              <option value={2880}>2 days</option>
              <option value={4320}>3 days</option>
              <option value={7200}>5 days</option>
              <option value={10080}>1 week</option>
              <option value={20160}>2 weeks</option>
              <option value={43200}>1 month</option>
            </optgroup>
          </StyledTimeSelectorDropdown>
        </StyledTimeSelector>

        {predictionLoading && (
          <StyledLoadingMessage>Loading prediction...</StyledLoadingMessage>
        )}
        {predictionError && (
          <StyledErrorMessage>
            Error loading prediction: {predictionError}
          </StyledErrorMessage>
        )}

        {prediction && (
          <div>
            <StyledDetailRow>
              <span className="detail-label">Prediction for Pot ID</span>
              <span className="detail-value">{prediction.plant_pot_id}</span>
            </StyledDetailRow>
            <StyledDetailRow>
              <span className="detail-label">Current Soil Humidity</span>
              <span className="detail-value">
                {prediction.current_soil_humidity}%
              </span>
            </StyledDetailRow>
            <StyledDetailRow>
              <span className="detail-label">
                Predicted Soil Humidity ({predictionMinutes} min)
              </span>
              <span className="detail-value">
                {prediction.predicted_soil_humidity}%
              </span>
            </StyledDetailRow>
            <StyledDetailRow>
              <span className="detail-label">Prediction Method</span>
              <span className="detail-value">
                {prediction.prediction_method}
              </span>
            </StyledDetailRow>

            <StyledPredictionGraph>
              <h3>
                Soil Humidity Prediction Graph (
                {getTimeDisplayText(predictionMinutes)})
              </h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    barCategoryGap="20%"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 14, fill: "#333" }}
                      tickLine={{ stroke: "#ccc" }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 14, fill: "#333" }}
                      tickLine={{ stroke: "#ccc" }}
                      label={{
                        value: "Humidity (%)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      <Cell fill="#8fd28f" />
                      <Cell fill="#4a9eff" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </StyledPredictionGraph>
          </div>
        )}
      </StyledSoilHumidityPrediction>

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
        <StyledDeleteButton onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : `Delete ${pot!.label}`}
        </StyledDeleteButton>
      </Flex>
    </StyledPlantDetailsPage>
  );
};

export default PlantDetails;
