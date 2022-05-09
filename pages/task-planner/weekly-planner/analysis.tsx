import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from '@auth0/nextjs-auth0';

import { getTasksFromPage, getTasksFromAllCollection } from '../../../db/pages-util';
import { TaskCollection } from '../../../db/mongodb-constant';
import { Task } from '../../../models/task-models/Task';
import LoadingSpinner from '../../../components/ui/design-elements/LoadingSpinner';
import { convertToTasks } from '../../../utilities/tasks-utils/task-util';
import { useQuery, useQueryClient } from 'react-query';
import { fetchAllTasks, fetchPeriodicTasks } from '../../../lib/planners/tasks-api';
import AnalysisMain from '../../../components/analysis/AnalysisMain';
import { useAppDispatch } from '../../../store/redux';
import { useEffect } from 'react';
import { plannerActions } from '../../../store/redux/planner-slice';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';

interface Props {
    initialAllTasks: Task[];
    initialWeeklyTasks: Task[];
}

//TODO: Need to handle navigation between weeks!
const WeeklyAnalysis: NextPage<Props> = (props) => {
    // Initial user tasks fetched from the server
    const { initialAllTasks, initialWeeklyTasks } = props;
    const dispatch = useAppDispatch();

    // const queryClient = useQueryClient();
    const {
        data: allTasksData,
        isLoading: allTasksLoading,
        error: allTasksError,
    } = useQuery('all-tasks', fetchAllTasks, { initialData: { tasks: initialAllTasks } });

    if (allTasksError) console.error('All tasks fetching error!', allTasksError);
    let allTasks: Task[] = allTasksData ? allTasksData.tasks : [];
    // console.log('allTasks:');
    // console.table(allTasks);

    const {
        data: weeklyTasksData,
        isLoading: weeklyTasksLoading,
        error: weeklyTasksError,
    } = useQuery(['weekly-tasks', TaskCollection.WEEKLY_TASKS], fetchPeriodicTasks, {
        initialData: { tasks: initialWeeklyTasks },
    });

    if (weeklyTasksError) console.error('Weeklt tasks error!', weeklyTasksError);

    const weeklyTasks: Task[] = weeklyTasksData ? weeklyTasksData.tasks : [];
    // console.log('weeklyTasks:');
    // console.table(weeklyTasks);

    useEffect(() => {
        dispatch(plannerActions.setPlannerMode(PlannerMode.WEEKLY));
    }, [dispatch]);

    return (
        <div>
            <Head>
                <title>Weekly Task Analysis</title>
                <meta
                    name="description"
                    content="Analyze user's weekly task data with data visualization methods specifically charts. Use line chart to represent user task trend, pie/doughnut chart to represent task data in a specific period"
                />
            </Head>
            {weeklyTasksLoading && (
                <div className="flex justify-center items-center mt-6">
                    <LoadingSpinner />
                </div>
            )}
            <AnalysisMain allTasks={allTasks} periodicTasks={weeklyTasks} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;
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
        },
    };
};

export default WeeklyAnalysis;
