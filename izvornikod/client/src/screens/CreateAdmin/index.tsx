import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Typography, Alert, Stack } from "@mui/material";

import route from "../../constants/route";
import { useAppDispatch } from "../../redux/store";
import { registerStudent } from "../../redux/slices/authSlice";
import { FormTitleWrapper, FormWrapper, ScreenWrapper } from "./index.styled";
import CreateAdminInput from "../../types/inputs/user/CreateAdminInput";

const CreateAdmin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CreateAdminInput>();

  const onSubmit = (data: CreateAdminInput) => {
    dispatch(registerStudent(data))
    navigate(`/${route.login}`);
  };

  return (
    <ScreenWrapper>
      <Container maxWidth="xs">
        <FormWrapper>
          <FormTitleWrapper>
            <Typography component="h1" variant="h5">Create admin</Typography>
          </FormTitleWrapper>
          <Box component="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
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
            <Box marginBottom="20px">
              <TextField
                {...register("password")}
                label="Inicijalna lozinka"
                name="password"
                type="password"
                id="password"
                required
                fullWidth
              />
            </Box>
            <Box marginBottom="20px">
              <TextField
                {...register("confirmPassword")}
                label="Inicijalna lozinka"
                name="confirmPassword"
                type="confirmPassword"
                id="confirmPassword"
                required
                fullWidth
              />
            </Box>
            <Button sx={{ marginBottom: "5px" }} type="submit" size="large" variant="contained" fullWidth >
              Potvrdi
            </Button>
            <Button type="button" variant="text" fullWidth onClick={() => navigate(`/${route}`)}>
              Odustani
            </Button>
          </Box>
        </FormWrapper>
      </Container>
    </ScreenWrapper>
  );
};

export default CreateAdmin;