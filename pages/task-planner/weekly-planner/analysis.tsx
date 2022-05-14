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
import { fetchAllTasks, fetchPeriodicTasks } from '../../../lib/planners/tasks-api';
import { getCurrentWeekBeginning, getWeekBeginning } from '../../../utilities/date-utils/date-get';
import WeeklyAnalysis from '../../../components/analysis/analysis-main/WeeklyAnalysis';
import { fetchAllEvents } from '../../../lib/events/event-apis';
import { IEvent } from '../../../models/Event';
import { convertToAppObjectList } from '../../../utilities/gen-utils/object-util';

interface Props {
    initialAllTasks: Task[];
    initialEvents: IEvent[];
    initialStartDate: string;
}

const WeeklyAnalysisPage: NextPage<Props> = (props) => {
    // Initial user tasks fetched from the server
    const { initialAllTasks, initialEvents, initialStartDate } = props;

    // make sure it is always beginning of week, not just random day
    const beginningDate = initialStartDate.trim()
        ? getWeekBeginning(new Date(initialStartDate))
        : getCurrentWeekBeginning();

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
                <title>Weekly Data Analysis</title>
                <meta
                    name="description"
                    content="Analyze user's weekly task and event data with data visualization methods specifically charts. Use line chart to represent user task trend, pie/doughnut chart to represent task data in a specific period"
                />
            </Head>
            <WeeklyAnalysis tasks={allTasks} events={events} beginningDate={beginningDate} />
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
        : start_date || getCurrentWeekBeginning().toDateString();
    const allTasksPromise = getTasksFromAllCollection(userId);
    const eventsPromise = getEventsFromPage(userId);

    // Need to convert to App style object (i.e. id instead of _id)
    const [allTasksData, eventsData] = await Promise.all([allTasksPromise, eventsPromise]);

    return {
        props: {
            initialAllTasks: convertToTasks(allTasksData),
            initialEvents: convertToAppObjectList(eventsData),
            initialStartDate: startDate,
        },
    };
};

export default WeeklyAnalysisPage;
