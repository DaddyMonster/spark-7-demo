import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { NextPage } from 'next';
import { NextRouter } from 'next/dist/client/router';
import React from 'react';

interface CustomPageProps {
  router: NextRouter;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

export type CustomAppLayoutType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (props: any) => JSX.Element;
};

export type ComponentLayoutType<
  N extends CustomAppLayoutType,
  T extends CustomPageProps = CustomPageProps
> = keyof N | ((props: T) => ReactJSXElement);

export interface _CustomPageType<
  N extends CustomAppLayoutType,
  P = CustomPageProps
> extends React.FC<P> {
  layout?: ComponentLayoutType<N, CustomPageProps & P>;
}

export type CustomPageType<
  N extends CustomAppLayoutType,
  P = CustomPageProps
> = NextPage & _CustomPageType<N, P>;
