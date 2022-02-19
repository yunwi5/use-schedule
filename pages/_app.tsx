import type { AppProps } from 'next/app'
import { UserProvider } from "@auth0/nextjs-auth0";
import { Provider } from "react-redux";
import Head from "next/head";

import Layout from "../components/layout/Layout";
import "../styles/globals.scss";
import { NotificationContextProvider } from "../store/context/notification-context";
import store from "../store/redux/index";

function MyApp ({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<NotificationContextProvider>
				<UserProvider>
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
				</UserProvider>
			</NotificationContextProvider>
		</Provider>
	);
}

export default MyApp;
