import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";

import ROLE from "../../types/enums/Role";
import route from "../../constants/route";
import LoginInput from "../../types/inputs/user/LoginInput";
import { RootState, useAppDispatch } from "../../redux/store";
import { attemptLogin } from "../../redux/slices/authSlice";
import { FormTitleWrapper, FormWrapper } from "./index.styled";
import { ScreenWrapper } from "../../components/common/styled";


const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, authenticated } = useSelector((state: RootState) => state.auth)
  const { register, handleSubmit } = useForm<LoginInput>();

  const onSubmit = (data: LoginInput) => {
    dispatch(attemptLogin(data));
  };

  useEffect(() => {
    if (user !== undefined) {
      if (user.role === ROLE.Admin) {
        navigate(`/${route.selectLanguage}/admin`);
      } else if (user.role === ROLE.Student) {
        if (user.passwordchanged) {
          navigate(`/${route.selectLanguage}/student`);
        } else {
          navigate(`/${route.editPassword}`);
        }
      }
    }
  }, [user]);

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
                  <Alert severity="error">Neuspješna prijava. Provjerite podatke i pokušajte ponovo.</Alert>
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
                {...register("password")}
                label="Lozinka"
                name="password"
                id="password"
                type="password"
                required
                fullWidth
              />
            </Box>
            <Button sx={{ marginBottom: "5px" }} type="submit" size="large" variant="contained" fullWidth>
              Prijavi se
            </Button>
            <Button variant="text" fullWidth onClick={() => navigate(`/${route.register}`)}>
              Registriraj se
            </Button>
          </Box>
        </FormWrapper>
      </Container>
    </ScreenWrapper>
  );
};

export default Login;