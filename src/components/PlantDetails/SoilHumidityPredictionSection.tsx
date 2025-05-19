import React from "react";
import {
    StyledSoilHumidityPrediction,
    StyledTestingNote,
    StyledTimeSelector,
    StyledTimeSelectorLabel,
    StyledTimeSelectorDropdown,
    StyledLoadingMessage,
    StyledErrorMessage,
    StyledDetailRow,
    StyledPredictionGraph,
} from "../../Styles/pages/PlantDetails.style";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

interface SoilHumidityPredictionSectionProps {
    prediction: any;
    predictionMinutes: number;
    onPredictionTimeChange: (minutes: number) => void;
    loading: boolean;
    error: string | null;
    getTimeDisplayText: (minutes: number) => string;
    chartData: any[];
    CustomTooltip: React.FC<any>;
    potLabel: string;
}

const SoilHumidityPredictionSection: React.FC<SoilHumidityPredictionSectionProps> = ({
    prediction,
    predictionMinutes,
    onPredictionTimeChange,
    loading,
    error,
    getTimeDisplayText,
    chartData,
    CustomTooltip,
    potLabel,
}) => (
    <StyledSoilHumidityPrediction>
        <h2>Current Soil Humidity for {potLabel}</h2>
        <StyledTestingNote>
            (Currently displaying predictions for pot_1 for testing purposes)
        </StyledTestingNote>

        {/* Time Selection for Predictions */}
        <StyledTimeSelector>
            <StyledTimeSelectorLabel>Prediction Time:</StyledTimeSelectorLabel>
            <StyledTimeSelectorDropdown
                value={predictionMinutes}
                onChange={(e) => onPredictionTimeChange(Number(e.target.value))}
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

        {loading && (
            <StyledLoadingMessage>Loading prediction...</StyledLoadingMessage>
        )}
        {error && (
            <StyledErrorMessage>
                Error loading prediction: {error}
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
);

export default SoilHumidityPredictionSection;