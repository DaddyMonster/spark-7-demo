import { auth } from '@hessed/client-lib/firebase';
import { useAuthInitiator } from '@hessed/client-module/seven-auth';
import { ClientTypes, SparkThemeProvider } from '@hessed/styles/theme';
import { CircularProgress } from '@material-ui/core';
import 'global/css/fonts.css';
import 'global/tailwind/seven/tailwindcss-seven.css';
import { NextComponentType, NextPageContext } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
/* import wb from '../lib/workbox'; */
import 'react-perfect-scrollbar/dist/css/styles.css';
import { getLayoutComponent } from '../layout/get-layout';
import { SevenPageType } from '../types';
import { enableMapSet } from 'immer';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import dyUtil from '@date-io/dayjs';
import dy from 'dayjs';
import locale from 'dayjs/locale/*';

enableMapSet();

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
  // THIS IS CURRENTLY A TAKEAWAY WHEN USING I18N...
  const LayoutComponent = getLayoutComponent(
    Component.layout ?? pageProps.layout
  );

  const { __locale } = pageProps;
  dy.locale(__locale);

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
        <MuiPickersUtilsProvider utils={dyUtil}>
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
        </MuiPickersUtilsProvider>
      </SparkThemeProvider>
    </>
  );
}

export default CustomApp;
