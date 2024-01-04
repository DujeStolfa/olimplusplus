import React from "react";
import { Container } from "@mui/material";
import { TableHeading } from "../../components/common/styled";
import { DictionaryGridWrapper } from "./index.styled";
import DictionaryCard from "./DictionaryCard";

const StudentDictionaries = () => {
  const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  return (
    <Container>
      <TableHeading variant="h2">Rječnici</TableHeading>

      <DictionaryGridWrapper>
        {testData.map(el => <DictionaryCard />)}
      </DictionaryGridWrapper>
    </Container>
  );
}

export default StudentDictionaries;