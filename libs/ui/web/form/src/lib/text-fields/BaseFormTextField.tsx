import { InputBase, InputBaseProps, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React from 'react';
import styled from 'styled-components';
import { FormTypoLabel } from './FormTypoLabel';
import { TextFieldBase } from '@hessed/ui/web/atom';
import { ColorOptionUnion } from '@hessed/styles/theme';
interface Props extends InputBaseProps {
  label: string;
  isFocused: boolean;
  labelColorUnion?: ColorOptionUnion;
}

const BaseFormTextField = ({
  label,
  isFocused,
  labelColorUnion = 'info',
  ...props
}: Props) => {
  return (
    <div className="flex-1 mb-2">
      <FormTypoLabel isFocused={isFocused} labelColorUnion={labelColorUnion}>
        {label}
      </FormTypoLabel>
      <Root>
        <TextFieldBase {...props} />
      </Root>
    </div>
  );
};

export default BaseFormTextField;

const Root = styled.div(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
  display: 'flex',
}));
