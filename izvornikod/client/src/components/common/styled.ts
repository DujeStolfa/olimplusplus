import styled from 'styled-components';

import { Box, Stack } from '@mui/material';

export const InfoWrapper = styled(Box)`
  display: flex;  
  flex-direction: column;  
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const ActionsWrapper = styled(Stack)`
  margin-top: 2em;
  margin-bottom: 1em;
`;
