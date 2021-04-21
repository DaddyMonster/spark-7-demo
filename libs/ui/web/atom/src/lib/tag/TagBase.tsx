import styled from 'styled-components';
import { ColorOptionUnion } from '@hessed/styles/theme';

export interface TagBaseProps {
  fontSize?: number | string;
  colUnion?: ColorOptionUnion;
}

export const TagBase = styled.span<TagBaseProps>(
  ({ theme, colUnion = 'secondary', fontSize = '0.8rem' }) => ({
    padding: theme.spacing(0.5, 2),
    fontSize,
    border: `2px solid ${theme.palette[colUnion].main}`,
    borderRadius: 15,
    margin: theme.spacing(0, 0.7, 0.7, 0),
  })
);
