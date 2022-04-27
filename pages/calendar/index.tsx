import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

import CalendarMain from "../../components/calendar/CalendarMain";
import {
    getEventsFromPage,
    getTasksFromAllCollection,
    getTodosFromPage,
} from "../../db/pages-util";
import { PlannerMode } from "../../models/planner-models/PlannerMode";
import { Task } from "../../models/task-models/Task";
import { Todo } from "../../models/todo-models/Todo";
import { Event } from "../../models/Event";
import { convertToTasks } from "../../utilities/tasks-utils/task-util";
import { convertToTodos } from "../../utilities/todos-utils/todo-util";
import { useAppDispatch } from "../../store/redux";
import { plannerActions } from "../../store/redux/planner-slice";
import { convertToAppObjectList } from "../../utilities/gen-utils/object-util";

interface Props {
    tasks: Task[];
    todos: Todo[];
    events: Event[];
}

const TASK_API_DOMAIN = "/api/planners";
const TODO_API_DOMAIN = "/api/todos";
const EVENT_API_DOMAIN = "/api/events";

function fetchAllTasks() {
    return fetch(`${TASK_API_DOMAIN}`).then((res) => res.json());
}
function fetchAllTodos() {
    return fetch(`${TODO_API_DOMAIN}`).then((res) => res.json());
}

async function fetchAllEvents() {
    return (await axios.get<{ message?: string; events: Event[] }>(EVENT_API_DOMAIN)).data;
}

const Calendar: NextPage<Props> = (props) => {
    const { tasks: initialTasks, todos: initialTodos, events: initialEvents } = props;

    const { data: taskData, isError: isTaskError } = useQuery(["tasks"], fetchAllTasks, {
        initialData: { tasks: initialTasks },
    });
    if (isTaskError) {
        console.log("Task error");
    }
    const tasks: Task[] = taskData ? taskData.tasks : initialTasks;

    const { data: todoData, isError: isTodoError } = useQuery("todos", fetchAllTodos, {
        initialData: { todos: initialTodos },
    });
    if (isTodoError) {
        console.log("Todo error");
    }
    const todos: Todo[] = todoData ? todoData.todos : initialTodos;

    const { data: eventData, isError: isEventError } = useQuery("events", fetchAllEvents, {
        initialData: { events: initialEvents },
    });
    if (isEventError) {
        console.log("Event error");
    }
    const events: Event[] = eventData ? eventData.events : [];

    const queryClient = useQueryClient();

    const invalidateTasks = () => queryClient.invalidateQueries("tasks");
    const invalidateTodos = () => queryClient.invalidateQueries("todos");
    const invalidateEvents = () => queryClient.invalidateQueries("events");

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

    return (
        <div>
            <Head>
                <title>User Calendar</title>
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

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        const { req, res } = context;
        const session = getSession(req, res);

        if (!session) {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                },
            };
        }

        // Get all tasks and todos of the user
        const userId: string = session.user.sub;
        if (!userId) {
            return {
                notFound: true,
                redirect: { destination: "/login", permanent: false },
            };
        }

        const todosPromise = getTodosFromPage(userId);
        const tasksPromise = getTasksFromAllCollection(userId);
        const eventsPromise = getEventsFromPage(userId);

        const [userTodoDocs, [wTaskDocs, mTaskDocs, yTaskDocs], eventDocs] = await Promise.all([
            todosPromise,
            tasksPromise,
            eventsPromise,
        ]);

        const userTodos = convertToTodos(userTodoDocs);
        const userEvents: Event[] = convertToAppObjectList(eventDocs);
        const wTasks = convertToTasks(wTaskDocs, PlannerMode.WEEKLY);
        const mTasks = convertToTasks(mTaskDocs, PlannerMode.MONTLY);
        const yTasks = convertToTasks(yTaskDocs, PlannerMode.YEARLY);

        return {
            props: {
                todos: userTodos,
                tasks: [...wTasks, ...mTasks, ...yTasks],
                events: userEvents,
            },
        };
    },
});

export default Calendar;
