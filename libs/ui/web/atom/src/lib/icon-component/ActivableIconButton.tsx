import React, { ReactElement, useMemo } from 'react';
import { IconType } from 'react-icons/lib';
import { ColorOptionUnion } from '@hessed/styles/theme';
import { grey, red } from '@material-ui/core/colors';
import { IconButton, Tooltip } from '@material-ui/core';
import { useTheme } from 'styled-components';

export interface OnActivableIconClickArgs {
  e: React.MouseEvent<HTMLButtonElement>;
  id: string;
  active: boolean;
  idx?: number;
}

export interface ActivableIconButton {
  defaultColor?: string;
  defaultColUni?: ColorOptionUnion;
  activeColor?: string;
  activeColUni?: ColorOptionUnion;
  Icon: IconType;
  tooltipLabel?: string;
  onClick: (args: OnActivableIconClickArgs) => void;
  id: string;
  idx?: number;
  size?: 'small' | 'medium';
  active?: boolean;
  disabled?: boolean;
}

export function ActivableIconButton({
  Icon,
  id,
  onClick,
  activeColUni,
  activeColor = red[300],
  defaultColUni,
  defaultColor = grey[500],
  idx,
  tooltipLabel,
  size = 'medium',
  active = false,
  disabled = false,
}: ActivableIconButton) {
  const theme = useTheme();
  const defaultFill = useMemo(
    () => (defaultColUni ? theme.palette[defaultColUni].main : defaultColor),
    [theme, defaultColUni, defaultColor]
  );

  const activeFill = useMemo(
    () => (activeColUni ? theme.palette[activeColUni].main : activeColor),
    [theme, activeColor, activeColUni]
  );

  const fill = useMemo(() => (active ? activeFill : defaultFill), [
    active,
    activeFill,
    defaultFill,
  ]);

  return (
    <Tooltip title={tooltipLabel}>
      <IconButton size={size} onClick={(e) => onClick({ e, id, idx, active })}>
        <Icon fill={disabled ? grey[300] : fill} />
      </IconButton>
    </Tooltip>
  );
}
