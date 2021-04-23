import {
  SimpleAutoComplete,
  SimpleAutoCompleteProps,
} from '@hessed/ui/web/atom';
import { grey } from '@material-ui/core/colors';
import { useField } from 'formik';
import React, { useState } from 'react';
import { FormErrorLabel } from './FormErrorLabel';
import { FormFieldRoot } from './FormTextField';
import { FormTypoLabel } from './FormTypoLabel';

interface FormSimpleAutoCompleteProps<T, P>
  extends Omit<
    SimpleAutoCompleteProps<T, P>,
    'onValueChange' | 'onFocus' | 'onBlur'
  > {
  name: string;
  label: string;
}

export function FormSimpleAutoComplete<T, P>({
  label,
  name,
  ...acProps
}: FormSimpleAutoCompleteProps<T, P>) {
  const [{ onBlur }, { value, ...meta }, { setValue }] = useField(name);
  const [focus, setfocus] = useState(false);
  const blurHandler = (e: React.FocusEvent) => {
    setfocus(false);
    onBlur(e);
  };

  return (
    <FormFieldRoot>
      <FormTypoLabel
        fontSize="1rem"
        className="mb-1"
        color={grey[500]}
        isFocused={focus}
      >
        {label}
      </FormTypoLabel>
      <SimpleAutoComplete
        {...acProps}
        name={name}
        onValueChange={(val) => {
          console.log('VALUE', val);
          setValue(val);
        }}
        onFocus={() => setfocus(true)}
        onBlur={blurHandler}
      />
      <FormErrorLabel
        message={meta.error}
        show={Boolean(meta.touched && meta.error)}
      />
    </FormFieldRoot>
  );
}
