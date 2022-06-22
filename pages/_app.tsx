import type { AppProps } from 'next/app';
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

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
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <UserProvider>
                    <TemplatesProvider>
                        <TodoListProvider>
                            <NotificationContextProvider>
                                <Head>
                                    <title>{AppProperty.APP_NAME}</title>
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
