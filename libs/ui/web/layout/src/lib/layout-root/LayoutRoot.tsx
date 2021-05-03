import React from 'react';
import { AppRoot } from './AppRoot';

interface LayoutRootProps<T = Record<string, unknown>> {
  children: React.ReactNode;
  TopNavComponent: React.ComponentType<T>;
  topNavProps?: T;
}

export function LayoutRoot<T>({
  children,
  TopNavComponent,
  topNavProps,
}: LayoutRootProps<T>) {
  return (
    <AppRoot>
      <TopNavComponent {...topNavProps} />
      {children}
    </AppRoot>
  );
}
