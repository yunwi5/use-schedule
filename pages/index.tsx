import type { NextPage } from 'next'
import Head from "next/head";

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Task Manager Home Page</title>
				<meta name="description" content="Home page of Task Manager app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
      		<h1 className="">Home Page</h1>
		</div>
	);
};

export default Home;
