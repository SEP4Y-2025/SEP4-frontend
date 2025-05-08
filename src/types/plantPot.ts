// export type Pot ={
//   _id: string;
//   name: string;
//   plant_type_id: string;
//   environment_id: string;
//   water_tank_id: string;
//   soil_humidity: number;
// }

export type State ={
  airHumidity: [];
  temperature: [];
  soilHumidity: [];
}
export type Pot ={
  potId: string;
  name: string;
  state:State
  plantTypeId: string;
  waterTank:WaterTank;
}
export type WaterTank={
  capacityMl:number;
  currentLevelMl:number;
  status:string;
}