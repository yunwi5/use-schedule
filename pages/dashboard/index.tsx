import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { getSession } from '@auth0/nextjs-auth0';

import useEventQuery from '../../hooks/useEventQuery';
import useTaskQuery from '../../hooks/useTaskQuery';
import { IEvent } from '../../models/Event';
import { Task } from '../../models/task-models/Task';

interface Props {
    tasks: Task[];
    events: IEvent[];
}

const DashboardPage: NextPage<Props> = (props) => {
    const { tasks: initialTasks, events: initialEvents } = props;

    const { allTasks } = useTaskQuery(initialTasks);
    const { events } = useEventQuery(initialEvents);

    return (
        <div>
            <Head>
                <title>UseSchedule | Dashboard</title>
                <meta
                    name="description"
                    content="Dashboard that summarizes user schedules with charts and tables"
                />
            </Head>
            <h1>Dashboard</h1>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;

    const userContext = getSession(req, res);
    const userId = userContext?.user.sub;
    if (!userId) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: {
            tasks: [],
            events: [],
        },
    };
};

export default DashboardPage;
