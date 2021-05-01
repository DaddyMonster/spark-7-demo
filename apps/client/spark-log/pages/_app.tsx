import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ClientTypes, SparkThemeProvider } from '@hessed/styles/theme';
import 'global/css/fonts.css';
import 'global/tailwind/log/tailwindcss-seven.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Spark-Log</title>
      </Head>
      <SparkThemeProvider clientType={ClientTypes.Log}>
        <Component {...pageProps} />
      </SparkThemeProvider>
    </>
  );
}

export default CustomApp;
