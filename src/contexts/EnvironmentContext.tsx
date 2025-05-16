import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PlantType, Pot } from "../types";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

type EnvironmentContextType = {
  pots: Pot[];
  plantTypes: PlantType[];
  environmentName: string;
  loading: boolean;
  error: string | null;
  environmentID: string;
  isOwner: boolean;
  setIsOwner:(b:boolean) =>void;
  setEnvironmentName: (newName: string) => void;
  setEnvironmentID: (search: string) => void;
  setPlantTypes: (newTypes: PlantType[]) => void;
  refreshEnvironmentData: () => Promise<void>;
};

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

const EnvironmentProvider = ({ children }: Props) => {
  const [pots, setPots] = useState<Pot[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [plantTypes, setPlantTypes] = useState<PlantType[]>([]);
  const [environmentName, setEnvironmentName] = useState<string>("");
  const [environmentID, setEnvironmentID] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchEnvironment = async () => {
    try {
      if (!environmentID) {
        return;
      }
      setError(null);
      setLoading(true);

      const typesResponse = await axios.get(
        `${BASE_URL}/environments/${environmentID}/plant_types`
      );
      setPlantTypes(typesResponse.data.PlantTypes);

      const response = await axios.get(
        `${BASE_URL}/environments/${environmentID}/pots`
      );
      setPots(response.data.pots);
    } catch (er) {
      er instanceof Error
        ? setError(er.message)
        : setError("Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEnvironment();
  }, [environmentID]);

  return (
    <EnvironmentContext.Provider
      value={{
        loading,
        error,
        isOwner,
        environmentName,
        plantTypes,
        pots,
        environmentID,
        setIsOwner,
        refreshEnvironmentData: fetchEnvironment,
        setEnvironmentID,
        setEnvironmentName,
        setPlantTypes,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

const useEnvironmentCtx = () => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error(
      "useEnvironmentCtx must be used within an EnvironmentProvider"
    );
  }
  return context;
};

export { EnvironmentProvider, useEnvironmentCtx };
export default EnvironmentContext;
