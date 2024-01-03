import React from "react";
import { Container } from "@mui/material";

import { TableHeading, TableWrapper } from "../../components/common/styled";
import WordsTable from "./WordsTable";

const Words = () => {

  return (
    <Container>
      <TableHeading variant="h2">Riječi</TableHeading>

      <TableWrapper>
        <WordsTable />
      </TableWrapper>
    </Container>
  );
}

export default Words;