import { Breakpoint } from '@material-ui/core';

export type SidebarStatus = 'hidden' | 'mini' | 'full';

export interface SidebarProperty {
  width: number;
  kickIn: Breakpoint;
  upDown: 'up' | 'down';
  isMini?: boolean;
}

export type SidebarPreset = {
  [key in SidebarStatus]: SidebarProperty;
};

export const DEFAULT_SIDE_PRESET: SidebarPreset = {
  full: {
    kickIn: 'lg',
    upDown: 'up',
    width: 320,
  },
  hidden: {
    kickIn: 'sm',
    upDown: 'down',
    width: 3,
  },
  mini: {
    kickIn: 'lg',
    upDown: 'up',
    width: 50,
    isMini: true,
  },
};
