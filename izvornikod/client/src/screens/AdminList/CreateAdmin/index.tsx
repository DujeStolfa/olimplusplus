import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";

import { useAppDispatch } from "../../../redux/store";
import { createAdmin } from "../../../redux/slices/authSlice";
import { FormTitleWrapper, FormWrapper, ScreenWrapper } from "./index.styled";
import CreateAdminInput from "../../../types/inputs/user/CreateAdminInput";

interface Props {
  toggleDrawer: () => void;
  refreshAdmins: () => void;
}

const CreateAdmin: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<CreateAdminInput>();
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  const onSubmit = (data: CreateAdminInput) => {
    setSubmitted(true);
    if (password === confirmPassword) {
      dispatch(createAdmin(data));
      props.toggleDrawer();
      props.refreshAdmins();
    }
  };

  return (
    <ScreenWrapper>
      <Container maxWidth="xs">
        <FormWrapper>
          <FormTitleWrapper>
            <Typography component="h1" variant="h5">
              Create admin
            </Typography>
          </FormTitleWrapper>
          <Box component="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
            {
              (password !== confirmPassword && submitted) ?
                <Box marginBottom="20px">
                  <Alert severity="error">Lozinke se razlikuju!</Alert>
                </Box>
                : null
            }
            <Box marginBottom="20px">
              <TextField
                {...register("firstname")}
                label="Ime"
                name="firstname"
                id="firstname"
                required
                fullWidth
              />
            </Box>
            <Box marginBottom="20px">
              <TextField
                {...register("lastname")}
                label="Prezime"
                name="lastname"
                id="lastname"
                required
                fullWidth
              />
            </Box>
            <Box marginBottom="20px">
              <TextField
                {...register("email")}
                label="Email adresa"
                name="email"
                type="email"
                id="email"
                required
                fullWidth
              />
            </Box>
            <Box marginBottom="20px">
              <TextField
                {...register("password")}
                label="Inicijalna lozinka"
                name="password"
                type="password"
                id="password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
                required
                fullWidth
              />
            </Box>
            <Box marginBottom="20px">
              <TextField
                {...register("confirmPassword")}
                label="Ponovi inicijalnu lozinku"
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setConfirmPassword(event.target.value);
                }}
                required
                fullWidth
              />
            </Box>
            <Button
              sx={{ marginBottom: "5px" }}
              type="submit"
              size="large"
              variant="contained"
              fullWidth
            >
              Potvrdi
            </Button>
            <Button
              type="button"
              variant="text"
              fullWidth
              onClick={() => props.toggleDrawer()}
            >
              Odustani
            </Button>
          </Box>
        </FormWrapper>
      </Container>
    </ScreenWrapper>
  );
};

export default CreateAdmin;
