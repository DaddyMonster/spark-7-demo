import {
  Autocomplete,
  AutocompleteProps,
  Box,
  TextField,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { useField } from 'formik';
import React from 'react';
import { FormErrorLabel } from './FormErrorLabel';
import { FormFieldRoot } from './FormTextField';
import { FormTypoLabel } from './FormTypoLabel';
type AC<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>;

interface FormSimpleAutoCompleteProps<T> {
  name: string;
  label: string;
  acProps: Omit<AC<T>, 'renderInput'>;
  getValue: (val: T) => unknown;
  renderer: (val: T) => JSX.Element;
}
const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});
export function FormSimpleAutoComplete<T>({
  label,
  name,
  acProps,
  getValue,
  renderer,
}: FormSimpleAutoCompleteProps<T>) {
  const classes = useStyles();
  const [{ onChange, ...fieldProps }, meta, { setValue }] = useField(name);
  const { options, ...props } = acProps;
  return (
    <FormFieldRoot>
      <FormTypoLabel fontSize="1rem" className="mb-1" color={grey[500]}>
        {label}
      </FormTypoLabel>
      <Box display="flex" className="w-full">
        <Autocomplete
          {...props}
          {...fieldProps}
          options={options}
          classes={{
            option: classes.option,
          }}
          className="flex-1"
          renderOption={(_, renderProp) => (
            <div onClick={() => setValue(getValue(renderProp))}>
              {renderer(renderProp)}
            </div>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
            />
          )}
        />
      </Box>
      <FormErrorLabel
        message={meta.error}
        show={Boolean(meta.touched && meta.error)}
      />
    </FormFieldRoot>
  );
}
