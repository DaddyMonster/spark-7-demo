import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { ColorOptionUnion } from '@hessed/styles/theme';

export const FormTypoLabel = styled(Typography)<{
  isFocused: boolean;
  labelColorUnion?: ColorOptionUnion;
}>(({ theme, isFocused, labelColorUnion = 'info' }) => ({
  fontSize: '1rem',
  marginBottom: theme.spacing(0.7),
  color: isFocused
    ? theme.palette[labelColorUnion].main
    : theme.palette.grey[500],

  [theme.breakpoints.down('md')]: {
    fontSize: '0.8rem',
    marginBottom: theme.spacing(0.5),
  },
}));
