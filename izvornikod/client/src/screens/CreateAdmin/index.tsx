import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Typography, Alert, Stack } from "@mui/material";

import route from "../../constants/route";
import RegisterInput from "../../types/inputs/user/RegisterInput";
import { useAppDispatch } from "../../redux/store";
import { registerStudent } from "../../redux/slices/authSlice";
import { FormTitleWrapper, FormWrapper, ScreenWrapper } from "./index.styled";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterInput>();

  const onSubmit = (data: RegisterInput) => {
    dispatch(registerStudent(data))
    navigate(`/${route.login}`);
  };

  return (
    <ScreenWrapper>
      <Container maxWidth="xs">
        <FormWrapper>
          <FormTitleWrapper>
            <Typography component="h1" variant="h5">Registrirajte se!</Typography>
          </FormTitleWrapper>
          <Box component="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
            <Box marginBottom="20px">
              <Stack spacing={1}>
                <Alert severity="info">
                  <s>Privremena lozinka bit će poslana na Vašu email adresu nakon registracije.</s>
                </Alert>
                <Alert severity="error">
                  Za potrebu generičkih funkcionalnosti ne šalju se mailovi s privremenom lozinkom, već su sve lozinke za nove učenike <b>progi123</b>
                </Alert>
              </Stack>
            </Box>
            <Box marginBottom="20px">
              <TextField
                {...register("firstname")}
                label="Ime"
                name="firstname"
                id="firstname"
                required
                fullWidth
              />
            </Box><Box marginBottom="20px">
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
            <Button sx={{ marginBottom: "5px" }} type="submit" size="large" variant="contained" fullWidth >
              Registriraj se
            </Button>
            <Button type="button" variant="text" fullWidth onClick={() => navigate(`/${route.login}`)}>
              Prijavi se
            </Button>
          </Box>
        </FormWrapper>
      </Container>
    </ScreenWrapper>
  );
};

export default Register;