import { StyledCustomTooltip, StyledTooltipValue } from "../../Styles/pages/PlantDetails.style";

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
export default CustomTooltip;