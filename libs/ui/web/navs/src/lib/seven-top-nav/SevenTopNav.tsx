import React from 'react';
import { SimpleTopNavLogicProps } from '../top-nav/app-top-nav-basic-props';
import { SimpleTopNav } from '../top-nav/SimpleTopNav';
import SevenTopNavLogic from './SevenTopNavLogic';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SevenTopNavProps
  extends Omit<SimpleTopNavLogicProps, 'NavComponent'> {}

export const SevenTopNav: React.FC<SevenTopNavProps> = (props) => {
  return <SevenTopNavLogic NavComponent={SimpleTopNav} {...props} />;
};
