import type { AppProps } from 'next/app'
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Layout from "../components/layout/Layout";
import "../styles/globals.scss";
import { NotificationContextProvider } from "../store/context/notification-context";
import store from "../store/redux/index";
import TemplatesProvider from "../components/templates/templates-provider/TemplatesProvider";

// React query client initialization, so that its child components can use ReactQuery fetching.
const queryClient = new QueryClient();

function MyApp ({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<UserProvider>
					<TemplatesProvider>
						<NotificationContextProvider>
							<Head>
								<title>Task Manager Application</title>
								<meta
									name="description"
									content="Task Manager App for users to make and allocate personal or business tasks"
								/>
							</Head>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</NotificationContextProvider>
					</TemplatesProvider>
				</UserProvider>
			</Provider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default MyApp;
