import { TextFieldBase } from '@hessed/ui/web/atom';
import {
  createMuiTheme,
  Theme,
  ThemeProvider,
  Typography,
  useTheme,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { DateTimePicker, DateTimePickerProps } from '@material-ui/pickers';
import dy from 'dayjs';
import { useField } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FormErrorLabel, FormFieldRoot, FormTypoLabel } from '../text-fields';
export interface DateTimePickerFormProps
  extends Omit<
    DateTimePickerProps,
    'onBlur' | 'value' | 'onChange' | 'onFocus' | 'name'
  > {
  name: string;
  label: string;
  validator?: (date: Date) => string | null;
}

const ColorSwapedTheme = (theme: Theme) =>
  createMuiTheme({
    ...theme,
    palette: {
      ...theme.palette,
      primary: { main: theme.palette.secondary.main },
      secondary: { main: theme.palette.primary.main },
    },
    typography: {
      ...theme.typography,
      h4: {
        ...theme.typography.h4,
        fontSize: '1.7rem',
      },
      h3: {
        ...theme.typography.h3,
        fontSize: '2.7rem',
        lineHeight: 1.3,
      },
      h6: {
        ...theme.typography.h6,
      },
    },
  });

export const DateTimePickerForm = ({
  name,
  label,
  ...props
}: DateTimePickerFormProps) => {
  const [
    { onBlur, ...fieldProps },
    { value, ...meta },
    { setValue },
  ] = useField(name);
  const [focus, setfocus] = useState(false);
  const theme = useTheme();
  const CalTheme = ColorSwapedTheme(theme);
  const handleBlur = (e: React.FocusEvent) => {
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
      <ThemeProvider theme={CalTheme}>
        <DateTimePicker
          {...props}
          name={name}
          onFocus={() => setfocus(true)}
          onBlur={handleBlur}
          value={value}
          fullWidth
          onTimeUpdate={(e) => console.log(e.timeStamp)}
          onChange={(date) => setValue(dy(date))}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          TextFieldComponent={TextFieldBase as any}
          /* ToolbarComponent={Toolbar} */
        />
      </ThemeProvider>
      <FormErrorLabel
        message={meta.error}
        show={meta.touched && Boolean(meta.error)}
      />
    </FormFieldRoot>
  );
};

// BELOW DOSEN'T WORK DUE TO DATE NOT UPDATING PROPERLY.....

/* const Toolbar = ({
  date: _date,
  openView,
  ampm,
  onChange,
}: ToolbarComponentProps) => {
 
  const date = useMemo(() => _date as Dayjs, [_date]);
  const handleAmPm = (val: boolean) => {
    const factor = (val ? 1 : -1) * 12;
  };
  return (
    <Root>
      <ToolbarRoot>
        <GridWrapper>
          <div className="w-full h-full flex justify-center flex-col">
            <DisplayText selected={openView === 'year'} fontSize="0.8rem">
              {date.year()}
            </DisplayText>
            <DisplayText
              fontSize="1.6rem"
              selected={openView === 'date'}
            >{`${date.format('MMM DD')}`}</DisplayText>
          </div>
        </GridWrapper>
        <GridWrapper>
          <div className="w-full h-full flex justify-center items-center pt-3">
            <DisplayText selected={openView === 'hours'} fontSize="2rem">
              {date.format('HH')}
            </DisplayText>
            <Typography>{' : '}</Typography>
            <DisplayText selected={openView === 'minutes'} fontSize="2rem">
              {date.format('MM')}
            </DisplayText>
            <div className="mx-3">
              <DisplayText selected={ampm} fontSize="1rem">
                AM
              </DisplayText>
              <Divider />
              <DisplayText selected={!ampm} fontSize="1rem">
                PM
              </DisplayText>
            </div>
          </div>
        </GridWrapper>
      </ToolbarRoot>
    </Root>
  );
}; */

const Root = styled.div(({ theme }) => ({
  width: '100%',
  background: theme.palette.secondary.main,
}));

const ToolbarRoot = styled.div(({ theme }) => ({
  width: '100%',
  height: 100,

  display: 'flex',
}));

const GridWrapper = styled.div(({ theme }) => ({
  width: '50%',
  height: '100%',
  padding: theme.spacing(2),
}));

const DisplayText = styled(Typography)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    color: selected ? '#000' : theme.palette.grey[600],
  })
);
