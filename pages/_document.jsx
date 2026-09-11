import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Global tags only — title & description belong in each page file */}
          <meta name="author" content="Dumisane Madondo" />
          <meta name="robots" content="index, follow" />
          <meta name="theme-color" content="#0f0f0f" />
          <link rel="icon" href="/logoicon2.png" type="image/png" />
          <link rel="shortcut icon" href="/logoicon2.png" type="image/png" />
          <link rel="apple-touch-icon" href="/logoicon2.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
