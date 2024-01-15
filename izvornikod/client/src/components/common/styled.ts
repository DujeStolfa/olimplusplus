import styled from 'styled-components';

import { Box, Paper, Stack, Typography } from '@mui/material';

export const InfoWrapper = styled(Box)`
  display: flex;  
  flex-direction: column;  
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const ScreenWrapper = styled(Box)`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const ActionsWrapper = styled(Stack)`
  margin-top: 2em;
  margin-bottom: 1em;
`;

export const TableWrapper = styled(Paper)`
    width: 100%;
`;

export const TableHeading = styled(Typography)`
    padding-block: 0.5em;
    padding-inline: 0.3em;
`;

export const ButtonsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content:center;
  gap: 1.5em;
`;

export const FormWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5em;
`;

export const FormTitleWrapper = styled(Box)`
  padding-bottom: 2em;
`;
