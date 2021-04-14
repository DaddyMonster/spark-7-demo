import React from 'react';
import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          {/* PWA primary color */}

          <meta name="application-name" content="Spark-7" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Spark-7" />
          <meta name="description" content="Discuss your interest globally" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/favicon/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/favicon/safari-mask-icon.svg"
            color="#000000"
          />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://spark-7.web.app" />
          <meta name="twitter:title" content="Spark-7" />
          <meta
            name="twitter:description"
            content="Discuss your interest globally"
          />
          <meta
            name="twitter:image"
            content="/favicon/android-chrome-192x192.png"
          />
          <meta name="twitter:creator" content="@DanielHwang" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Spark-7" />
          <meta property="og:description" content="Discuss your interest globally" />
          <meta property="og:site_name" content="Spark-7" />
          <meta property="og:url" content="https://spark-7.web.app" />
          <meta
            property="og:image"
            content="/favicon/apple-touch-icon.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const styledComponentSheet = new StyledComponentSheets();
  const materialUiSheets = new MaterialUiServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          styledComponentSheet.collectStyles(
            materialUiSheets.collect(<App {...props} />)
          ),
      });

    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        <React.Fragment key="styles">
          {initialProps.styles}
          {materialUiSheets.getStyleElement()}
          {styledComponentSheet.getStyleElement()}
        </React.Fragment>,
      ],
    };
  } finally {
    styledComponentSheet.seal();
  }
};
