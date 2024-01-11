import { useState, useEffect } from "react";
import CreateAdmin from "./CreateAdmin";
import EditAdmin from "./EditAdmin";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Drawer,
  Container,
  Stack,
  IconButton,
} from "@mui/material";
import { fetchAdmins, deleteAdmin } from "../../redux/slices/adminSlice";
import { TableHeading, TableWrapper } from "../../components/common/styled";
import User from "../../types/models/User";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ApproveDialog from "../../components/common/AprooveDialog";

interface State {
  currentAdmin: User | undefined;
  isDrawerVisible: boolean;
  drawerMode: string | undefined;
}

const AdminList = () => {
  const dispatch = useAppDispatch();
  const { admins } = useSelector((state: RootState) => state.admins);
  const [state, setState] = useState<State>({
    currentAdmin: undefined,
    isDrawerVisible: false,
    drawerMode: "",
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (selectedAdmin !== undefined) {
      setOpenDialog(true);
    }
  }, [selectedAdmin]);

  async function handleDelete() {
    if (selectedAdmin !== undefined) {
      await dispatch(deleteAdmin(selectedAdmin.userid));
      refreshAdmins();
    }
    setOpenDialog(false);
  }

  function handleEdit(admin: User) {
    setState({
      currentAdmin: admin,
      isDrawerVisible: true,
      drawerMode: "edit",
    });
  }

  function handleCreate() {
    setState((prevState: State) => ({
      ...prevState,
      isDrawerVisible: true,
      drawerMode: "create",
    }));
  }

  function toggleDrawer() {
    setState((prevState: State) => ({
      ...prevState,
      isDrawerVisible: !state.isDrawerVisible,
    }));
  }

  function refreshAdmins() {
    dispatch(fetchAdmins());
  }

  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <TableHeading variant="h2">Administratori</TableHeading>

        <Button
          onClick={handleCreate}
          style={{ marginRight: "1rem" }}
          variant="outlined"
          size="large"
          startIcon={<AddIcon />}
        >
          Dodaj administratora
        </Button>
      </Stack>
      <TableWrapper>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ime</TableCell>
                <TableCell align="center">
                  Prezime
                </TableCell>
                <TableCell align="center">
                  Email
                </TableCell>
                <TableCell align="center">
                  Datum stvaranja
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((row: User) => (
                <TableRow
                  key={row.userid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.firstname}
                  </TableCell>
                  <TableCell align="center">{row.lastname}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    {row.usercreatedat
                      ? (new Date(row.usercreatedat + "Z")).toLocaleDateString("hr-HR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                      : ""}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setOpenDialog(true);
                        setSelectedAdmin(row);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
      <Drawer
        anchor={"bottom"}
        open={state.isDrawerVisible}
        onClose={toggleDrawer}
      >
        {state.drawerMode === "edit" && (
          <EditAdmin
            toggleDrawer={toggleDrawer}
            refreshAdmins={refreshAdmins}
            admin={state.currentAdmin}
          />
        )}
        {state.drawerMode === "create" && (
          <CreateAdmin
            toggleDrawer={toggleDrawer}
            refreshAdmins={refreshAdmins}
          />
        )}
      </Drawer>
      <ApproveDialog
        open={openDialog}
        title={`Izbrisati administratora ${selectedAdmin?.firstname} ${selectedAdmin?.lastname}?`}
        text={`Administratorski račun ${selectedAdmin?.email} bit će trajno izbrisan.`}
        confirmText="Izbriši"
        cancelText="Odustani"
        handleCancel={() => setOpenDialog(false)}
        handleConfirm={() => handleDelete()}
        handleExit={() => setSelectedAdmin(undefined)}
      />
    </Container>
  );
};

export default AdminList;
