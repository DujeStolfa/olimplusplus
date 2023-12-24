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
  Typography,
  Drawer,
} from "@mui/material/";
import { fetchAdmins, deleteAdmin } from "../../redux/slices/adminSlice";
import { TitleWrapper, ScreenWrapper } from "./index.styled";
import User from "../../types/models/User";

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

  useEffect(() => {
    dispatch(fetchAdmins());
  }, []);

  async function handleDelete(admin: User) {
    await dispatch(deleteAdmin(admin.userid));
    refreshAdmins();
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
    <ScreenWrapper>
      <TitleWrapper>
        <Typography style={{ paddingLeft: "1rem" }} component="h1" variant="h5">
          Administratori
        </Typography>
        <Button
          onClick={handleCreate}
          style={{ marginRight: "1rem" }}
          variant="contained"
        >
          Kreiraj
        </Button>
      </TitleWrapper>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow style={{ borderBottom: "2px solid" }}>
              <TableCell style={{ fontWeight: "bold" }}>ime</TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                prezime
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                email
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                datum stvaranja
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
                  {row.usercreatedat ? row.usercreatedat : ""}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(row)} variant="contained">
                    Uredi
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(row)} variant="contained">
                    Izbriši
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </ScreenWrapper>
  );
};

export default AdminList;
