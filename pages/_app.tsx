import type { AppProps } from 'next/app';
import Head from 'next/head';
import { UserProvider, useUser } from '@auth0/nextjs-auth0';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Fontawesome config to prevent initially huge unstyled icons on the page
// which could be caused due to static page generation
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

// React query client initialization, so that its child components can use it
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    const user = useUser().user?.name;

    return (
        <QueryClientProvider client={queryClient}>
            {/* Redux Toolkit Store */}
            <Provider store={store}>
                {/* Auth0 user provider */}
                <UserProvider>
                    <TemplatesProvider>
                        <TodoListProvider>
                            <NotificationContextProvider>
                                <Head>
                                    {/* TITLE */}
                                    <title>{AppProperty.APP_NAME}</title>
                                    {/* DESCRIPTION */}
                                    <meta
                                        name="description"
                                        content={`${AppProperty.APP_NAME} application to manage personal or business schedules. Use dashboard and data analysis to examine your schedule patterns. Use recurring schedules and template tables to minimize repetitive work.`}
                                    />
                                    {/* META VIEWPORT MOBILE FRIENDLY */}
                                    <meta
                                        name="viewport"
                                        content="width=device-width, initial-scale=1.0"
                                    />
                                    {/* KEYWORDS */}
                                    <meta
                                        name="keywords"
                                        content="SCHEDULE, EVENT, TASK, TODO, TODOLIST, ANALYTICS, DASHBOARD"
                                    />
                                    {/* Author */}
                                    <meta
                                        name="author"
                                        content={user || AppProperty.APP_AUTHOR}
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
