import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ClientTypes, SparkThemeProvider } from '@hessed/styles/theme';
import 'global/css/fonts.css';
import 'global/tailwind/log/tailwindcss-seven.css';
import { getLayoutComponent } from '../layout/get-layout';
import { NextComponentType, NextPageContext } from 'next';
import { LogAppPageType } from '../types';
import { useRouter } from 'next/router';

interface CustomAppProps extends AppProps {
  Component: NextComponentType<
    NextPageContext,
    unknown,
    Record<string, string>
  > &
    LogAppPageType;
}

function CustomApp({ Component, pageProps }: CustomAppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
      /*  wb(); */
    }
  }, []);
  const LayoutComponent = getLayoutComponent(
    Component.layout ?? pageProps.layout
  );
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Spark-Log</title>
      </Head>
      <SparkThemeProvider clientType={ClientTypes.Log}>
        {LayoutComponent({
          children: <Component {...pageProps} key={router.asPath} />,
          router,
        })}
      </SparkThemeProvider>
    </>
  );
}

export default CustomApp;
