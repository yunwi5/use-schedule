import type { NextPage } from 'next'
import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	const {user, isLoading} = useUser();
	console.log("user:", user);

	return (
		<div className={styles.container}>
			<Head>
				<title>Task Manager Home Page</title>
				<meta name="description" content="Home page of Task Manager app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
      <h1>Home Page</h1>
		</div>
	);
};

export default Home;
