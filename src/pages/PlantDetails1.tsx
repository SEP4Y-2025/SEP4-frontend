import { CircularProgress } from "@mui/material";
import { Title } from "../Styles/common/Title.style";
import { Overlay } from "../Styles/modal/Overlay.style";
import { StyledPlantDetailsPage } from "../Styles/pages/PlantDetails.style";
import { useNavigate, useParams } from "react-router-dom";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { useAuth } from "../contexts/UserAuthContext";
import PlantInfoCard from "../components/PlantDetails/PlantInfoCard";
import { useWaterStatus } from "../hooks/potStatistics/useWaterStatus";
import CustomTooltip from "../components/PlantDetails/CustomToolTip";
import PlantMetrics from "../components/PlantDetails/PlantMetricts";
import SoilHumidityPredictionSection from "../components/PlantDetails/SoilHumidityPredictionSection";
import WaterTankStatus from "../components/PlantDetails/WaterTankStatus";
import ActionButtons from "../components/PlantDetails/ActionButtons";
import { usePotWithType } from "../hooks/plantDetails/usePotWithTypeResults";
import { useSoilHumidityPredictionWithChart } from "../hooks/plantDetails/useSoilHumidityPredictionWithChart";
import { usePotDelete } from "../hooks/plantDetails/usePotDelete";

const PlantDetails1 = () => {
    const { id } = useParams<{ id: string }>();
    const { environmentID } = useEnvironmentCtx();
    const { user } = useAuth();

    const { pot, type, loading, errorMessage } = usePotWithType(id, environmentID, user!);

    const {
        prediction,
        predictionLoading,
        predictionError,
        predictionMinutes,
        setPredictionMinutes,
        handlePredictionTimeChange,
        getTimeDisplayText,
        chartData,
    } = useSoilHumidityPredictionWithChart(id || "");

    const { waterPercentage, status: waterStatus } = useWaterStatus(
        pot?.state?.water_level || 0,
        pot?.state?.water_tank_capacity || 1
    );

    const navigate = useNavigate();
    const handleSave = () => navigate("/plants");

    const { handleDelete, isDeleting } = usePotDelete(pot, id, environmentID);


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
                prediction={prediction!}
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
