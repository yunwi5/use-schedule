import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from '@auth0/nextjs-auth0';
import { useQuery } from 'react-query';

import {
    getTasksFromPage,
    getTasksFromAllCollection,
    getEventsFromPage,
} from '../../../db/pages-util';
import { TaskCollection } from '../../../db/mongodb-constant';
import { Task } from '../../../models/task-models/Task';
import { convertToTasks } from '../../../utilities/tasks-utils/task-util';
import { fetchAllTasks } from '../../../lib/planners/tasks-api';
import { convertToAppObjectList } from '../../../utilities/gen-utils/object-util';
import {
    getCurrentMonthBeginning,
    getMonthBeginning,
} from '../../../utilities/date-utils/date-get';
import MontlyAnalysis from '../../../components/analysis/analysis-main/MontlyAnalysis';
import { fetchAllEvents } from '../../../lib/events/event-apis';
import { IEvent } from '../../../models/Event';

interface Props {
    initialAllTasks: Task[];
    initialMontlyTasks: Task[];
    initialEvents: IEvent[];
    initialStartDate: string;
}

const WeeklyAnalysisPage: NextPage<Props> = (props) => {
    const { initialAllTasks, initialMontlyTasks, initialEvents, initialStartDate } = props;

    // make sure it is always beginning of month, not just random day
    const beginningDate = initialStartDate.trim()
        ? getMonthBeginning(new Date(initialStartDate))
        : getCurrentMonthBeginning();

    const { data: allTasksData, error: allTasksError } = useQuery('all-tasks', fetchAllTasks, {
        initialData: { tasks: initialAllTasks },
    });

    if (allTasksError) console.error('All tasks fetching error!', allTasksError);
    let allTasks: Task[] = allTasksData ? allTasksData.tasks : [];

    const { data: eventData, isError: isEventError } = useQuery('events', fetchAllEvents, {
        initialData: { events: initialEvents },
    });
    if (isEventError) {
        console.log('Event error');
    }
    const events: IEvent[] = eventData ? eventData.events : [];

    return (
        <div>
            <Head>
                <title>Montly Data Analysis</title>
                <meta
                    name="description"
                    content="Analyze user's montly task data with data visualization methods specifically charts. Use line chart to represent user task trend, pie/doughnut chart to represent task data in a specific period"
                />
            </Head>
            <MontlyAnalysis tasks={allTasks} events={events} beginningDate={beginningDate} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res, query } = context;
    const session = getSession(req, res);
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    const userId = session.user.sub;

    const { start_date } = query;
    const startDate: string = Array.isArray(start_date)
        ? start_date.join(' ')
        : start_date || getCurrentMonthBeginning().toDateString();
    const allTasksPromise = getTasksFromAllCollection(userId);
    const monthTasksPromise = getTasksFromPage(TaskCollection.MONTLY_TASKS, userId);
    const eventsPromise = getEventsFromPage(userId);

    // Need to convert to App style object (i.e. id instead of _id)
    const [allTasksData, monthTasksData, eventsData] = await Promise.all([
        allTasksPromise,
        monthTasksPromise,
        eventsPromise,
    ]);

    return {
        props: {
            initialAllTasks: convertToTasks(allTasksData),
            initialMontlyTasks: convertToTasks(monthTasksData),
            initialEvents: convertToAppObjectList(eventsData),
            initialStartDate: startDate,
        },
    };
};

export default WeeklyAnalysisPage;
