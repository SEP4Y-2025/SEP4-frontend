export type Pot = {
  pot_id: string;           // Changed from potId
  name: string;
  plant_type_id: string;    // Changed from plantTypeId
  state?: {
    air_humidity?: number;
    temperature?: number;
    soil_humidity?: number;
    light_intensity?: number;
    water_level?: number;
    water_tank_capacity?: number;
    measured_at?: string;
  };
};