import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useQuery, useQueryClient } from "react-query";

import CalendarMain from "../../components/calendar/CalendarMain";
import { getTasksFromAllCollection, getTodosFromPage } from "../../db/pages-util";
import { PlannerMode } from "../../models/planner-models/PlannerMode";
import { Task } from "../../models/task-models/Task";
import { Todo } from "../../models/todo-models/Todo";
import { convertToTasks } from "../../utilities/tasks-utils/task-util";
import { convertToTodos } from "../../utilities/todos-utils/todo-util";

interface Props {
    tasks: Task[];
    todos: Todo[];
}

const TASK_API_DOMAIN = "/api/planners";
const TODO_API_DOMAIN = "/api/todos";

function fetchAllTasks() {
    return fetch(`${TASK_API_DOMAIN}`).then((res) => res.json());
}
function fetchAllTodos() {
    return fetch(`${TODO_API_DOMAIN}`).then((res) => res.json());
}

const Calendar: NextPage<Props> = (props) => {
    const { tasks: initialTasks, todos: initialTodos } = props;

    const { data: taskData, isError: isTaskError } = useQuery(["tasks"], fetchAllTasks, {
        initialData: { tasks: initialTasks },
    });
    if (isTaskError) {
        console.log("Task error");
    }
    const tasks: Task[] = taskData ? taskData.tasks : initialTasks;

    const { data: todoData, isError: isTodoError } = useQuery(["todos"], fetchAllTodos, {
        initialData: { todos: initialTodos },
    });
    if (isTodoError) {
        console.log("Todo error");
    }
    const todos: Todo[] = todoData ? todoData.todos : initialTodos;

    const queryClient = useQueryClient();

    const invalidateTasks = () => queryClient.invalidateQueries("tasks");
    const invalidateTodos = () => queryClient.invalidateQueries("todos");

    return (
        <div>
            <Head>
                <title>Calendar Overview</title>
                <meta
                    name="description"
                    content="Calendar page for summarizing all user specific tasks and todos for a month"
                />
            </Head>
            <CalendarMain
                tasks={tasks}
                todos={todos}
                onInvalidateTasks={invalidateTasks}
                onInvalidateTodos={invalidateTodos}
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

        const userTodosPromise = getTodosFromPage(userId);
        const userTasksPromise = getTasksFromAllCollection(userId);

        const [userTodoDocs, [wTaskDocs, mTaskDocs, yTaskDocs]] = await Promise.all([
            userTodosPromise,
            userTasksPromise,
        ]);
        const userTodos = convertToTodos(userTodoDocs);
        const wTasks = convertToTasks(wTaskDocs, PlannerMode.WEEKLY);
        const mTasks = convertToTasks(mTaskDocs, PlannerMode.MONTLY);
        const yTasks = convertToTasks(yTaskDocs, PlannerMode.YEARLY);

        return {
            props: {
                todos: userTodos,
                tasks: [...wTasks, ...mTasks, ...yTasks],
            },
        };
    },
});

export default Calendar;
