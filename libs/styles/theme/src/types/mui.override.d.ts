import { Theme } from '@material-ui/core';
import { CreateGradient } from './palette-types';
import { TypoOptionsType } from './typo-types';

declare module '@material-ui/core/styles/createMuiTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme {}
}

declare module '@material-ui/core/styles/createTypography' {
  export interface TypographyOptions {
    fontFam: TypoOptionsType;
  }
  export interface Typography {
    fontFam: TypoOptionsType;
  }
}

declare module '@material-ui/core/styles/createPalette' {
  export interface PaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    success?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    danger: PaletteColorOptions;
    default?: PaletteColorOptions;
    black: PaletteColorOptions;
    info?: PaletteColorOptions;
    gradient: CreateGradient;
  }
  export interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor;
    success: PaletteColor;
    warning: PaletteColor;
    danger: PaletteColor;
    default: PaletteColor;
    black: PaletteColor;
    info: PaletteColor;
    gradient: CreateGradient;
  }
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

export {};
