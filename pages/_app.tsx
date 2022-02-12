import type { AppProps } from 'next/app'
import { UserProvider } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Header from "../components/layout/Header";
import SideNav from "../components/layout/SideNav";
import "../styles/globals.scss";
import { useState } from 'react';

function MyApp ({ Component, pageProps }: AppProps) {
	const [showSidebar, setShowSidebar] = useState(true);

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
				<Header onToggleSidebar={() => setShowSidebar(prev => !prev)} />
				<SideNav onToggleSidebar={() => setShowSidebar(prev => !prev)} showSidebar={showSidebar} />
				<Component {...pageProps} />
			</div>
		</UserProvider>
	);
}

export default MyApp;
