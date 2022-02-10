import { UserProvider } from "@auth0/nextjs-auth0";
import type { AppProps } from 'next/app'
import Head from "next/head";
import Header from "../components/layout/Header";
import SideNav from "../components/layout/SideNav";
import "../styles/globals.css";

function MyApp ({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<Head>
				<title>Task Manager Application</title>
				<meta
					name="description"
					content="Task Manager App for users to make and allocate personal or business tasks"
				/>
			</Head>
			<div className="app">
				<Header />
				<SideNav />
				<Component {...pageProps} />
			</div>
		</UserProvider>
	);
}

export default MyApp;
