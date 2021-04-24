import styled from 'styled-components';

export const LinedTypo = styled.p(({ theme }) => ({
  width: '100%',
  textOverflow: 'ellipsis',
  wordWrap: 'break-word',
  overflow: 'hidden',
  maxHeight: '8rem',
  display: 'block',
  lineHeight: '2rem',
  fontSize: '1.7rem',
  fontFamily: theme.typography.fontFam.guide,
  marginBottom: theme.spacing(1),
}));
