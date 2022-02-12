import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from "next";
import Head from "next/head";
import WeeklyPlannerMain from "../../../components/planners/weekly-planner/WeeklyPlanner";

interface Props { 
    userId: string;
    weeklyTasks: Array<any> | null;
}

const WeeklyPlanner: NextPage<Props> = (props) => {
    const { userId, weeklyTasks} = props;
    const { user, isLoading } = useUser();

    console.log(`user id: ${userId},  weekly tasks: ${weeklyTasks}`);

	return (
		<div>
			<Head>
				<title>Weekly Task Planner</title>
				<meta
					name="description"
					content="Weekly task planner for users to manage and allocate their tasks"
				/>
			</Head>
			<WeeklyPlannerMain />
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
    console.log(`user id: ${userId}`);

    const userWeeklyTasks = null;

    return {
        props: {
            userId: userId,
            weeklyTasks: userWeeklyTasks
        }
    }
}