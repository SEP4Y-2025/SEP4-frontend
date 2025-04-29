import React from "react";
import plantImage from "../images/image.png";
import "./Pot.css"

interface PotProps{
    label: string;
    soilHumidity: number;
}

const Pot: React.FC<PotProps> = ({ label, soilHumidity }) => {
    return (
        <div className="pot-container">
            <div className= "pot-image">
                <img src={plantImage} alt="Plant pot"/>

            </div>
            <div className="pot-info">
                <div className="pot-label">{label}</div>

            </div>
        </div>
    );
};
export default Pot;
