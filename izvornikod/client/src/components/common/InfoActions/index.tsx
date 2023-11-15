import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { ActionsWrapper } from "../styled";
import { useAppDispatch } from "../../../redux/store";
import { attemptLogout } from "../../../redux/slices/authSlice";
import route from "../../../constants/route";

const InfoActions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return <>
    <ActionsWrapper direction="row" spacing={2}>
      <Button variant="outlined" onClick={() => navigate(`/${route.adminInfo}`)}>Podaci o adminu</Button>
      <Button variant="outlined" onClick={() => navigate(`/${route.studentInfo}`)}>Podaci o učeniku</Button>
      <Button variant="outlined" onClick={() => navigate(`/${(Math.random() + 1).toString(36).substring(7)}`)}>Nepostojeća stranica</Button>
    </ActionsWrapper>
    <Button variant="text" onClick={() => dispatch(attemptLogout())}>Odjavi se</Button>
  </>;
};

export default InfoActions;