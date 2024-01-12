import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { ButtonsContainer, ScreenWrapper } from "../../components/common/styled";
import { setSelectedStudyType } from "../../redux/slices/studySessionSlice";
import { useAppDispatch } from "../../redux/store";
import STUDY_TYPE from "../../types/enums/StudyType";
import route from "../../constants/route";


const StudyTypes = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <ScreenWrapper>
            <Container maxWidth="md">
                <Typography
                    variant="h2"
                    mb={4}
                    display="flex"
                    justifyContent="center"
                >
                    Odaberite način učenja
                </Typography>
                <ButtonsContainer>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => {
                            dispatch(setSelectedStudyType(STUDY_TYPE.ForeignToNative));
                            navigate(`/${route.study}`);
                        }}
                    >
                        Prijevod strane riječi
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => {
                            dispatch(setSelectedStudyType(STUDY_TYPE.NativeToForeign));
                            navigate(`/${route.study}`);
                        }}
                    >
                        Prijevod na strani jezik
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => {
                            dispatch(setSelectedStudyType(STUDY_TYPE.Listening));
                            navigate(`/${route.study}`);
                        }}
                    >
                        Slušanje i pisanje
                    </Button>
                    <Button size="large">Snimanje izgovora</Button>
                </ButtonsContainer>
            </Container>
        </ScreenWrapper>
    );
}

export default StudyTypes;