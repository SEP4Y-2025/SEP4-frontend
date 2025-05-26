import React, { useState } from "react";
import { useGetAssistants } from "../hooks/users/useGetAssistants";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { Button, DeleteButton } from "../Styles/common/Button.style";
import AddAssistantModal from "../components/MyPlants/AddAssistantModal";
import { useInviteAssistants } from "../hooks/users/useInviteAssistant";
import { useDeleteAssistants } from "../hooks/users/useDeleteAssistants";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { CircularProgress } from "@mui/material";

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
      {loadingAssistants && <CircularProgress style={{ marginTop: 20 }} />}
      <Button $margin="2rem 0 2rem 0" onClick={() => setOpenAddAssistant(true)}>Add assistants</Button>
      {openAddAssistant && <AddAssistantModal onClose={handleCloseModal} />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assistants.map((as) => (
              <TableRow
                key={as.userName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {as.email}
                </TableCell>
                <TableCell align="right">
                  <DeleteButton
                    onClick={() => deleteAssistant(environmentID, as.email, fetchAssistants)}>
                    Remove
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Assistants;





