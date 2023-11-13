import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";

import route from "../../constants/route";
import RegisterInput from "../../types/inputs/korisnik/RegisterInput";
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
              <Alert severity="info">
                Privremena lozinka bit će poslana na Vašu email adresu nakon registracije.
              </Alert>
            </Box>
            <Box marginBottom="20px">
              <TextField
                {...register("ime")}
                label="Ime"
                name="ime"
                id="ime"
                required
                fullWidth
              />
            </Box><Box marginBottom="20px">
              <TextField
                {...register("prezime")}
                label="Prezime"
                name="prezime"
                id="prezime"
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