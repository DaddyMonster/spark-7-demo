import { ClientTypes, SparkThemeProvider } from '@hessed/styles/theme';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import 'global/css/fonts.css';
import 'global/tailwind/seven/tailwindcss-seven.css';
import { getLayoutComponent } from '../layout/get-layout';
import { NextComponentType, NextPageContext } from 'next';
import { CustomPageType } from '../types/custom-page';
import { useRouter } from 'next/router';
import { useInitAuth } from '../hooks/initAuth';
import { useInitChat } from '../hooks/initChat';
import wb from '../lib/workbox';
import 'react-perfect-scrollbar/dist/css/styles.css';

interface CustomAppProps extends AppProps {
  Component: NextComponentType<
    NextPageContext,
    unknown,
    Record<string, string>
  > &
    CustomPageType;
}

function CustomApp({ Component, pageProps }: CustomAppProps) {
  const router = useRouter();
  const [user] = useInitAuth({ router });
  useInitChat(user);

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
      wb();
    }
  }, []);

  const LayoutComponent = getLayoutComponent(Component.layout);

  return (
    <>
      <Head>
        <title>SparkLite</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <SparkThemeProvider clientType={ClientTypes.Seven}>
        {LayoutComponent({
          children: <Component {...pageProps} key={router.asPath} />,
          router,
        })}
      </SparkThemeProvider>
    </>
  );
}

export default CustomApp;
