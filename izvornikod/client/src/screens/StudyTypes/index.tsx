import React, { useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Stack, Typography} from "@mui/material"; // Yoink Dujinog koda i importa iz Logina
import { FormTitleWrapper, ScreenWrapper } from "../Login/index.styled";


const StudyTypes = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <ScreenWrapper>
            <Container maxWidth="xs">
                <Typography component="h1" variant="h5">Pick a study method for this dictionary among the following: </Typography>
                <br />
                <Stack direction="column" spacing={2}>
                    <Button size="large">Foreign translation</Button>
                    <Button size="large">Native translation</Button>
                    <Button size="large">Spelling exercise</Button>
                    <Button size="large">Listening exercise</Button>
                </Stack>
            </Container>
        </ScreenWrapper>
    );
}

export default StudyTypes; // export default znaci da je ovo entrypoint