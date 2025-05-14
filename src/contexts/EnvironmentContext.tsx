import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PlantType, Pot } from "../types";
import { getPotsByEnvironment } from "../services/plantPotsApi";
import { getTypesByEnvironment } from "../services/plantTypesApi";

type EnvironmentContextType = {
  pots: Pot[];
  plantTypes: PlantType[];
  environmentName: string;
  loading: boolean;
  error: string | null;
  environmentID: string;
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
  const [environmentName, setEnvironmentName] = useState<string>("");
  const [environmentID, setEnvironmentID] = useState<string>("680f8359688cb5341f9f9c19");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      }
    };

    fetchEnvironment();
  }, [environmentID]);

  useEffect(() => {
    // Debug: log when plant types change
    console.log('Plant types updated:', plantTypes);
  }, [plantTypes]);

  return (
    <EnvironmentContext.Provider
      value={{
        loading,
        error,
        environmentName,
        plantTypes,
        pots,
        environmentID,
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