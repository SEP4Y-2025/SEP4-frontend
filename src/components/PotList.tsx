import React from "react";
import Pot from "./Pot";

interface PotData {
  _id: string;
  plant_type_id: string;
  soil_humidity: number;
  environment_id: string;
  water_tank_id: string;
}

interface PotListProps {
  pots: PotData[];
  typeName: string;
}

const PotList: React.FC<PotListProps> = ({ pots, typeName }) => {
  // Sort pots by ID (alpha-numerically)
  const sortedPots = [...pots].sort((a, b) => a._id.localeCompare(b._id));
  
  return (
    <div className="pots-grid">
      {sortedPots.map((pot) => (
        <Pot 
          key={pot._id} 
          id={pot._id} 
          label={pot._id} 
          soilHumidity={pot.soil_humidity}
          typeName={typeName}
        />
      ))}
    </div>
  );
};

export default PotList;