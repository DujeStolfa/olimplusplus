import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { InfoWrapper } from "../../components/common/styled";
import InfoActions from "../../components/common/InfoActions";

const StudentInfo = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <InfoWrapper>
      <Typography variant="h2" sx={{ marginBottom: 2 }}>Bok, {user?.firstname}!</Typography>
      <Typography variant="h6">Prijavljeni ste kao učenik.</Typography>
      <Typography variant="body1">Vaša email adresa je {user?.email}</Typography>
      <InfoActions />
    </InfoWrapper>
  );
}

export default StudentInfo;