import React from "react";
import { useGetAssistants } from "../hooks/useGetAssistants";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";

const Assistants = () => {
  const { environmentID } = useEnvironmentCtx();
  const {
    assistants,
    loadingAssistants,
    fetchAssistants,
    fetchingAssistantsError,
  } = useGetAssistants(environmentID);
  return (
    <div>
      <ul>
        {assistants.map((as) => (
          <li key={as}>{as}</li>
        ))}
      </ul>
    </div>
  );
};

export default Assistants;
