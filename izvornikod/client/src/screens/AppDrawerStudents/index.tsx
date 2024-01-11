import React from "react"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Stack, Typography } from "@mui/material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import StyleIcon from '@mui/icons-material/Style';
import LanguageIcon from '@mui/icons-material/Language';
import PersonOffIcon from '@mui/icons-material/PersonOff';

import { AppContent, UserBox } from "./index.styled";
import { RootState, useAppDispatch } from "../../redux/store";
import { attemptLogout } from "../../redux/slices/authSlice";
import route from "../../constants/route";
import ApproveDialog from "../../components/common/AprooveDialog";


const AppDrawerStudents = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const open = Boolean(menuAnchor);

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleLogout = () => {
    navigate(`/${route.login}`, { replace: true });
    dispatch(attemptLogout());
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget.parentElement);
  };
  const handleClose = () => {
    setMenuAnchor(null);
  };

  const handleConfirmDelete = () => {

  };

  const AccountMenu = () => {
    return (
      <Menu
        anchorEl={menuAnchor}
        open={open}
        onClose={handleClose}
        elevation={1}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuList>
          <UserBox>
            <ListItemText
              primary={`${user?.firstname} ${user?.lastname}`}
              secondary={user?.email}
            />
          </UserBox>

          <Divider />

          <Box paddingTop="0.5em">
            <MenuItem
              onClick={() => { }}
            >
              <ListItemIcon>
                <LanguageIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Odaberi jezik"
              />
            </MenuItem>
            <MenuItem
              onClick={() => { handleClose(); setOpenDialog(true); }}
            >
              <ListItemIcon>
                <PersonOffIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Izbriši račun"
              />
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => handleLogout()}
            >
              <ListItemIcon>
                <LogoutRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Odjavi se"
              />
            </MenuItem>
          </Box>
        </MenuList>
      </Menu>
    );
  };

  return (
    <>
      <Box component="nav">
        <Drawer
          variant="persistent"
          open={true}
        >
          <List>
            <ListItem>
              <IconButton
                onClick={handleClick}
              >
                <AccountCircleRoundedIcon />
              </IconButton>
            </ListItem>
            <ListItem>
              <Stack direction="column">
                <IconButton
                  component={Link}
                  to={`/${route.selectDictionary}`}
                >
                  <StyleIcon />
                </IconButton>
                <Typography variant="button" color="gray" fontSize="0.6rem">rječnici</Typography>
              </Stack>
            </ListItem>
          </List>
        </Drawer>
      </Box >
      <AppContent>
        <Outlet />
      </AppContent>
      <AccountMenu />
      <ApproveDialog
        open={openDialog}
        title={`Izbrisati račun korisnika ${user?.firstname} ${user?.lastname}?`}
        text={`Vaš račun i sve naučene riječi bit će trajno izbrisane.`}
        confirmText="Izbriši"
        cancelText="Odustani"
        handleCancel={() => setOpenDialog(false)}
        handleConfirm={handleConfirmDelete}
        handleExit={() => setOpenDialog(false)}
      />
    </>
  );
};

export default AppDrawerStudents;