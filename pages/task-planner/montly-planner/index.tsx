import type { NextPage } from 'next'
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useQuery, useQueryClient } from 'react-query';

import { getTasksFromPage } from '../../../utilities/mongodb-util/pages-util';
import { Collection } from "../../../utilities/mongodb-util/mongodb-constant";
import { Task } from '../../../models/task-models/Task';
import { convertToTasks } from '../../../utilities/tasks-utils/task-util';
import LoadingSpinner from "../../../components/ui/design-elements/LoadingSpinner";
import MontlyPlannerMain from "../../../components/planners/montly-planner/MontlyPlanner";

interface Props { 
	initialTasks: Task[]
}

const API_DOMIN = "/api/planners";
const collection = Collection.MONTLY_TASKS;

async function getTasks() {
	return fetch(`${API_DOMIN}?collection=${collection}`).then((res) => res.json());
}

const MontlyPlanner: NextPage<Props> = ({initialTasks}) => {
	// useSWR() to fetch the data.
	const queryClient = useQueryClient();
	const {data, isLoading, error} =  useQuery('tasks', getTasks, {initialData: {tasks: initialTasks}});

	const invalidateData = () => {
		queryClient.invalidateQueries('tasks');
	}

	if (error) console.error(error);

	let tasks = [];
	if (data) tasks = data.tasks;

	return (
		<div>
			<Head>
				<title>Montly Task Planner</title>
				<meta
					name="description"
					content="Montly task planner for users to manage and allocate their tasks"
				/>
			</Head>
			{!data && (
				<div className="flex justify-center items-center" style={{marginLeft: '50px', marginTop: '80px'}}>
					<LoadingSpinner />
				</div>
			)}
			{data && tasks && <MontlyPlannerMain montlyTasks={tasks} onMutate={invalidateData} />}
		</div>
	);
};

export default MontlyPlanner;

// Need this?
export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
	async getServerSideProps (context) {
		const {req, res} = context;
		const session = getSession(req, res);
		if (!session) return {
			redirect: { 
				destination: "/login",
				permanent: false
			}
		}
		
		const userId = session.user.sub;
		const data = await getTasksFromPage(Collection.WEEKLY_TASKS, userId);
		const userTasks = convertToTasks(data);

		return { props: {
			initialTasks: userTasks
		}};
	}
});