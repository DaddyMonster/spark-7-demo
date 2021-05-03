import styled from 'styled-components';

export const AppRoot = styled.div(({ theme }) => ({
  overflow: 'hidden',
  width: '100%',
  minHeight: '100vh',
  background: theme.palette.default.main,
}));
