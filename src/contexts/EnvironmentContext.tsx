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
  const [isOwner, setIsOwner] = useState<boolean>(() => {
    const stored = sessionStorage.getItem("isOwner");
    return stored ? JSON.parse(stored) : false;
  });
  const [environmentName, setEnvironmentName] = useState<string>(() => {
    return sessionStorage.getItem("environmentName") || "";
  });
  const [environmentID, setEnvironmentID] = useState<string>(() => {
    return sessionStorage.getItem("environmentID") || "";
  });

  useEffect(() => {
    sessionStorage.setItem("isOwner", JSON.stringify(isOwner));
  }, [isOwner]);

  useEffect(() => {
    sessionStorage.setItem("environmentName", environmentName);
  }, [environmentName]);

  useEffect(() => {
    sessionStorage.setItem("environmentID", environmentID);
  }, [environmentID]);

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
