import { InputBaseProps } from '@material-ui/core';
import { useField } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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
  type = 'text',
}: FormTextFieldProps) => {
  const [{ onChange, onBlur, ...props }, meta, { setError }] = useField(name);
  const [focus, setfocus] = useState(false);
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

  const blurHandler = (e: React.FocusEvent) => {
    setfocus(false);
    onBlur(e);
  };

  return (
    <FormFieldRoot className={rootClass ?? ''}>
      <BaseFormTextField
        isFocused={focus}
        {...textFieldProps}
        {...props}
        onBlur={blurHandler}
        onFocus={() => setfocus(true)}
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
  padding: theme.spacing(0, 3),
  marginBottom: theme.spacing(1.5),
  position: 'relative',
}));
