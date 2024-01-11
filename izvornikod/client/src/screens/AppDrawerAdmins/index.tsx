import React from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Stack, Typography } from "@mui/material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import StyleIcon from '@mui/icons-material/Style';
import LanguageIcon from '@mui/icons-material/Language';
import TranslateIcon from '@mui/icons-material/Translate';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import { AppContent, UserBox } from "./index.styled";
import { RootState, useAppDispatch } from "../../redux/store";
import { clearSelectedLanguage } from "../../redux/slices/languageSlice";
import { attemptLogout } from "../../redux/slices/authSlice";
import Error from "../../components/common/Error";
import route from "../../constants/route";


const AppDrawerAdmins = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedLanguage } = useSelector((state: RootState) => state.languages);

  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const open = Boolean(menuAnchor);

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
              onClick={() => {
                dispatch(clearSelectedLanguage());
                navigate(`/${route.selectLanguage}/admin`);
                handleClose();
              }}
            >
              <ListItemIcon>
                <LanguageIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Odaberi jezik"
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
              <Stack direction="column" alignItems="center">
                <IconButton
                  disabled={selectedLanguage === undefined}
                  component={Link}
                  to={`/${route.words}`}
                >
                  <TranslateIcon />
                </IconButton>
                <Typography variant="button" color="gray" fontSize="0.6rem">riječi</Typography>
              </Stack>
            </ListItem>
            <ListItem>
              <Stack direction="column" alignItems="center">
                <IconButton
                  disabled={selectedLanguage === undefined}
                  component={Link}
                  to={`/${route.dictionaries}`}
                >
                  <StyleIcon />
                </IconButton>
                <Typography variant="button" color="gray" fontSize="0.6rem">rječnici</Typography>
              </Stack>
            </ListItem>
            <ListItem>
              <Stack direction="column" alignItems="center">
                <IconButton
                  disabled={selectedLanguage === undefined}
                  component={Link}
                  to={`/${route.adminList}`}
                >
                  <SupervisorAccountIcon />
                </IconButton>
                <Typography variant="button" color="gray" fontSize="0.6rem">admini</Typography>
              </Stack>
            </ListItem>
          </List>
        </Drawer>
      </Box >
      <AppContent>
        {
          (selectedLanguage === undefined && location.pathname !== `/${route.selectLanguage}/admin`)
            ? <Error errorText="Nije odabran nijedan jezik. Molimo odaberite ga u izborniku." />
            : <Outlet />
        }
      </AppContent>
      <AccountMenu />
    </>
  );
};

export default AppDrawerAdmins;