import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

import { getTasksFromPage } from '../../../db/pages-util';
import { TaskCollection } from '../../../db/collections';
import { Task } from '../../../models/task-models/Task';
import LoadingSpinner from '../../../components/ui/design-elements/LoadingSpinner';
import { convertToTasks } from '../../../utilities/tasks-utils/task-util';
import { useQuery, useQueryClient } from 'react-query';
import YearlyPlannerMain from '../../../components/planners/yearly-planner/YearlyPlanner';
import { AppProperty } from '../../../constants/global-constants';

interface Props {
    initialTasks: Task[];
}

const API_DOMIN = '/api/planners';
const collection = TaskCollection.YEARLY_TASKS;

async function getTasks() {
    return fetch(`${API_DOMIN}?collection=${collection}`).then((res) => res.json());
}

const YearlyPlanner: NextPage<Props> = (props) => {
    const { initialTasks } = props;
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery('tasks', getTasks, {
        initialData: { tasks: initialTasks },
    });

    const invalidateData = () => {
        queryClient.invalidateQueries('tasks');
    };

    if (error) console.error(error);

    let tasks = [];
    if (data) tasks = data.tasks;

    return (
        <div>
            <Head>
                <title>Yearly Task Planner | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="Yearly task planner for users to manage and allocate their tasks"
                />
            </Head>
            {!data ||
                (isLoading && (
                    <div className="flex justify-center items-center mt-6">
                        <LoadingSpinner />
                    </div>
                ))}
            {data && tasks && (
                <YearlyPlannerMain yearlyTasks={tasks} onMutate={invalidateData} />
            )}
        </div>
    );
};

export default YearlyPlanner;

// Need this?
export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        const { req, res } = context;
        const session = getSession(req, res);
        if (!session)
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };

        const userId = session.user.sub;

        const data = await getTasksFromPage(TaskCollection.YEARLY_TASKS, userId);
        const userTasks = convertToTasks(data);

        return {
            props: {
                initialTasks: userTasks,
            },
        };
    },
});
