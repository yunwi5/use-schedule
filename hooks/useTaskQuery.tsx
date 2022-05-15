import { useQuery, useQueryClient } from 'react-query';
import { fetchAllTasks } from '../lib/planners/tasks-api';
import { Task } from '../models/task-models/Task';

const useTaskQuery = (initialAllTasks?: Task[]) => {
    const queryClient = useQueryClient();

    const { data: allTasksData, error: allTasksError } = useQuery('all-tasks', fetchAllTasks, {
        initialData: initialAllTasks ? { tasks: initialAllTasks } : undefined,
    });

    if (allTasksError) console.error('All tasks fetching error!', allTasksError);
    let allTasks: Task[] = allTasksData ? allTasksData.tasks : [];

    const invalidateAllTasks = () => queryClient.invalidateQueries('all-tasks');

    return {
        allTasks,
        invalidateAllTasks,
    };
};

export default useTaskQuery;
