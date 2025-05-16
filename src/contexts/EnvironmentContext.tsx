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
  environmentName: string;

  environmentID: string;
  isOwner: boolean;
  setIsOwner: (b: boolean) => void;
  setEnvironmentName: (newName: string) => void;
  setEnvironmentID: (search: string) => void;
};

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

const EnvironmentProvider = ({ children }: Props) => {
  const [isOwner, setIsOwner] = useState(false);
  const [environmentName, setEnvironmentName] = useState<string>("");
  const [environmentID, setEnvironmentID] = useState<string>("");

  return (
    <EnvironmentContext.Provider
      value={{
        isOwner,
        environmentName,

        environmentID,
        setIsOwner,

        setEnvironmentID,
        setEnvironmentName,
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
