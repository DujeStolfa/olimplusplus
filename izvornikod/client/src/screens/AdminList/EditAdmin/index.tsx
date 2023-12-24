import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../../../redux/store";
import { editAdmin } from "../../../redux/slices/adminSlice";
import { FormTitleWrapper, FormWrapper, ScreenWrapper } from "./index.styled";
import EditAdminInput from "../../../types/inputs/user/EditAdminInput";
import User from "../../../types/models/User";

interface Props {
  toggleDrawer: () => void;
  refreshAdmins: () => void;
  admin: User | undefined;
}

const EditAdmin: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<EditAdminInput>();
  const [error, setError] = useState(false);

  const onSubmit = async (data: EditAdminInput) => {
    if (props.admin)
      await dispatch(editAdmin({ admin: data, adminId: props.admin.userid }));
    props.toggleDrawer();
    props.refreshAdmins();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value !== "admin" && value !== "student") setError(true);
    else setError(false);
  };

  return (
    <ScreenWrapper>
      <Container maxWidth="xs">
        <FormWrapper>
          <FormTitleWrapper>
            <Typography component="h1" variant="h5">
              Edit admin
            </Typography>
          </FormTitleWrapper>
          <Box component="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
            <Box marginBottom="20px">
              <TextField
                {...register("firstname")}
                label="Ime"
                name="firstname"
                id="firstname"
                defaultValue={props.admin?.firstname}
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
                defaultValue={props.admin?.lastname}
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
                defaultValue={props.admin?.email}
                required
                fullWidth
              />
            </Box>
            <Box marginBottom="20px">
              <TextField
                {...register("role")}
                label="Uloga"
                name="role"
                id="role"
                onChange={handleInputChange}
                error={error}
                defaultValue={props.admin?.role}
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

export default EditAdmin;
