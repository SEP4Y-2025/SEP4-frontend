import React, { useState } from "react";
import { useGetAssistants } from "../hooks/useGetAssistants";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { Button, DeleteButton } from "../Styles/common/Button.style";
import AddAssistantModal from "../components/MyPlants/AddAssistantModal";
import { useInviteAssistants } from "../hooks/useInviteAssistant";
import { useDeleteAssistants } from "../hooks/useDeleteAssistants";

const Assistants = () => {
  const { environmentID } = useEnvironmentCtx();
  const {
    assistants,
    loadingAssistants,
    fetchAssistants,
    fetchingAssistantsError,
  } = useGetAssistants(environmentID);
  const { deleteAssistant } = useDeleteAssistants();
  const [openAddAssistant, setOpenAddAssistant] = useState(false);

  const handleCloseModal = () => {
    setOpenAddAssistant(false);
    fetchAssistants();
  };
  return (
    <div>
      <Button onClick={()=>setOpenAddAssistant(true)}>Add assistants</Button>
      {openAddAssistant && <AddAssistantModal onClose={handleCloseModal} />}
      <ul>
        {assistants.map((as) => (
          <li key={as.userName}>
            {as.userName} {as.email}{" "}
            <DeleteButton
              onClick={() => deleteAssistant(environmentID,as.email, fetchAssistants)}
            >
              Remove
            </DeleteButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assistants;
