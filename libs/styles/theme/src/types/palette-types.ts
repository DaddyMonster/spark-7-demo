import { PaletteColor, Theme } from '@material-ui/core';
import { ClientTypes } from './spark-client-types';

export type ColorOptionUnion =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'default'
  | 'black';

export interface ColorAlphaOption {
  color: ColorOptionUnion;
  op?: number;
  perc?: string;
}

export type CreateGradient = (
  theme: Theme
) => (ops: ColorAlphaOption[], dir?: string) => string;

export type RequiredPaletteArg = {
  main: string;
};

export type PaletteColors = {
  [key in ColorOptionUnion]: Partial<PaletteColor> & RequiredPaletteArg;
};

export type PlatteClientMap = {
  [key in ClientTypes]: PaletteColors & { gradient: CreateGradient };
};
