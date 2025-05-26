import React, { useState } from "react";
import { useGetAssistants } from "../hooks/users/useGetAssistants";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { Button, DeleteButton } from "../Styles/common/Button.style";
import AddAssistantModal from "../components/MyPlants/AddAssistantModal";
import { useInviteAssistants } from "../hooks/users/useInviteAssistant";
import { useDeleteAssistants } from "../hooks/users/useDeleteAssistants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { CircularProgress } from "@mui/material";
import { AssistantWrapper } from "../Styles/pages/AssistantWrapper.style";
import { toast } from "react-toastify";


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
    <AssistantWrapper>
      {loadingAssistants && <CircularProgress style={{ marginTop: 20 }} />}
      <Button $margin="2rem 0 2rem 0" onClick={() => setOpenAddAssistant(true)}>
        Add assistants
      </Button>
      {openAddAssistant && <AddAssistantModal onClose={handleCloseModal} />}

<TableContainer component={Paper} sx={{ width: "100%", overflowX: "hidden" }}>
  <Table sx={{ width: "100%" }} aria-label="assistants table"> <TableHead>
            
            <TableRow> 
              <TableCell>Assistant Email</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            {assistants.map((as) => (
              <TableRow
                key={as.userName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {as.email}
                </TableCell>
                <TableCell align="right">
                 <DeleteButton
                    onClick={() => {
                      deleteAssistant(environmentID, as.email, fetchAssistants)
                        .then(() => {
                          toast.success('Assistant removed');
                        });
                    }}>
                    Remove
                </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AssistantWrapper>
  );
};

export default Assistants;
