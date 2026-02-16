import Document, { Html, Head, Main, NextScript } from 'next/document';
import fallback from '../src/assets/intro.png';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Dumisane Madondo | Software Developer Portfolio</title>
          <meta
            name="description"
            content="Dumisane Madondo's portfolio showcasing full-stack development projects, skills, and experiences."
          />
          {/* preload hero image to improve LCP discovery */}
          <link rel="preload" as="image" href={fallback.src} />
          <link rel="icon" href="/logoicon2.svg" type="image/svg+xml" />
          <link rel="shortcut icon" href="/logoicon2.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/logoicon2.svg" />
          <meta name="theme-color" content="#0f1724" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
