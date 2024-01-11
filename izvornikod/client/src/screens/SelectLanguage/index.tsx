import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { RootState, useAppDispatch } from "../../redux/store";
import { ScreenWrapper } from "../../components/common/styled";
import { setSelectedLanguage } from "../../redux/slices/languageSlice";
import { LanguagesContainer } from "./index.styled";
import Language from "../../types/models/Language";
import ROLE from "../../types/enums/Role";
import route from "../../constants/route";

const SelectLanguage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { languages } = useSelector((state: RootState) => state.languages);
    const { user } = useSelector((state: RootState) => state.auth);

    const handleSelectLanguage = (lang: Language) => {
        if (user !== undefined) {
            dispatch(setSelectedLanguage(lang));
            if (user.role === ROLE.Admin) {
                navigate(`/${route.words}`);
            } else {
                navigate(`/${route.selectDictionary}`)
            }
        }
    }

    return (
        <ScreenWrapper>
            <Container maxWidth="md">
                <Typography
                    variant="h2"
                    mb={4}
                    display="flex" justifyContent="center"
                >
                    Odaberite jezik
                </Typography>

                <LanguagesContainer>{
                    languages.map(el =>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => handleSelectLanguage(el)}
                        >
                            {`${el.languagename} - ${el.isocode.toUpperCase()}`}
                        </Button>
                    )
                }</LanguagesContainer>
            </Container>
        </ScreenWrapper>
    );
}

export default SelectLanguage;
