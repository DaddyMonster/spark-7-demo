import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { NextRouter } from 'next/dist/client/router';
import React from 'react';
import { AppLayoutType } from '../layout';

interface CustomPageProps {
  router: NextRouter;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

export type ComponentLayoutType<T extends CustomPageProps> =
  | keyof AppLayoutType
  | ((props: T) => ReactJSXElement);

export interface CustomPageType<P = CustomPageProps> extends React.FC<P> {
  layout?: ComponentLayoutType<CustomPageProps & P>;
}
