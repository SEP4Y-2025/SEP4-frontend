import React from "react";
import { useNavigate } from "react-router-dom";
import plantImage from "../images/image.png";
import "./Pot.css";

interface PotProps {
  id: string;
  label: string;
  soilHumidity?: number;
  typeName: string;
}

const Pot: React.FC<PotProps> = ({ id, label, soilHumidity = 0, typeName }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log(`Navigating to plant details for pot: ${id}`);
    navigate(`/plant/${id}`);
  };
  
  return (
    <div className="pot-container" onClick={handleClick}>
      <div className="pot-image">
        <img src={plantImage} alt="Plant pot" />
      </div>
      <div className="pot-name">{label}</div>
      {soilHumidity > 0 && (
        <div className="pot-humidity">Humidity: {soilHumidity}%</div>
      )}
    </div>
  );
};

export default Pot;