import React from "react";
import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { TableHeading } from "../../components/common/styled";
import { DictionaryGridWrapper } from "./index.styled";
import { RootState } from "../../redux/store";
import DictionaryCard from "./DictionaryCard";

const StudentDictionaries = () => {
  const { dictionaries } = useSelector((state: RootState) => state.studentDictionaries);
  return (
    <Container>
      <TableHeading variant="h2">Rječnici</TableHeading>

      <DictionaryGridWrapper>
        {dictionaries.length !== 0 ?
          dictionaries.map(el => <DictionaryCard dictionary={el} />)
          : <Typography variant="h6" color="gray"> Nema dostupnih rječnika </Typography>}
      </DictionaryGridWrapper>
    </Container>
  );
}

export default StudentDictionaries;