import styled, { css } from 'styled-components';

import { Box, Container, LinearProgress, Paper, Stack } from '@mui/material';

export const QuestionBodyWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2em;
  margin: 1em;
  width: 66%;
  height: 45vh;
`;

export const MultipleChoiceButton = styled(Box) < { $selected?: boolean; }>`
  border: 1px solid rgba(25, 118, 210, 0.5);
  border-radius: 6px;
  padding: 0.8em;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(25, 118, 210, 0.05);
  }

  ${props =>
    props.$selected &&
    css`
      border: 2px solid rgba(25, 118, 210, 0.5);
      background-color: rgba(25, 118, 210, 0.08);
    `};
`;


export const FeedbackWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

export const SpellingFormWrapper = styled(Box)`
  display: flex;
  justify-content: center;
`;
