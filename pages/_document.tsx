import Document, { Html, Head, Main, NextScript } from 'next/document';
import { AppProperty } from '../constants/global-constants';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* MOBILE & PWA */}
                    <meta name="application-name" content={AppProperty.APP_NAME} />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-title" content={AppProperty.APP_NAME} />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="theme-color" content="#64748B" />

                    {/* FAVICON */}
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link rel="manifest" href="/manifest.json"></link>
                    <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
                    {/* FIREFOX FAVICON */}
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/icons/icon-192x192.png"
                    />
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
