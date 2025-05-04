import React from "react";
import { useNavigate } from "react-router-dom";
import Pot from "../../assets/pot.svg";
import "./PotCard.css";


interface PotCardProps {
    id: string;
    plantName: string;
    onClick?: () => void;
}

const PotCard: React.FC<PotCardProps> = ({id, plantName }) => {
    const navigate = useNavigate();
    return (
        <button className="pot-card" onClick={() => navigate(`/plant-details/${id}`)}>
            <img src={Pot} alt="Plant Icon" className="pot-icon" />
            <div className="pot-name">{plantName}</div>
        </button>
    );
};

export default PotCard;