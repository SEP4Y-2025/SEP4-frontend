import React, { useEffect, useState } from "react";

import plantsIcon from "../assets/plants.png";
import { useNavigate } from "react-router-dom";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { useFetchMyEnvironments } from "../hooks/environments/useFetchMyEnvironmnets";
import { useAuth } from "../contexts/UserAuthContext";
import { EnvironmentBrief } from "../types/Environment";
import { Grid, Card } from "../Styles/pages/ViewEnvironments.style";
import { Button, DeleteButton } from "../Styles/common/Button.style";
import { Title } from "../Styles/common/Title.style";
import { Flex } from "../Styles/common/Flex";
import AddEnvironmentModal from "../components/MyEnvironments/AddNewModal";
import { useAddEnvironments } from "../hooks/environments/useAddEnvironments";
import { toast } from "react-toastify";
import { useDeleteAssistants } from "../hooks/users/useDeleteAssistants";

const MyEnvironmnets = () => {
  const { setEnvironmentID, setIsOwner, setEnvironmentName } = useEnvironmentCtx();
  const { user } = useAuth();
  const [showEnvironmentModal, setShowEnvironmentModal] = useState(false);
  const { addEnvironment, errorAdd, successAdd } = useAddEnvironments();
  const { environmentsList, fetchAllEnvironments } = useFetchMyEnvironments(
    user!.user_id
  );
  const { deleteAssistant } = useDeleteAssistants();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user_id) {
      console.log("fetch call");
      fetchAllEnvironments();
    }
  }, [user]);

  useEffect(() => {
    if (successAdd) {
      toast.success("Environment added successfully");
      fetchAllEnvironments();
      setShowEnvironmentModal(false);
    }
    if (errorAdd) {
      toast.error(errorAdd);
    }
  }, [successAdd, errorAdd]);

  const handleSwitch = (envId: string, envName: string, own: boolean) => {
    setEnvironmentID(envId);
    setEnvironmentName(envName);
    setIsOwner(own);
    navigate("/plants");
  };

  const handleAdd = async (envName: string) => {
    await addEnvironment(envName);
    if (successAdd) {
      setShowEnvironmentModal(false);
      fetchAllEnvironments();
    }
    if (errorAdd) {
      alert(errorAdd);
    }
  };

  return (
    <div>
      <Title $margin="2rem">My Environments</Title>
      <Grid>
        {environmentsList
          .filter((env) => env.role === "Owner")
          .map((environment: EnvironmentBrief) => (
            <Card
              key={environment.environment_id}
              onClick={() => handleSwitch(environment.environment_id, environment.environment_name, true)}
            >
              <img src={plantsIcon} alt="XD" />
              {environment.environment_name}
            </Card>
          ))}
        <Button $width="150px" onClick={() => setShowEnvironmentModal(true)}>Add new </Button>
        {showEnvironmentModal && (
          <AddEnvironmentModal
            onClose={() => setShowEnvironmentModal(false)}
            onSubmit={addEnvironment}
          />
        )}
      </Grid>
      <Title $margin="2rem">Other Environments</Title>
      <Grid>
        {environmentsList
          .filter((env) => env.role != "Owner")
          .map((environment: EnvironmentBrief) => (
            <Card
              key={environment.environment_id}
              onClick={() => handleSwitch(environment.environment_id, environment.environment_name, false)}
            >
              <img src={plantsIcon} alt="XD" />
              {environment.environment_name}

              <DeleteButton
                $margin="0 1rem"
                onClick={(e) => {
                  e.stopPropagation();
                  const confirmLeave = window.confirm(
                    "Are you sure you want to leave this environment as an assistant?"
                  );
                  if (confirmLeave && user?.email) {
                    deleteAssistant(environment.environment_id, user.email, fetchAllEnvironments);
                  }
                }}
              >
                X
              </DeleteButton>
            </Card>
          ))}
      </Grid>
    </div>
  );
};

export default MyEnvironmnets;
