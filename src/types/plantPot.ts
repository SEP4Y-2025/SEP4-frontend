// export type Pot ={
//   _id: string;
//   name: string;
//   plant_type_id: string;
//   environment_id: string;
//   water_tank_id: string;
//   soil_humidity: number;
// }

export type Pot = {
  pot_id: string;           
  name: string;
  plant_type_id: string;  
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
