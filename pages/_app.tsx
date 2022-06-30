import type { AppProps } from 'next/app';
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Fontawesome config to prevent initially huge icons on the page
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import Layout from '../components/layout/Layout';
import { NotificationContextProvider } from '../store/context/notification-context';
import store from '../store/redux/index';
import TemplatesProvider from '../components/templates/templates-provider/TemplatesProvider';
import TodoListProvider from '../components/todos/todo-provider/TodoListProvider';
import { AppProperty } from '../constants/global-constants';
import '../styles/globals.scss';

// React query client initialization, so that its child components can use ReactQuery
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    console.log('ENV APP_NAME', process.env.APP_NAME);

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                {/* Auth0 user provider */}
                <UserProvider>
                    <TemplatesProvider>
                        <TodoListProvider>
                            <NotificationContextProvider>
                                <Head>
                                    <title>{AppProperty.APP_NAME}</title>
                                    {/* Favicon links */}
                                    {/* Firefox favicon */}
                                    <link
                                        rel="icon"
                                        type="image/png"
                                        sizes="32x32"
                                        href="/logos/logo.png"
                                    />
                                    {/* Chrome and Edge favicon */}
                                    <link rel="shortcut icon" href="/favicon.ico" />

                                    {/* PWA links */}
                                    <link rel="manifest" href="/manifest.json"></link>
                                    <link
                                        rel="apple-touch-icon"
                                        href="/icons/apple-touch-icon.png"
                                    ></link>
                                    <meta name="theme-color" content="#64748B" />
                                    <meta
                                        name="description"
                                        content={`${AppProperty.APP_NAME} application for users to allocate and manage personal or business schedules`}
                                    />
                                </Head>
                                <Layout>
                                    <Component {...pageProps} />
                                </Layout>
                            </NotificationContextProvider>
                        </TodoListProvider>
                    </TemplatesProvider>
                </UserProvider>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default MyApp;
