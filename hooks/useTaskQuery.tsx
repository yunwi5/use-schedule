import { useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { fetchAllTasks } from '../lib/planners/tasks-api';
import { PlannerTask, Task } from '../models/task-models/Task';
import { processTasks } from '../utilities/tasks-utils/task-util';

type FilterCallback = (event: { name: string }) => boolean;

const useTaskQuery = (initialAllTasks?: Task[], filterCallback?: FilterCallback) => {
    const queryClient = useQueryClient();

    const { data: allTasksData, error: allTasksError } = useQuery('all-tasks', fetchAllTasks, {
        initialData: initialAllTasks ? { tasks: initialAllTasks } : undefined,
    });

    if (allTasksError) console.error('All tasks fetching error!', allTasksError);
    let allTasks: Task[] = useMemo(() => (allTasksData ? allTasksData.tasks : []), [allTasksData]);

    const invalidateAllTasks = () => queryClient.invalidateQueries('all-tasks');

    const processedTasks: PlannerTask[] = useMemo(() => {
        const processed = processTasks(allTasks);
        const filtered = filterCallback ? processed.filter(filterCallback) : processed;
        return filtered;
    }, [allTasks, filterCallback]);

    return {
        allTasks: processedTasks,
        invalidateAllTasks,
    };
};

export default useTaskQuery;
