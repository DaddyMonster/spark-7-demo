import React from 'react';
import { AppRoot } from './AppRoot';
import styled from 'styled-components';

interface TopNavComponentBase {
  topNavHeight: number;
  hideRoot: boolean;
}

interface LayoutRootProps<T extends TopNavComponentBase> {
  children: React.ReactNode;
  TopNavComponent: React.ComponentType<T>;
  topNavProps?: T;
}

export function LayoutRoot<T extends TopNavComponentBase>({
  children,
  TopNavComponent,
  topNavProps,
}: LayoutRootProps<T>) {
  const { hideRoot, topNavHeight } = topNavProps;
  return (
    <AppRoot>
      <TopNavComponent
        {...topNavProps}
        hideRoot={hideRoot}
        topNavHeight={topNavHeight}
      />
      <ContentWrap hideRoot={hideRoot} topNavHeight={topNavHeight}>
        {children}
      </ContentWrap>
    </AppRoot>
  );
}

const ContentWrap = styled.div<{ hideRoot: boolean; topNavHeight: number }>(
  ({ hideRoot, topNavHeight }) => ({
    width: '100%',
    minHeight: '100vh',
    paddingTop: hideRoot ? 0 : topNavHeight,
    transition: 'padding 500ms ease',
  })
);
