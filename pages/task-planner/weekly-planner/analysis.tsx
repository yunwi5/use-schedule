import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from '@auth0/nextjs-auth0';
import { useQuery } from 'react-query';

import { getTasksFromPage, getTasksFromAllCollection } from '../../../db/pages-util';
import { TaskCollection } from '../../../db/mongodb-constant';
import { Task } from '../../../models/task-models/Task';
import { convertToTasks } from '../../../utilities/tasks-utils/task-util';
import { fetchAllTasks, fetchPeriodicTasks } from '../../../lib/planners/tasks-api';
import { getCurrentWeekBeginning, getWeekBeginning } from '../../../utilities/date-utils/date-get';
import WeeklyAnalysis from '../../../components/analysis/analysis-main/WeeklyAnalysis';

interface Props {
    initialAllTasks: Task[];
    initialWeeklyTasks: Task[];
    initialStartDate: string;
}

const WeeklyAnalysisPage: NextPage<Props> = (props) => {
    // Initial user tasks fetched from the server
    const { initialAllTasks, initialWeeklyTasks, initialStartDate } = props;

    // make sure it is always beginning of week, not just random day
    const beginningDate = initialStartDate.trim()
        ? getWeekBeginning(new Date(initialStartDate))
        : getCurrentWeekBeginning();

    const { data: allTasksData, error: allTasksError } = useQuery('all-tasks', fetchAllTasks, {
        initialData: { tasks: initialAllTasks },
    });

    if (allTasksError) console.error('All tasks fetching error!', allTasksError);
    let allTasks: Task[] = allTasksData ? allTasksData.tasks : [];

    const { data: weeklyTasksData, error: weeklyTasksError } = useQuery(
        ['weekly-tasks', TaskCollection.WEEKLY_TASKS],
        fetchPeriodicTasks,
        {
            initialData: { tasks: initialWeeklyTasks },
        },
    );
    if (weeklyTasksError) console.error('Weeklt tasks error!', weeklyTasksError);
    const weeklyTasks: Task[] = weeklyTasksData ? weeklyTasksData.tasks : [];

    return (
        <div>
            <Head>
                <title>Weekly Task Analysis</title>
                <meta
                    name="description"
                    content="Analyze user's weekly task data with data visualization methods specifically charts. Use line chart to represent user task trend, pie/doughnut chart to represent task data in a specific period"
                />
            </Head>
            <WeeklyAnalysis
                allTasks={allTasks}
                periodicTasks={weeklyTasks}
                beginningDate={beginningDate}
            />
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
    const weeklyTasksPromise = getTasksFromPage(TaskCollection.WEEKLY_TASKS, userId);

    // Need to convert to App style object (i.e. id instead of _id)
    const [allTasksData, weeklyTasksData] = await Promise.all([
        allTasksPromise,
        weeklyTasksPromise,
    ]);

    return {
        props: {
            initialAllTasks: convertToTasks(allTasksData),
            initialWeeklyTasks: convertToTasks(weeklyTasksData),
            initialStartDate: startDate,
        },
    };
};

export default WeeklyAnalysisPage;