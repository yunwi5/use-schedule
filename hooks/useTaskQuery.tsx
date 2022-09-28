import { useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { StaticKeys } from '../constants/query-keys';
import { fetchAllTasks } from '../lib/planners/tasks-api';
import { callRecurringItemUpdate } from '../lib/recurring';
import { PlannerTask, Task } from '../models/task-models/Task';
import { processTasks } from '../utilities/tasks-utils/task-util';

const useTaskQuery = (initialAllTasks?: Task[]) => {
    const queryClient = useQueryClient();

    const {
        data: allTasksData,
        error: allTasksError,
        isLoading,
    } = useQuery(StaticKeys.TASK_QUERY_KEY, fetchAllTasks, {
        initialData: initialAllTasks ? { tasks: initialAllTasks } : undefined,
        refetchInterval: 1000,
    });

    if (allTasksError) console.error('All tasks fetching error!', allTasksError);
    let allTasks: Task[] = useMemo(
        () => (allTasksData ? allTasksData.tasks : []),
        [allTasksData],
    );

    const invalidateAllTasks = () => queryClient.invalidateQueries(StaticKeys.TASK_QUERY_KEY);

    const processedTasks: PlannerTask[] = useMemo(() => {
        return processTasks(allTasks);
    }, [allTasks]);

    useEffect(() => {
        callRecurringItemUpdate();
    }, []);

    return {
        allTasks: processedTasks,
        invalidateAllTasks,
        isLoading,
    };
};

export default useTaskQuery;
