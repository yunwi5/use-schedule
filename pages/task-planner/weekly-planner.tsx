import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetStaticProps, GetServerSideProps } from "next";
import Head from "next/head";

const WeeklyPlanner: NextPage = (props) => {
    const { user, isLoading } = useUser();

	return (
		<div>
			<Head>
				<title>Weekly Task Planner</title>
				<meta
					name="description"
					content="Weekly task planner for users to manage and allocate their tasks"
				/>
			</Head>
			<h1>WeeklyPlanner Page</h1>
		</div>
	);
};

export default WeeklyPlanner;

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();