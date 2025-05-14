import React, { useEffect } from "react";

import plantsIcon from "../assets/plants.png"
import { useNavigate } from "react-router-dom";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { FetchMyEnvironments } from "../hooks/FetchMyEnvironmnets";
import { useAuth } from "../contexts/UserAuthContext";
import { EnvironmentBrief } from "../types/Environment";
import { Grid, Card } from "../Styles/ViewEnvironments.style";
import { Button } from "../Styles/Button.style";
import { Title } from "../Styles/Title.style";

const MyEnvironmnets = () => {
  const { setEnvironmentID, setIsOwner } = useEnvironmentCtx();
  const { user } = useAuth();
  const { environmentsList, fetchAllEnvironments } = FetchMyEnvironments();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.userName) {
      console.log("fetch call");
      fetchAllEnvironments(user.userName);
    }
  }, [user]);
  const handleSwitch = (envId: string, own:boolean) => {
    setEnvironmentID(envId);
    setIsOwner(own);
    navigate("/plants");
  };

  return (
    <div>
      <Title>Select Environment</Title>
      <Title>My Environments</Title>
      <Grid>
        {environmentsList
          .filter((env) => env.role === "Owner")
          .map((environment: EnvironmentBrief) => (
            <Card
              key={environment.environment_id}
              onClick={() => handleSwitch(environment.environment_id, true)}
            >
              <img src={plantsIcon} alt="XD" />
              {environment.environment_id} XD
            </Card>
          ))}
        <Button>Add new</Button>
      </Grid>
      <Title>Other Environments</Title>
      <Grid>
        {environmentsList
          .filter((env) => env.role != "Owner")
          .map((environment: EnvironmentBrief) => (
            <Card
              key={environment.environment_id}
              onClick={() => handleSwitch(environment.environment_id, false)}
            ></Card>
          ))}
      </Grid>
    </div>
  );
};

export default MyEnvironmnets;
