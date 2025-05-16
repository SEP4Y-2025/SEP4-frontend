import React, { useEffect, useState } from "react";

import plantsIcon from "../assets/plants.png";
import { useNavigate } from "react-router-dom";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { FetchMyEnvironments } from "../hooks/FetchMyEnvironmnets";
import { useAuth } from "../contexts/UserAuthContext";
import { EnvironmentBrief } from "../types/Environment";
import { Grid, Card } from "../Styles/pages/ViewEnvironments.style";
import { Button, DeleteButton } from "../Styles/common/Button.style";
import { Title } from "../Styles/common/Title.style";
import { Flex } from "../Styles/common/Flex";
import AddEnvironmentModal from "../components/MyEnvironments/AddNewModal";
import { useAddEnvironments } from "../hooks/useAddEnvironments";

const MyEnvironmnets = () => {
  const { setEnvironmentID, setIsOwner, environmentID } = useEnvironmentCtx();
  const { user } = useAuth();
  const { environmentsList, fetchAllEnvironments } = FetchMyEnvironments();
  const [showEnvironmentModal, setShowEnvironmentModal] = useState(false);
  const { addEnvironment, errorAdd, successAdd } = useAddEnvironments();

  const navigate = useNavigate();
  useEffect(() => {
    if (user?.user_id) {
      console.log("fetch call");
      fetchAllEnvironments(user.user_id);
    }
  }, [user]);
  const handleSwitch = (envId: string, own: boolean) => {
    setEnvironmentID(envId);
    setIsOwner(own);
    navigate("/plants");
  };

  const handleAdd = async (envName: string) => {
    await addEnvironment(envName);
    if (successAdd) {
      setShowEnvironmentModal(false);
      fetchAllEnvironments(user!.user_id);
    }
    if (errorAdd) {
      alert(errorAdd);
    }
  };

  return (
    <div>
      <Title>Select Environment</Title>
      <Title>My Environments</Title>
      <Grid>
        {environmentsList
          .filter((env) => env.role === "Owner")
          .map((environment: EnvironmentBrief) => (
            <div>
              <Card
                key={environment.environment_id}
                onClick={() => handleSwitch(environment.environment_id, true)}
              >
                <img src={plantsIcon} alt="XD" />
                {environment.environment_id} XD

              </Card>
            </div>

          ))}
        <Button onClick={() => setShowEnvironmentModal(true)}>Add new</Button>
        {showEnvironmentModal && (
          <AddEnvironmentModal
            onClose={() => setShowEnvironmentModal(false)}
            onSubmit={handleAdd}
          />
        )}
      </Grid>
      <Title>Other Environments</Title>
      <Grid>
        {environmentsList
          .filter((env) => env.role != "Owner")
          .map((environment: EnvironmentBrief) => (
            <Card
              key={environment.environment_id}
              onClick={() => handleSwitch(environment.environment_id, false)}
            >
              {" "}
              <img src={plantsIcon} alt="XD" />
              {environment.environment_id} Xd
              <DeleteButton $margin="0 1rem">X</DeleteButton>
            </Card>
          ))}
      </Grid>

    </div>
  );
};

export default MyEnvironmnets;
