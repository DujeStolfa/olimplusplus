import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, TextField, Button } from "@mui/material";

import { FormWrapper, FormTitleWrapper } from "../Login/index.styled";
import { RootState, useAppDispatch } from "../../redux/store";
import { editPassword } from "../../redux/slices/authSlice";
import route from "../../constants/route";
import EditPasswordInput from "../../types/inputs/user/EditPasswordInput";
import { ScreenWrapper } from "../../components/common/styled";



const EditPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const { register, handleSubmit } = useForm<EditPasswordInput>();

    const onSubmit = (data: EditPasswordInput) => {
        if (user !== undefined) {
            dispatch(editPassword({ ...data, "email": user.email }));
            navigate(`/${route.adminInfo}`);
        }
    };

    return (
        <ScreenWrapper>
            <Container maxWidth="xs">
                <FormWrapper>
                    <FormTitleWrapper>
                        <Typography component="h1" variant="h5">Edit password</Typography>
                    </FormTitleWrapper>
                    <Box component="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
                        <Box marginBottom="20px">
                            <TextField
                                {...register("newPassword")}
                                label="Nova lozinka"
                                name="newPassword"
                                id="newPassword"
                                type="password"
                                required
                                fullWidth
                            />
                        </Box><Box marginBottom="20px">
                            <TextField
                                {...register("confirmNewPassword")}
                                label="Nova lozinka"
                                name="confirmNewPassword"
                                id="confirmNewPassword"
                                type="password"
                                required
                                fullWidth
                            />
                        </Box>
                        <Button sx={{ marginBottom: "5px" }} type="submit" size="large" variant="contained" fullWidth >
                            Potvrdi
                        </Button>
                        <Button type="button" variant="text" fullWidth onClick={() => navigate(`/${route.adminInfo}`)}>
                            Odustani
                        </Button>
                    </Box>
                </FormWrapper>
            </Container>
        </ScreenWrapper>
    );
};

export default EditPassword;



