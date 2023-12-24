import React, { useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material"; // Yoink Dujinog koda i importa iz Logina


const StudyTypes = () => {

    const navigate = useNavigate();
    const location = useLocation();


    return (
        <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 1,
          bgcolor: 'red',
          '&:hover': {
            bgcolor: 'blue',
          },
        }}  // this is just for testing, let me cook
      />
    );
}

export default StudyTypes; // export default znaci da je ovo entrypoint