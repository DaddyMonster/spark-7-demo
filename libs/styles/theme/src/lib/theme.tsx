import {
  MuiThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from '@material-ui/core';
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ClientTypes } from '../types';
import { createSparkTheme } from './create-theme';

interface Props {
  clientType: ClientTypes;
}

export const SparkThemeProvider: React.FC<Props> = ({
  clientType,
  children,
}) => {
  const theme = createSparkTheme(clientType);

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </StyledThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};
