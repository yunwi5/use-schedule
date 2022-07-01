import Document, { Html, Head, Main, NextScript } from 'next/document';

const APP_NAME = 'next-pwa';
const APP_DESCRIPTION = 'This is an example of using next-pwa plugin';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="application-name" content={APP_NAME} />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-title" content={APP_NAME} />
                    <meta name="description" content={APP_DESCRIPTION} />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="theme-color" content="#64748B" />

                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link rel="manifest" href="/manifest.json"></link>
                    <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
                </Head>
                <body>
                    <div id="modal" />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
