import styled from 'styled-components';

export const AppRoot = styled.div(({ theme }) => ({
  maxWidth: '100vw',
  overflow: 'hidden',
  width: '100vw',
  minHeight: '100vh',
  background: theme.palette.default.main,
}));