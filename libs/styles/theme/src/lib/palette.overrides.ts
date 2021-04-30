import {
  CreateGradient,
  PlatteClientMap,
  PaletteColors,
  ClientTypes,
} from '../types';
import { alpha } from '@material-ui/core';

export const createGradient: CreateGradient = (theme) => {
  return function (ops, dir = 'to right') {
    const stringifiedArr = ops.map((x, i) => {
      const { color: _color, op = 1, perc = '' } = x;
      const color =
        op < 1
          ? alpha(theme.palette[_color].main, op)
          : theme.palette[_color].main;
      return `${color}${perc}${i === ops.length - 1 ? '' : ','}`;
    });
    return `linear-gradient(${dir}, ${stringifiedArr.join(' ')} )`;
  };
};

export const sparkLitePalette: PaletteColors = {
  primary: { main: '#B380AA' },
  secondary: { main: '#61A0AF' },
  success: { main: '#bcd979' },
  warning: { main: '#FCBB6D' },
  danger: { main: '#f06c9b' },
  default: { main: '#475C7A' },
  black: { main: '#293132' },
  info: { main: '#96C9DC' },
};

export const engsparkPalette: PaletteColors = {
  primary: { main: '#000000' },
  secondary: { main: '#000000' },
  success: { main: '#000000' },
  warning: { main: '#000000' },
  danger: { main: '#000000' },
  default: { main: '#000000' },
  black: { main: '#000000' },
  info: { main: '#000000' },
};

export const sevenPalette: PaletteColors = {
  primary: { main: '#000000' },
  secondary: { main: '#c8d7d2' },
  success: { main: '#bcd979' },
  warning: { main: '#FCBB6D' },
  danger: { main: '#d84339' },
  default: { main: '#f4f2f0' },
  black: { main: '#2B2728' },
  info: { main: '#7DAF9C' },
};

export const logPalette: PaletteColors = {
  primary: { main: '#000000' },
  secondary: { main: '#c8d7d2' },
  success: { main: '#bcd979' },
  warning: { main: '#FCBB6D' },
  danger: { main: '#d84339' },
  default: { main: '#f4f2f0' },
  black: { main: '#2B2728' },
  info: { main: '#7DAF9C' },
};

/* 373234 */
const paletteClientMap: PlatteClientMap = {
  [ClientTypes.Lite]: Object.assign(sparkLitePalette, {
    gradient: createGradient,
  }),
  [ClientTypes.Eng]: Object.assign(engsparkPalette, {
    gradient: createGradient,
  }),
  [ClientTypes.Seven]: Object.assign(sevenPalette, {
    gradient: createGradient,
  }),
  [ClientTypes.Log]: Object.assign(logPalette, {
    gradient: createGradient,
  }),
};

export const getPalette = (type: ClientTypes) => {
  return paletteClientMap[type];
};

export default getPalette;
