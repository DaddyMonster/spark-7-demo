import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const FormTypoLabel = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  marginBottom: theme.spacing(0.7),
  color: theme.palette.grey[500],
  [theme.breakpoints.down('md')]: {
    fontSize: '0.8rem',
    marginBottom: theme.spacing(0.5),
  },
}));
