import React from 'react';
import { TagBase, TagBaseProps } from './TagBase';
import styled from 'styled-components';

interface SelectableTagOwnProps {
  selected: boolean;
}

export type SelectableTagProps = TagBaseProps & SelectableTagOwnProps;

export const SelectableTag = styled(TagBase)<SelectableTagProps>(
  ({ theme, selected, colUnion = 'secondary' }) => ({
    background: selected ? theme.palette[colUnion].main : 'none',
  })
);
