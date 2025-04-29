import React from "react";
import Pot from "./Pot";

interface PotData {
  _id: string;
  soil_humidity: number;
}

interface PotListProps {
  pots: PotData[];
}

const PotList: React.FC<PotListProps> = ({ pots }) => {
  // Sort pots by ID (alpha-numerically)
  const sortedPots = [...pots].sort((a, b) => a._id.localeCompare(b._id));

  return (
    <div className="pots-grid">
      {sortedPots.map((pot) => (
        <Pot key={pot._id} label={pot._id} soilHumidity={pot.soil_humidity} />
      ))}
    </div>
  );
};

export default PotList;
