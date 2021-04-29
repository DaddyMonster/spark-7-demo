import React from 'react';
import {
  MuiThemeProvider,
  jssPreset,
  StyledEngineProvider,
} from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles';
import { create } from 'jss';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ClientTypes } from '../types';
import { createSparkTheme } from './create-theme';
const jss = create({ plugins: [...jssPreset().plugins] });

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
      <StylesProvider jss={jss}>
        <MuiThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </StyledEngineProvider>
  );
};
