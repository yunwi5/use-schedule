import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from "next";
import Head from "next/head";
import WeeklyPlannerMain from "../../../components/planners/weekly-planner/WeeklyPlanner";
import { Task } from '../../../models/task-models/Task';

interface Props { 
    userId: string;
    weeklyTasks: Array<Task> | null;
}

const WeeklyPlanner: NextPage<Props> = (props) => {
    const { userId, weeklyTasks} = props;
    const { user, isLoading } = useUser();

    console.log('weekly tasks:', weeklyTasks);
    console.log(userId);

	return (
		<div>
			<Head>
				<title>Weekly Task Planner</title>
				<meta
					name="description"
					content="Weekly task planner for users to manage and allocate their tasks"
				/>
			</Head>
            {!weeklyTasks && <p className="text-2xl text-center mt-5">...Loading</p>}
			{weeklyTasks && <WeeklyPlannerMain weeklyTasks={weeklyTasks} />}
		</div>
	);
};

export default WeeklyPlanner;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;
    const session = getSession(req, res);
    if (!session || (session && !session.user)) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    const userId = session.user.sub;

     const response = await fetch("http://localhost:3000/api/planners/weekly-planners", {
      headers: {
        cookie: req.headers.cookie || "",
      },
    });
    const data = await response.json();
    const weeklyTasks = data.tasks;

    return {
        props: {
            userId: userId,
            weeklyTasks: weeklyTasks || []
        }
    }
}