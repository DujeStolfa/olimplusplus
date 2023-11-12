import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { InfoWrapper } from "../../components/common/styled";

const StudentInfo = () => {
  const { korisnik } = useSelector((state: RootState) => state.auth)

  return (
    <InfoWrapper>
      <Typography variant="h2" sx={{ marginBottom: 2 }}>Bok, {korisnik?.ime}!</Typography>
      <Typography variant="h6">Prijavljeni ste kao učenik.</Typography>
      <Typography variant="body1">Vaša email adresa je {korisnik?.email}</Typography>
    </InfoWrapper>
  );
}

export default StudentInfo;