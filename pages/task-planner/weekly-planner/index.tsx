import type { NextPage } from 'next'
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "@auth0/nextjs-auth0";
import useSWR from "swr";

import WeeklyPlannerMain from "../../../components/planners/weekly-planner/WeeklyPlanner";
import LoadingSpinner from "../../../components/ui/design-elements/LoadingSpinner";
import { Collection } from "../../../utilities/mongodb-util/mongodb-constant";

const API_DOMIN = "/api/planners";
const collection = Collection.WEEKLY_TASKS;

const WeeklyPlanner: NextPage = () => {
	// useSWR() to fetch the data.
	const { data, error, mutate } = useSWR(`${API_DOMIN}?collection=${collection}`, (url) =>
		fetch(url).then((res) => res.json())
	);
	if (error) console.error(error);

	let tasks = [];
	if (data) tasks = data.tasks;

	return (
		<div>
			<Head>
				<title>Weekly Task Planner</title>
				<meta
					name="description"
					content="Weekly task planner for users to manage and allocate their tasks"
				/>
			</Head>
			{!data && (
				<div className="flex justify-center items-center" style={{marginLeft: '50px', marginTop: '80px'}}>
					<LoadingSpinner />
				</div>
			)}
			{data && tasks && <WeeklyPlannerMain weeklyTasks={tasks} onMutate={mutate} />}
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

	//  const response = await fetch("http://localhost:3000/api/planners/weekly-planners", {
	//   headers: {
	//     cookie: req.headers.cookie || "",
	//   },
	// });
	// const data = await response.json();

	return {
		props: {
			message: "Hi client!"
		}
	};
};
