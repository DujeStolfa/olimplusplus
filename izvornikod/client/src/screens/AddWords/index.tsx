import React, { useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Stack, Typography} from "@mui/material"; // Yoink Dujinog koda i importa iz Logina
import route from "../../constants/route";

const AddWords = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
    
        <Container maxWidth="xs">
            <Typography component="h1" variant="h5">We gon be ading words with this one boys! </Typography>
        </Container>
    );
}

export default AddWords; // export default znaci da je ovo entrypoint