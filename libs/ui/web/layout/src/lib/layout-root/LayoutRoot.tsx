import React from 'react';
import { SevenTopNav, SevenTopNavProps } from '@hessed/ui/web/navs';
import { AppRoot } from './AppRoot';

interface LayoutRootProps extends SevenTopNavProps {
  children: React.ReactNode;
}

export const LayoutRoot = ({ children, ...props }: LayoutRootProps) => {
  return (
    <AppRoot>
      <SevenTopNav {...props} />
      {children}
    </AppRoot>
  );
};
