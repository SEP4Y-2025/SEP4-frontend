import React, { useEffect } from "react";
import { Flex } from "../Styles/common/Flex";
import { StyledRow } from "../Styles/pages/MyPlants.style";
import { useNavigate } from "react-router-dom";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { FetchMyEnvironments } from "../hooks/FetchMyEnvironmnets";
import { useAuth } from "../contexts/UserAuthContext";
import { EnvironmentBrief } from "../types/Environment";

const MyEnvironmnets = () => {
  const { setEnvironmentID } = useEnvironmentCtx();
  const { user } = useAuth();
  const { environmentsList, fetchAllEnvironments } = FetchMyEnvironments();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.user_id) {
      console.log("fetch call");
      fetchAllEnvironments(user.user_id);
    }
  }, [user]);
  const handleSwitch = (id: string) => {
    setEnvironmentID(id);
    navigate("/plants");
  };

  return (
    <div>
      <Flex $dir="column" $alignI="center">
        <StyledRow>
          {environmentsList
            .filter((env) => env.role === "Owner")
            .map((environment: EnvironmentBrief) => (
              <div
                key={environment.environment_id}
                onClick={() => handleSwitch(environment.environment_id)}
              >
                {environment.environment_id} and {environment.role}
              </div>
            ))}
        </StyledRow>
      </Flex>
    </div>
  );
};

export default MyEnvironmnets;
