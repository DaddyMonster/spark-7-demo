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
import { useInitAuth } from '../hooks/initAuth';
import { useInitChat } from '../hooks/initChat';
import 'react-perfect-scrollbar/dist/css/styles.css';
/* ;
import { useCollectionData } from 'react-firebase-hooks/firestore'; */
interface CustomAppProps extends AppProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: NextComponentType<NextPageContext, any, Record<string, string>> &
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
    }
  }, []);

  const LayoutComponent = getLayoutComponent(Component.layout);

  return (
    <>
      <Head>
        <title>Spark-7</title>
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
