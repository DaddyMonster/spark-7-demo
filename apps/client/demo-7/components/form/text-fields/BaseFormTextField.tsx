import { InputBase, InputBaseProps, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React from 'react';
import styled from 'styled-components';
import { FormTypoLabel } from './FormTypoLabel';
interface Props extends InputBaseProps {
  label: string;
}

const BaseFormTextField = ({ label, ...props }: Props) => {
  return (
    <div className="flex-1 mb-4">
      <FormTypoLabel>{label}</FormTypoLabel>
      <Root>
        <Input {...props} />
      </Root>
    </div>
  );
};

export default BaseFormTextField;

const Root = styled.div(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
  display: 'flex',
}));

const Input = styled(InputBase)(({ theme }) => ({
  flex: '1 0 auto',
  height: '100%',
  padding: theme.spacing(0.5, 1),
  border: `2px solid ${theme.palette.grey[600]}`,
  borderRadius: 5,
  '&:focus': {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));
