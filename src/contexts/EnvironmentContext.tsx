import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { PlantPotResponse, PlantType, Pot } from "../types";
import { getPotsByEnvironment } from "../services/plantPotsApi";
import { getTypesByEnvironment } from "../services/plantTypesApi";

type EnvironmentContextType = {
  pots: Pot[];
  plantTypes: PlantType[];
  environmnentName: string;
  loading: boolean;
  error: string;
  setEnvironmentName: (newName: string) => void;
  setEnvironmentID: (search: string) => void;
  setPlantTypes: (newTypes: PlantType[]) => void;
};
const EnvironmentContext = createContext<EnvironmentContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

const EnvironmentProvider = ({ children }: Props) => {
  const [pots, setPots] = useState<Pot[]>([]);
  const [plantTypes, setPlantTypes] = useState<PlantType[]>([]);
  const [environmnentName, setEnvironmentName] = useState<string>("");
  const [environmnentID, setEnvironmentID] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEnvironment = async () => {
      try {
        setError("");
        setLoading(true);

        const fetchedTypes = await getTypesByEnvironment("680f8359688cb5341f9f9c19")
        console.log(fetchedTypes)
        setPlantTypes(fetchedTypes);
        //TODO PLACEHOLDER ID
        const fetchedPots = await getPotsByEnvironment("680f8359688cb5341f9f9c19");

        setPots(fetchedPots);



      } catch (er) {
        er instanceof Error
          ? setError(er.message)
          : setError("Unkonown error occured");
      } finally {
        setLoading(false);
      }
    };
    fetchEnvironment();
  }, [environmnentID]);


  useEffect(() => {
    console.log("Updated types:", plantTypes);
  }, [plantTypes]);

  return (
    <EnvironmentContext.Provider
      value={{
        loading,
        error,
        environmnentName,
        plantTypes,
        pots,
        setEnvironmentID,
        setEnvironmentName,
        setPlantTypes
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

const useEnvironmentCtx = () =>{
    const context = useContext(EnvironmentContext);
    if(!context){
        throw new Error("useWeather must be used within a WeatherProvider");
    }
    return context;
};

export{EnvironmentProvider, useEnvironmentCtx};
export default EnvironmentContext;
