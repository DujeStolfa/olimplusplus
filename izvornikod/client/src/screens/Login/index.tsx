import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";

import LoginInput from "../../types/inputs/korisnik/LoginInput";
import { RootState, useAppDispatch } from "../../redux/store";
import { attemptLogin } from "../../redux/slices/authSlice";
import { FormTitleWrapper, FormWrapper, ScreenWrapper } from "./index.styled";


const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { korisnik, authenticated } = useSelector((state: RootState) => state.auth)
  const { register, handleSubmit } = useForm<LoginInput>();

  const onSubmit = (data: LoginInput) => {
    dispatch(attemptLogin(data));
  };

  useEffect(() => {
    if (korisnik !== undefined) {
      navigate('/redirect');
    }
  }, [korisnik]);

  return (
    <ScreenWrapper>
      <Container maxWidth="xs">
        <FormWrapper>
          <FormTitleWrapper>
            <Typography component="h1" variant="h5">Dobrodošli!</Typography>
          </FormTitleWrapper>
          <Box component="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
            {
              (authenticated === false) ?
                <Box marginBottom="20px">
                  <Alert severity="error">Neuspješna prijava. Pokušajte ponovo.</Alert>
                </Box>
                : null
            }
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
                {...register("lozinka")}
                label="Lozinka"
                name="lozinka"
                id="lozinka"
                type="password"
                required
                fullWidth
              />
            </Box>
            <Button type="submit" size="large" variant="contained" fullWidth>
              Prijavi se
            </Button>
          </Box>
        </FormWrapper>
      </Container>
    </ScreenWrapper>
  );
};

export default Login;