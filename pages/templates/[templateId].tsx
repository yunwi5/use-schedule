import type {NextPage} from 'next'
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

const TemplatePage: NextPage = () => {
	return (
		<div>
			<Head>
				<title>New Template</title>
				<meta
					name="description"
					content="New custom template to add users' repetitive tasks in one place."
				/>
			</Head>
			<div />
		</div>
	);
};

export default TemplatePage;

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
	async getServerSideProps (context) {
		return { props: null };
	}
});
