import { CircularProgress } from "@mui/material";
import { Title } from "../Styles/common/Title.style";
import { Overlay } from "../Styles/modal/Overlay.style";
import { StyledCustomTooltip, StyledPlantDetailsPage, StyledTooltipValue } from "../Styles/pages/PlantDetails.style";
import { useNavigate, useParams } from "react-router-dom";
import { useDeletePot } from "../hooks/pots/useDeletePot";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { useAuth } from "../contexts/UserAuthContext";
import { useEffect, useState } from "react";
import { useGetPotById } from "../hooks/pots/useGetPotById";
import { useGetTypesByEnvironment } from "../hooks/pots/useGetTypesByEnvironment";
import { useSoilHumidityPrediction } from "../hooks/potStatistics/useSoilHumidityPrediction";
import PlantInfoCard from "../components/PlantDetails/PlantInfoCard";
import { useWaterStatus } from "../hooks/potStatistics/useWaterStatus";
import CustomTooltip from "../components/PlantDetails/CustomToolTip";
import PlantMetrics from "../components/PlantDetails/PlantMetricts";
import SoilHumidityPredictionSection from "../components/PlantDetails/SoilHumidityPredictionSection";
import WaterTankStatus from "../components/PlantDetails/WaterTankStatus";
import ActionButtons from "../components/PlantDetails/ActionButtons";

const PlantDetails1 = () => {
    const { id } = useParams<{ id: string }>();
    const { environmentID } = useEnvironmentCtx();
    const { user } = useAuth();


    const { deletePot, } = useDeletePot();
    const [potIdReady, setPotIdReady] = useState(false);

    useEffect(() => {
        if (id && environmentID && user?.user_id) {
            setPotIdReady(true);
        }
    }, [id, environmentID, user]);

    const { pot, loading, error } = useGetPotById(
        potIdReady ? id! : "",
        potIdReady ? environmentID : ""
    );
    const { types } = useGetTypesByEnvironment(environmentID);
    const navigate = useNavigate();

    // const pott = pots.find((p) => p.pot_id === id);
    const type = pot
        ? types.find((type) => type._id === pot.plant_type_id)
        : null;
    // State for prediction time selection
    const [predictionMinutes, setPredictionMinutes] = useState<number>(5);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);


    const {
        prediction,
        loading: predictionLoading,
        error: predictionError,
    } = useSoilHumidityPrediction(id || "", predictionMinutes);

    const handleSave = () => navigate("/plants");

    const handleDelete = async () => {
        if (!pot) return;

        if (
            window.confirm(
                `Are you sure you want to delete ${pot.label}? This action cannot be undone.`
            )
        ) {
            setIsDeleting(true);

            try {
                const success = await deletePot(id!, environmentID);

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



    const { waterPercentage, status: waterStatus } = useWaterStatus(
        pot?.state?.water_level || 0,
        pot?.state?.water_tank_capacity || 1
    );

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
    if (!pot) return <div>Plant not found</div>;
    if (!type)
        return (
            <div>
                type error {pot.label} {pot.plant_type_id} {pot.pot_id}
            </div>
        );

    const temperatureValue = pot!.state?.temperature || 0;
    const soilHumidityValue = pot!.state?.soil_humidity || 0;
    const airHumidityValue = pot!.state?.air_humidity || 0;
    const lightIntensityValue = pot!.state?.light_intensity || 0; //TODO PROMISE POT INSTEAD

    const waterLevel = pot!.state?.water_level || 0;
    const waterCapacity = pot!.state?.water_tank_capacity || 1;

    return (
        <StyledPlantDetailsPage>
            <Title>Plant Details</Title>
            <PlantInfoCard pot={pot} type={type} />
            <PlantMetrics
                temperature={temperatureValue}
                soilHumidity={soilHumidityValue}
                airHumidity={airHumidityValue}
                lightIntensity={lightIntensityValue}
            />
            <SoilHumidityPredictionSection
                prediction={prediction}
                predictionMinutes={predictionMinutes}
                onPredictionTimeChange={handlePredictionTimeChange}
                loading={predictionLoading}
                error={predictionError}
                getTimeDisplayText={getTimeDisplayText}
                chartData={chartData}
                CustomTooltip={CustomTooltip}
                potLabel={pot.label}
            />
            <WaterTankStatus
                waterLevel={waterLevel}
                waterCapacity={waterCapacity}
                waterStatus={waterStatus}
                waterPercentage={waterPercentage}
            />
            <ActionButtons
                onSave={handleSave}
                onDelete={handleDelete}
                isDeleting={isDeleting}
                potLabel={pot.label}
            />
            {loading && (
                <Overlay>
                    <CircularProgress size={80} />
                </Overlay>
            )}
        </StyledPlantDetailsPage>
    );
}
export default PlantDetails1;
