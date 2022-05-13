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
import {
    getCurrentMonthBeginning,
    getMonthBeginning,
} from '../../../utilities/date-utils/date-get';
import MontlyAnalysis from '../../../components/analysis/analysis-main/MontlyAnalysis';

interface Props {
    initialAllTasks: Task[];
    initialMontlyTasks: Task[];
    initialStartDate: string;
}

const WeeklyAnalysisPage: NextPage<Props> = (props) => {
    // Initial user tasks fetched from the server
    const { initialAllTasks, initialMontlyTasks, initialStartDate } = props;

    // make sure it is always beginning of month, not just random day
    const beginningDate = initialStartDate.trim()
        ? getMonthBeginning(new Date(initialStartDate))
        : getCurrentMonthBeginning();

    const { data: allTasksData, error: allTasksError } = useQuery('all-tasks', fetchAllTasks, {
        initialData: { tasks: initialAllTasks },
    });

    if (allTasksError) console.error('All tasks fetching error!', allTasksError);
    let allTasks: Task[] = allTasksData ? allTasksData.tasks : [];

    const { data: monthlyTasksData, error: montlyTasksError } = useQuery(
        ['monthly-tasks', TaskCollection.MONTLY_TASKS],
        fetchPeriodicTasks,
        {
            initialData: { tasks: initialMontlyTasks },
        },
    );
    if (montlyTasksError) console.error('Montly tasks error!', montlyTasksError);
    const montlyTasks: Task[] = monthlyTasksData ? monthlyTasksData.tasks : [];

    return (
        <div>
            <Head>
                <title>Montly Task Analysis</title>
                <meta
                    name="description"
                    content="Analyze user's montly task data with data visualization methods specifically charts. Use line chart to represent user task trend, pie/doughnut chart to represent task data in a specific period"
                />
            </Head>
            <MontlyAnalysis
                allTasks={allTasks}
                periodicTasks={montlyTasks}
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
        : start_date || getCurrentMonthBeginning().toDateString();
    const allTasksPromise = getTasksFromAllCollection(userId);
    const monthTasksPromise = getTasksFromPage(TaskCollection.MONTLY_TASKS, userId);

    // Need to convert to App style object (i.e. id instead of _id)
    const [allTasksData, monthTasksData] = await Promise.all([allTasksPromise, monthTasksPromise]);

    return {
        props: {
            initialAllTasks: convertToTasks(allTasksData),
            initialMontlyTasks: convertToTasks(monthTasksData),
            initialStartDate: startDate,
        },
    };
};

export default WeeklyAnalysisPage;
