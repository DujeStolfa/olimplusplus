import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, TextField, Button, Alert } from "@mui/material";

import { FormWrapper, FormTitleWrapper } from "../Login/index.styled";
import { RootState, useAppDispatch } from "../../redux/store";
import { editPassword } from "../../redux/slices/authSlice";
import { ScreenWrapper } from "../../components/common/styled";
import EditPasswordInput from "../../types/inputs/user/EditPasswordInput";
import route from "../../constants/route";



const EditPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const { register, handleSubmit } = useForm<EditPasswordInput>();
    const [newPwd, setNewPwd] = useState<string>("");
    const [repeatNewPwd, setRepeatNewPwd] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    const onSubmit = (data: EditPasswordInput) => {
        if (user !== undefined) {
            setSubmitted(true);
            if (repeatNewPwd === newPwd) {
                dispatch(editPassword({ ...data, "email": user.email }));
                if (user.passwordchanged) {
                    navigate(`/${route.selectDictionary}`);
                } else {
                    navigate(`/${route.selectLanguage}/student`);
                }
            }
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
                        {
                            (newPwd !== repeatNewPwd && submitted) ?
                                <Box marginBottom="20px">
                                    <Alert severity="error">Lozinke se razlikuju!</Alert>
                                </Box>
                                : null
                        }
                        <Box marginBottom="20px">
                            <TextField
                                {...register("newPassword")}
                                label="Nova lozinka"
                                name="newPassword"
                                id="newPassword"
                                type="password"
                                value={newPwd}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setNewPwd(event.target.value);
                                }}
                                required
                                fullWidth
                            />
                        </Box>
                        <Box marginBottom="20px">
                            <TextField
                                {...register("confirmNewPassword")}
                                label="Ponovi novu lozinku"
                                name="confirmNewPassword"
                                id="confirmNewPassword"
                                type="password"
                                value={repeatNewPwd}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setRepeatNewPwd(event.target.value);
                                }}
                                required
                                fullWidth
                            />
                        </Box>
                        <Button sx={{ marginBottom: "5px" }} type="submit" size="large" variant="contained" fullWidth >
                            Potvrdi
                        </Button>
                        <Button
                            type="button"
                            variant="text"
                            fullWidth
                            onClick={() => {
                                if (user !== undefined) {
                                    if (user.passwordchanged) {
                                        navigate(`/${route.selectDictionary}`);
                                    } else {
                                        navigate(`/${route.selectLanguage}/student`);
                                    }
                                }
                            }}>
                            Odustani
                        </Button>
                    </Box>
                </FormWrapper>
            </Container>
        </ScreenWrapper>
    );
};

export default EditPassword;



