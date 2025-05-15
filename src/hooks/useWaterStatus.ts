import { useState, useEffect } from "react";

export const useWaterStatus = (waterLevel: number = 0, waterCapacity: number = 1) => {
  const [waterPercentage, setWaterPercentage] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

  const calculateWaterStatus = () => {
    const percentage = Math.round((waterLevel / waterCapacity) * 100);
    setWaterPercentage(percentage);

    if (percentage < 20) setStatus("Low");
    else if (percentage < 50) setStatus("Medium");
    else setStatus("Good");
  };

  useEffect(() => {
    calculateWaterStatus();
  }, [waterLevel, waterCapacity]);

  return { waterPercentage, status };
};