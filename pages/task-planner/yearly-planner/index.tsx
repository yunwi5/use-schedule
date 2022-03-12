import type { NextPage } from 'next'
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import useSWR from "swr";

import YearlyPlanner from "../../../components/planners/yearly-planner/YearlyPlanner";
import { Collection } from "../../../utilities/mongodb-util/mongodb-constant";

const API_DOMIN = "/api/planners";
const collection = Collection.YEARLY_TASKS;

const WeeklyPlanner: NextPage = () => {
	// useSWR() to fetch the data.
	const { data, error, mutate } = useSWR(`${API_DOMIN}?collection=${collection}`, (url) =>
		fetch(url).then((res) => res.json())
	);
	if (error) console.error(error);

	let tasks = [];
	if (data) tasks = data.tasks;
	// console.log("swr tasks:", tasks);

	return (
		<div>
			<Head>
				<title>Yearly Task Planner</title>
				<meta
					name="description"
					content="Yearly task planner for users to manage and allocate their tasks"
				/>
			</Head>
			{!tasks && <p className="text-2xl text-center mt-5">...Loading</p>}
			{tasks && <YearlyPlanner yearlyTasks={tasks} onMutate={mutate} />}
		</div>
	);
};

export default WeeklyPlanner;

// Need this?
export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, res } = context;
	const session = getSession(req, res);
	if (!session || (session && !session.user)) {
		return {
			redirect: {
				destination: "/",
				permanent: false
			}
		};
	}
	return {
		props: {
			message: "Hi Client!"
		}
	};
};