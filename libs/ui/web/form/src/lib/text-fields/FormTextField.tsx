import { InputBaseProps, Typography } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import { red } from '@material-ui/core/colors';
import BaseFormTextField from './BaseFormTextField';
import { FormErrorWrap } from './FormErrorWrap';

interface FormTextFieldProps {
  name: string;
  textFieldProps?: InputBaseProps;
  label: string;
  placeholder?: string;
  removeErrorIf?: string;
  type?: string;
  rootClass?: string;
  textFieldClass?: string;
}

export const FormTextField = ({
  label,
  name,
  placeholder,
  removeErrorIf,
  rootClass,
  textFieldClass,
  textFieldProps,
  type,
}: FormTextFieldProps) => {
  const [{ onChange, ...props }, meta, { setError }] = useField(name);

  const removeErrRef = useRef(false);
  useEffect(() => {
    if (meta.error === removeErrorIf) {
      removeErrRef.current = true;
    }
  }, [props.value, removeErrorIf, meta.error]);

  const handleChange = (e: React.ChangeEvent) => {
    if (removeErrRef.current) {
      setError(undefined);
    }
    onChange(e);
  };

  return (
    <FormFieldRoot className={rootClass ?? ''}>
      <BaseFormTextField
        {...textFieldProps}
        {...props}
        onChange={handleChange}
        error={Boolean(meta.error)}
        label={label}
        placeholder={placeholder}
        type={type}
        className={textFieldClass}
      />
      <FormErrorWrap>
        {meta.touched && meta.error && (
          <Typography
            fontSize="0.7rem"
            className="font-pretty"
            color={red[400]}
          >
            {meta.error}
          </Typography>
        )}
      </FormErrorWrap>
    </FormFieldRoot>
  );
};

export const FormFieldRoot = styled.div(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(0, 1.5),
  marginBottom: theme.spacing(2.2),
  position: 'relative',
}));
