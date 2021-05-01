import React from 'react';
import styled from 'styled-components';

export const BoxedTypo = styled.h6(({ theme }) => ({
  padding: theme.spacing(1, 3),
  display: 'inline-block',
  fontSize: '1.5rem',
  background: theme.palette.primary.main,
  color: '#fff',
  textAlign: 'center',
  boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.8)',
}));
