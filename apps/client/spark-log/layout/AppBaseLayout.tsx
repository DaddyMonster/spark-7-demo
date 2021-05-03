import React from 'react';
import { LayoutRoot } from '@hessed/ui/web/layout';
import { LogAppTopNav } from '../components/top-nav/LogAppTopNav';
export const AppBaseLayout: React.FC = ({ children }) => {
  return <LayoutRoot TopNavComponent={LogAppTopNav}>{children}</LayoutRoot>;
};
