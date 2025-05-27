export type Pot = {
  pot_id: string;
  label: string;
  plant_type_id: string;
  environment_id: string;
  watering_frequency: number;
  water_dosage: number;
  state?: {
    soil_humidity: number;
    air_humidity: number;
    temperature: number;
    light_intensity: number;
    water_level: number;
    water_tank_capacity: number;
    measured_at: string;
  };
};

export type SoilHumidityPrediction = {
  plant_pot_id: string;
  current_timestamp: string;
  prediction_timestamp: string;
  current_soil_humidity: number;
  predicted_soil_humidity: number;
  features_used: string[];
  prediction_method: string;
};
