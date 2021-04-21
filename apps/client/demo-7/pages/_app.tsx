import { ClientTypes, SparkThemeProvider } from '@hessed/styles/theme';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import 'global/css/fonts.css';
import 'global/tailwind/seven/tailwindcss-seven.css';
import { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router';
/* import wb from '../lib/workbox'; */
import 'react-perfect-scrollbar/dist/css/styles.css';
import { getLayoutComponent } from '../layout/get-layout';
import { SevenPageType } from '../types';
import { useAuthInitiator } from '@hessed/client-module/seven-auth';
import { auth } from '@hessed/client-lib/firebase';
import { CircularProgress } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import appWithI18n from 'next-translate/appWithI18n';
import i18nConfig from '../i18n';
interface CustomAppProps extends AppProps {
  Component: NextComponentType<
    NextPageContext,
    unknown,
    Record<string, string>
  > &
    SevenPageType;
}

function CustomApp({ Component, pageProps }: CustomAppProps) {
  const router = useRouter();
  const [user, userLoading] = useAuthState(auth);
  const [loading] = useAuthInitiator({
    oAuthState: { uid: user?.uid ?? null, loading: userLoading },
    router,
  });
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
      /*  wb(); */
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
        {loading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          LayoutComponent({
            children: <Component {...pageProps} key={router.asPath} />,
            router,
          })
        )}
      </SparkThemeProvider>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default appWithI18n(CustomApp as any, {
  ...i18nConfig,
  skipInitialProps: true,
});
