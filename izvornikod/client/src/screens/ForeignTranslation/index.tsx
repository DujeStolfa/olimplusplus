import React, { useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Stack, Typography} from "@mui/material"; // Yoink Dujinog koda i importa iz Logina
import { ScreenWrapper } from "../Login/index.styled";


const ForeignTranslation = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <ScreenWrapper>
            <Container maxWidth="xs">
                <Typography component="h1" variant="h5">Translate from English to Croatian:</Typography>
                <br />
                <Typography component="h2" variant="h5">Procrastination</Typography>
                <Stack direction="column" spacing={2}>
                    <Button size="large">Word1</Button>
                    <Button size="large">Word2</Button>
                    <Button size="large">Word3</Button>
                    <Button size="large">Wrod4</Button>
                </Stack>
            </Container>
        </ScreenWrapper>
    );
}

export default ForeignTranslation;