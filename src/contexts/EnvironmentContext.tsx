import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PlantType, Pot } from "../types";
import axios from "axios";
import { useGetPotsByEnvironment } from "../hooks/useGetPotsByEnvironment";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

type EnvironmentContextType = {
  pots: Pot[];
  plantTypes: PlantType[];
  environmentName: string;
  loading: boolean;
  error: string | null;
  environmentID: string;
  ownerID: string;
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
  const [ownerID, setOwnerID] = useState("");
  const [plantTypes, setPlantTypes] = useState<PlantType[]>([]);
  const [environmentName, setEnvironmentName] = useState<string>("");
  const [environmentID, setEnvironmentID] = useState<string>("680f8359688cb5341f9f9c19");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Use the hook to get pots by environment
  const { pots, error: potsError } = useGetPotsByEnvironment(environmentID);

  const fetchPlantTypes = async () => {
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
    } catch (er) {
      er instanceof Error
        ? setError(er.message)
        : setError("Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const refreshEnvironmentData = async () => {
    await fetchPlantTypes();
    // Pots will be refetched automatically by the hook when environmentID changes
  };

  useEffect(() => {
    fetchPlantTypes();
  }, [environmentID]);

  // Update error state if there's an error from the pots hook
  useEffect(() => {
    if (potsError) {
      setError(potsError.message);
    }
  }, [potsError]);

  return (
    <EnvironmentContext.Provider
      value={{
        loading,
        error,
        ownerID,
        environmentName,
        plantTypes,
        pots, // This now comes from the hook
        environmentID,
        refreshEnvironmentData,
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