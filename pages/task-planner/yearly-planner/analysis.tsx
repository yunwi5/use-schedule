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
import { getCurrentYearBeginning, getYearBeginning } from '../../../utilities/date-utils/date-get';
import YearlyAnalysis from '../../../components/analysis/analysis-main/YearlyAnalysis';

interface Props {
    initialAllTasks: Task[];
    initialYearlyTasks: Task[];
    initialStartDate: string;
}

const WeeklyAnalysisPage: NextPage<Props> = (props) => {
    // Initial user tasks fetched from the server
    const { initialAllTasks, initialYearlyTasks, initialStartDate } = props;

    // make sure it is always beginning of week, not just random day
    const beginningDate = initialStartDate.trim()
        ? getYearBeginning(new Date(initialStartDate))
        : getCurrentYearBeginning();

    const { data: allTasksData, error: allTasksError } = useQuery('all-tasks', fetchAllTasks, {
        initialData: { tasks: initialAllTasks },
    });

    if (allTasksError) console.error('All tasks fetching error!', allTasksError);
    let allTasks: Task[] = allTasksData ? allTasksData.tasks : [];

    const { data: yearlyTasksData, error: weeklyTasksError } = useQuery(
        ['yearly-tasks', TaskCollection.YEARLY_TASKS],
        fetchPeriodicTasks,
        {
            initialData: { tasks: initialYearlyTasks },
        },
    );
    if (weeklyTasksError) console.error('Weeklt tasks error!', weeklyTasksError);
    const weeklyTasks: Task[] = yearlyTasksData ? yearlyTasksData.tasks : [];

    return (
        <div>
            <Head>
                <title>Yearly Task Analysis</title>
                <meta
                    name="description"
                    content="Analyze user's yearly task data with data visualization methods specifically charts. Use line chart to represent user task trend, pie/doughnut chart to represent task data in a specific period"
                />
            </Head>
            <YearlyAnalysis
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
        : start_date || getCurrentYearBeginning().toDateString();
    const allTasksPromise = getTasksFromAllCollection(userId);
    const yearlyTasksPromise = getTasksFromPage(TaskCollection.YEARLY_TASKS, userId);

    const [allTasksData, yearlyTasksData] = await Promise.all([
        allTasksPromise,
        yearlyTasksPromise,
    ]);

    return {
        props: {
            initialAllTasks: convertToTasks(allTasksData),
            initialYearlyTasks: convertToTasks(yearlyTasksData),
            initialStartDate: startDate,
        },
    };
};

export default WeeklyAnalysisPage;
