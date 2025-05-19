import React, { useState } from "react";
import { useGetAssistants } from "../hooks/useGetAssistants";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { Button, DeleteButton } from "../Styles/common/Button.style";
import AddAssistantModal from "../components/MyPlants/AddAssistantModal";
import { useInviteAssistants } from "../hooks/useInviteAssistant";
import { useDeleteAssistants } from "../hooks/useDeleteAssistants";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <div>
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





