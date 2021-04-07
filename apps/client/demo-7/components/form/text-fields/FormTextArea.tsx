import { Box, Typography } from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';
import React, { useRef, useEffect } from 'react';
import { FormFieldRoot } from './FormTextField';
import styled from 'styled-components';
import { useField } from 'formik';
interface Props {
  label: string;
  rows?: number;
  name: string;
  placeholder?: string;
  removeErrorIf?: string;
}

const FormTextArea = ({
  label,
  rows = 2,
  name,
  placeholder,
  removeErrorIf,
}: Props) => {
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
    <FormFieldRoot>
      <Typography fontSize="1rem" className="mb-1" color={grey[500]}>
        {label}
      </Typography>
      <Box px={2} display="flex">
        <TextArea
          name="description"
          rows={rows}
          onChange={handleChange}
          {...props}
          placeholder={placeholder}
        />
      </Box>
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

export default FormTextArea;

const TextArea = styled.textarea(({ theme }) => ({
  flex: '1 0 auto',
  resize: 'none',
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: 5,
  fontSize: '1rem',
  fontFamily: theme.typography.fontFam.guide,
  padding: theme.spacing(0.5),
}));
export const FormErrorWrap = styled.div(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  bottom: -15,
  left: 0,
}));
