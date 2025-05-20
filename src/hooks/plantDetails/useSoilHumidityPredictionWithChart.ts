import { useState, useCallback } from "react";
import { useSoilHumidityPrediction } from "../potStatistics/useSoilHumidityPrediction";

// Utility for time display
const getTimeDisplayText = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    if (minutes < 1440)
        return `${minutes / 60} hour${minutes / 60 !== 1 ? "s" : ""}`;
    return `${minutes / 1440} day${minutes / 1440 !== 1 ? "s" : ""}`;
};

export function useSoilHumidityPredictionWithChart(potId: string) {
    const [predictionMinutes, setPredictionMinutes] = useState<number>(5);

    const {
        prediction,
        loading: predictionLoading,
        error: predictionError,
    } = useSoilHumidityPrediction(potId, predictionMinutes);

    // Chart data for recharts
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

    // Handler for time change
    const handlePredictionTimeChange = useCallback(
        (minutes: number) => setPredictionMinutes(minutes),
        []
    );

    return {
        prediction,
        predictionLoading,
        predictionError,
        predictionMinutes,
        setPredictionMinutes,
        handlePredictionTimeChange,
        getTimeDisplayText,
        chartData,
    };
}