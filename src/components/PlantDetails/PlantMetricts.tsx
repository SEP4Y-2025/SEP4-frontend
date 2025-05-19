import React from "react";
import {
    StyledMetricsContainer,
    StyledMetricBox,
    StyledCircularMetric,
} from "../../Styles/pages/PlantDetails.style";

interface PlantMetricsProps {
    temperature: number;
    soilHumidity: number;
    airHumidity: number;
    lightIntensity: number;
}

const PlantMetrics: React.FC<PlantMetricsProps> = ({
    temperature,
    soilHumidity,
    airHumidity,
    lightIntensity,
}) => (
    <StyledMetricsContainer>
        <StyledMetricBox>
            <h3>Temperature:</h3>
            <StyledCircularMetric className="temperature">
                <div className="metric-value" data-testid="temperature">
                    {temperature}°C
                </div>
            </StyledCircularMetric>
        </StyledMetricBox>

        <StyledMetricBox>
            <h3>Soil Humidity:</h3>
            <StyledCircularMetric className="soil">
                <div className="metric-value" data-testid="soil-humidity">
                    {soilHumidity}%
                </div>
            </StyledCircularMetric>
        </StyledMetricBox>

        <StyledMetricBox>
            <h3>Air Humidity:</h3>
            <StyledCircularMetric className="air">
                <div className="metric-value" data-testid="air-humidity">
                    {airHumidity}%
                </div>
            </StyledCircularMetric>
        </StyledMetricBox>

        <StyledMetricBox>
            <h3>Light Intensity:</h3>
            <StyledCircularMetric className="light">
                <div className="metric-value" data-testid="light-intensity">
                    {lightIntensity}%
                </div>
            </StyledCircularMetric>
        </StyledMetricBox>
    </StyledMetricsContainer>
);

export default PlantMetrics;