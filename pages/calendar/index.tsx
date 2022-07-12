import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import CalendarMain from '../../components/calendar/CalendarMain';
import { useAppDispatch } from '../../store/redux';
import { plannerActions } from '../../store/redux/planner-slice';
import useEventQuery from '../../hooks/useEventQuery';
import useTaskQuery from '../../hooks/useTaskQuery';
import useTodoQuery from '../../hooks/useTodoQuery';
import { AppProperty } from '../../constants/global-constants';
import { useRouter } from 'next/router';
import { getLoginLink } from '../../utilities/link-utils';

interface Props {
    // tasks: Task[];
    // todos: Todo[];
    // events: IEvent[];
}

const Calendar: NextPage<Props> = (props) => {
    // const { tasks: initialTasks, todos: initialTodos, events: initialEvents } = props;
    const user = useUser().user;
    const router = useRouter();

    const { allTasks: tasks, invalidateAllTasks: invalidateTasks } = useTaskQuery();
    const { events, invalidateEvents } = useEventQuery();
    const { todos, invalidateTodos } = useTodoQuery(null, null);

    const invalidateAll = () => {
        invalidateTasks();
        invalidateTodos();
        invalidateEvents();
    };

    // Need to be cleaned up.
    const dispatch = useAppDispatch(); // dispatching plannerMode
    useEffect(() => {
        dispatch(plannerActions.setPlannerMode(null));
    }, [dispatch]);

    useEffect(() => {
        let timer = setTimeout(() => {
            // console.log('user:', user);
            if (!user) {
                router.replace(getLoginLink());
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [user, router]);

    return (
        <div>
            <Head>
                <title>Calendar | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="Calendar page for summarizing all user specific tasks and todos for a month"
                />
            </Head>
            <CalendarMain
                tasks={tasks}
                todos={todos}
                events={events}
                onInvalidateAll={invalidateAll}
            />
        </div>
    );
};

// use getStaticPaths and getStaticProps
// for data fetching.
// Retrieve user ids from User table.

// export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
//     async getServerSideProps(context) {
//         // const { req, res } = context;
//         // const session = getSession(req, res);

//         // if (!session) {
//         //     return {
//         //         redirect: {
//         //             destination: '/login',
//         //             permanent: false,
//         //         },
//         //     };
//         // }

//         // // Get all tasks and todos of the user
//         // const userId: string = session.user.sub;
//         // if (!userId) {
//         //     return {
//         //         notFound: true,
//         //         redirect: { destination: '/login', permanent: false },
//         //     };
//         // }

//         // const todosPromise = getTodosFromPage(userId);
//         // const tasksPromise = getTasksFromAllCollection(userId);
//         // const eventsPromise = getEventsFromPage(userId);

//         // const [userTodoDocs, [wTaskDocs, mTaskDocs, yTaskDocs], eventDocs] = await Promise.all(
//         //     [todosPromise, tasksPromise, eventsPromise],
//         // );

//         // const taskDocs = [...wTaskDocs, ...mTaskDocs, ...yTaskDocs];
//         // // make sure the converted objects are json-serializable
//         // // meaning there should be no Date object which is not json-serializable
//         // const tasks = convertToAppObjectList(taskDocs, true);
//         // const todos = convertToAppObjectList(userTodoDocs, true);
//         // const events: IEvent[] = convertToAppObjectList(eventDocs, true);

//         return {
//             props: {
//                 // todos,
//                 // tasks,
//                 // events,
//             },
//         };
//     },
// });

export default Calendar;
