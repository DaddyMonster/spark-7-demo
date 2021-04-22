import { InputBaseProps, Typography } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import { red } from '@material-ui/core/colors';
import BaseFormTextField from './BaseFormTextField';
import { FormErrorLabel } from './FormErrorLabel';

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
      <FormErrorLabel
        message={meta.error}
        show={Boolean(meta.touched && meta.error)}
      />
    </FormFieldRoot>
  );
};

export const FormFieldRoot = styled.div(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(0, 1.5),
  marginBottom: theme.spacing(0.5),
  position: 'relative',
}));
