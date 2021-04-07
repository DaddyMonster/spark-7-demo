import { Typography, TypographyProps } from '@material-ui/core';
import styled from 'styled-components';
export type TypoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl2';

type TypoSizeMap = {
  [key in TypoSize]: number;
};

const typoSizeMap: TypoSizeMap = {
  xs: 0.6,
  sm: 0.75,
  md: 1,
  lg: 1.3,
  xl: 1.6,
  xl2: 2,
};

interface TypoProps extends TypographyProps {
  fs?: TypoSize;
}

export const Typo = styled(Typography)<TypoProps>(({ theme, fs = 'md' }) => ({
  fontSize: typoSizeMap[fs] + 'rem',
}));
