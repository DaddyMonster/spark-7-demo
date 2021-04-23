import { alpha } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { TextFieldBase } from './TextFieldBase';

/* 

개선 :  useReducer 로 State 관리하기!

*/

export interface SimpleAutoCompleteProps<T, P> {
  options: T[];
  defaultVal?: T;
  optionRenderer: (args: T) => JSX.Element;
  getLabel: (args: T) => string;
  getValue: (args: T) => P;
  onValueChange: (val: P) => void;
  fullWidth?: boolean;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  name?: string;
}

const matchTester = (tester: string, testis: string[]) => {
  const regex = new RegExp(tester.toLowerCase());
  return testis.some((val) => regex.test(val.toLowerCase()));
};

export function SimpleAutoComplete<T, P>({
  getLabel,
  getValue,
  optionRenderer,
  options,
  defaultVal,
  onValueChange,
  fullWidth = true,
  onBlur,
  onFocus,
  name,
}: SimpleAutoCompleteProps<T, P>) {
  const [open, setopen] = useState(false);
  const [selected, setselected] = useState<T | null>(defaultVal ?? null);
  const [_inputText, setinputText] = useState('');
  const [timeout, settimeout] = useState(false);

  const hovering = useRef(false);
  const inputTimeout = useRef(null);
  const triggerTimeout = () => {
    settimeout(true);
    inputTimeout.current = setTimeout(() => {
      settimeout(false);
    }, 1000);
  };

  const inputText = useMemo(() => {
    if (timeout || _inputText) return _inputText;
    if (selected) return getLabel(selected);
    return null;
  }, [selected, _inputText, getLabel, timeout]);

  const filteredOption = useMemo(
    () => options.filter((x) => matchTester(_inputText, [getLabel(x)])),
    [options, _inputText, getLabel]
  );

  const setSelected = (idx: number) => {
    const item = filteredOption[idx];
    setselected(item);
    setinputText('');
    onValueChange(getValue(item));
    setopen(false);
  };

  const focusHandler = (e: React.FocusEvent) => {
    setopen(true);
    onFocus && onFocus(e);
  };
  const blurHandler = (e: React.FocusEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setopen(hovering.current ? true : false);
    onBlur && onBlur(e);
  };

  return (
    <Root fullWidth={fullWidth}>
      <TextWrapper>
        <TextFieldBase
          name={name}
          onFocus={focusHandler}
          onBlur={blurHandler}
          value={inputText}
          onChange={(e) => {
            triggerTimeout();
            setinputText(e.target.value);
          }}
        />
      </TextWrapper>
      <div className="relative w-full">
        {open && (
          <OpRendererRoot>
            {filteredOption.map((ops, i) => (
              <OptionWrapper
                onMouseEnter={() => void (hovering.current = true)}
                onMouseLeave={() => void (hovering.current = false)}
                selected={ops === selected}
                key={i}
                onClick={() => setSelected(i)}
              >
                {optionRenderer(ops)}
              </OptionWrapper>
            ))}
          </OpRendererRoot>
        )}
      </div>
    </Root>
  );
}

const Root = styled.div<{ fullWidth: boolean }>(({ fullWidth }) => ({
  width: fullWidth ? '100%' : 'auto',
  flex: '1 0 auto',
  position: 'relative',
}));

const TextWrapper = styled.div(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
}));

const OpRendererRoot = styled.div(({ theme }) => ({
  width: '100%',
  maxHeight: 300,
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  background: '#fff',
  zIndex: 500,
}));

const OptionWrapper = styled.div<{ selected: boolean }>(
  ({ theme, selected }) => ({
    width: '100%',
    padding: theme.spacing(0.5, 1.5),
    background: selected ? grey[400] : 'none',
    '&:hover': {
      background: selected
        ? grey[400]
        : alpha(theme.palette.secondary.main, 0.5),
    },
  })
);
