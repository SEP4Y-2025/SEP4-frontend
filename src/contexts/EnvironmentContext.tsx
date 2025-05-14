import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PlantType, Pot } from "../types";
import axios from "axios";

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
  const [pots, setPots] = useState<Pot[]>([]);
  const [ownerID, setOwnerID] = useState("");
  const [plantTypes, setPlantTypes] = useState<PlantType[]>([]);
  const [environmentName, setEnvironmentName] = useState<string>("");
  const [environmentID, setEnvironmentID] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
<<<<<<< HEAD

  useEffect(() => {
    const fetchEnvironment = async () => {
      try {
        setError(null);
        setLoading(true);

        const fetchedTypes = await getTypesByEnvironment(
          environmentID
        );
        console.log('Fetched plant types:', fetchedTypes);
        setPlantTypes(fetchedTypes);

        const fetchedPots = await getPotsByEnvironment(
          environmentID
        );
        console.log('Fetched pots:', fetchedPots);
        setPots(fetchedPots);
      } catch (er) {
        er instanceof Error
          ? setError(er.message)
          : setError("Unknown error occurred");
      } finally {
        setLoading(false);
=======
  const fetchEnvironment = async () => {
    try {
      if (!environmentID) {
        return;
>>>>>>> Sprint4
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

<<<<<<< HEAD
  useEffect(() => {
    // Debug: log when plant types change
    console.log('Plant types updated:', plantTypes);
  }, [plantTypes]);

=======
>>>>>>> Sprint4
  return (
    <EnvironmentContext.Provider
      value={{
        loading,
        error,
        ownerID,
        environmentName,
        plantTypes,
        pots,
        environmentID,
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