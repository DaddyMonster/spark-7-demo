import React from 'react';
import { SevenItems } from '../../constants/sidebar-items';
import { SideRenderer } from './SideRenderer';

export const SevenRenderer = () => {
  return <SideRenderer navItems={SevenItems} />;
};
