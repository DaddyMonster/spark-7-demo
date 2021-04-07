import { ApolloProvider } from '@apollo/client';
import useApollo from '@hessed/apollo-next';
import { ClientTypes, SparkThemeProvider } from '@hessed/styles/theme';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import 'global/css/fonts.css';
import '../styles/tailwind.css';
import { getLayoutComponent } from '../layout/get-layout';
import { NextComponentType, NextPageContext } from 'next';
import { CustomPageType } from '../types/custom-page';
import { useRouter } from 'next/router';

/* ;
import { useCollectionData } from 'react-firebase-hooks/firestore'; */
interface CustomAppProps extends AppProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: NextComponentType<NextPageContext, any, Record<string, string>> &
    CustomPageType;
}

function CustomApp({ Component, pageProps }: CustomAppProps) {
  const apolloClient = useApollo(pageProps);
  const router = useRouter();

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const LayoutComponent = getLayoutComponent(Component.layout);

  return (
    <>
      <Head>
        <title>SparkLite</title>
      </Head>
      <SparkThemeProvider clientType={ClientTypes.Seven}>
        <ApolloProvider client={apolloClient}>
          {LayoutComponent({
            children: <Component {...pageProps} key={router.asPath} />,
            router,
          })}
        </ApolloProvider>
      </SparkThemeProvider>
    </>
  );
}

export default CustomApp;
