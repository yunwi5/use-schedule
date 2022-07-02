import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

import { IEvent } from '../../models/Event';
import { Task } from '../../models/task-models/Task';
import { convertToTasks, processTasks } from '../../utilities/tasks-utils/task-util';
import { convertToAppObjectList } from '../../utilities/gen-utils/object-util';
import { getEventsFromPage, getTasksFromAllCollection } from '../../db/pages-util';
import DashboardMain from '../../components/dashboard/DashboardMain';
import { DashboardContextProvider } from '../../store/context/dashboard-context';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import { processEvents } from '../../utilities/event-utils/event-util';

interface Props {
    initialTasks: Task[];
    initialEvents: IEvent[];
}

const DashboardPage: NextPage<Props> = (props) => {
    const { initialTasks, initialEvents } = props;

    const tasks: AbstractTask[] = processTasks(initialTasks);
    const events: IEvent[] = processEvents(initialEvents);

    return (
        <div>
            <Head>
                <title>User Dashboard | UseSchedule</title>
                <meta
                    name="description"
                    content="Dashboard that summarizes user schedules with charts and tables"
                />
            </Head>
            <DashboardContextProvider events={events} tasks={tasks}>
                <DashboardMain />
            </DashboardContextProvider>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        const { req, res } = context;
        const session = getSession(req, res);
        const userId = session?.user.sub;

        const allTasksPromise = getTasksFromAllCollection(userId);
        const eventsPromise = getEventsFromPage(userId);

        // Need to convert to App style object (i.e. id instead of _id)
        const [[wTaskDocs, mTaskDocs, yTaskDocs], eventsData] = await Promise.all([
            allTasksPromise,
            eventsPromise,
        ]);
        const allTasks = [...wTaskDocs, ...mTaskDocs, ...yTaskDocs];

        return {
            props: {
                initialAllTasks: convertToTasks(allTasks),
                initialEvents: convertToAppObjectList(eventsData),
            },
        };
    },
});

export default DashboardPage;
