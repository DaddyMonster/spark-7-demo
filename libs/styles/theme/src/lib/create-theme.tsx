import { createMuiTheme } from '@material-ui/core';
import { ClientTypes } from '../types';
import { getPalette } from './palette.overrides';
import { typoOptions } from './typo.overrides';

export const createSparkTheme = (clientType: ClientTypes) =>
  createMuiTheme({
    palette: getPalette(clientType),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typography: { fontFam: typoOptions, fontFamily: typoOptions.guide } as any,
  });
