import { Fragment, useEffect, useState } from "react";
import type { NextPage } from 'next'
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "@auth0/nextjs-auth0";

import TaskSearch from "../../components/task-search/TaskSearch";
import { getSearchedTasks } from "../../lib/planners/search-api";
import { PlannerTask, Task } from "../../models/task-models/Task";

interface Props {
	searchedTasks: Task[];
	searchWord: string;
}

const SearchPage: NextPage<Props> = (props) => {
	const { searchedTasks, searchWord } = props;
	const [ plannerTasks, setPlannerTasks ] = useState<PlannerTask[]>([]);

	useEffect(
		() => {
			const newPlannerTasks = searchedTasks.map((task) => new PlannerTask(task));
			setPlannerTasks(newPlannerTasks);
		},
		[ searchedTasks ]
	);

    console.log(searchedTasks);

	return (
		<Fragment>
			<Head>
				<title>Searched Planner Tasks for {searchWord}</title>
				<meta name="description" content="User's search result for planner tasks" />
			</Head>
			<TaskSearch searchedTasks={plannerTasks} searchWord={searchWord} />
		</Fragment>
	);
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, res, query } = context;
	const session = getSession(req, res);
	if (!session || !session.user) {
		return {
			redirect: {
				destination: "/api/auth/login",
				permanent: false
			}
		};
	}

	const { q = '' } = query;
    let searchWord = Array.isArray(q) ? q.join('') : q;

	const searchedTasks: Task[] = await getSearchedTasks(searchWord, req.headers.cookie);

	return {
		props: {
			searchedTasks,
			searchWord
		}
	};
};
