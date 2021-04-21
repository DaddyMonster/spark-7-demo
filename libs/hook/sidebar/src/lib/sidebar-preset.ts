import { Breakpoint } from '@material-ui/core';

export type SidebarStatus = 'hidden' | 'mini' | 'full';

export interface SidebarProperty {
  width: number;
  kickIn: Breakpoint;
  upDown: 'up' | 'down';
}

export type SidebarPreset = {
  [key in SidebarStatus]: SidebarProperty;
};

export const DEFAULT_SIDE_PRESET: SidebarPreset = {
  full: {
    kickIn: 'md',
    upDown: 'up',
    width: 280,
  },
  hidden: {
    kickIn: 'md',
    upDown: 'down',
    width: 3,
  },
  mini: {
    kickIn: 'md',
    upDown: 'up',
    width: 50,
  },
};
