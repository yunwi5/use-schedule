import { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { AbstractTask } from '../../../../models/task-models/AbstractTask';
import { PlannerMode } from '../../../../models/planner-models/PlannerMode';
import { SubTask } from '../../../../models/task-models/SubTask';
import { getTaskType } from '../../../../utilities/tasks-utils/task-label';
import SubTaskList from '../../sub-tasks/SubTaskList';
import TaskDetailInfo from './TaskDetailInfo';
import TaskDetailNav from './TaskDetailNav';
import classes from './TaskDetail.module.scss';
import {
    CalendarItemType,
    getItemIcon,
} from '../../../../models/calendar-models/CalendarItemType';
import ExitIcon from '../../../ui/icons/ExitIcon';
import WrapperModal from '../../../ui/modal/wrapper/WrapperModal';

interface Props {
    onClose: () => void;
    task: AbstractTask;
    // on Invalidate tasks items. This function prop is optional.
    onInvalidate?: () => void;
}

const API_DOMAIN = `/api/planners/sub-tasks`;

async function fetchSubTasks(context: any) {
    const [name, parentTaskId] = context.queryKey;
    const url = `${API_DOMAIN}/${parentTaskId}`;
    const res = await fetch(url);
    return await res.json();
}

const TaskDetail: React.FC<Props> = (props) => {
    const { onClose, task, onInvalidate } = props;
    const [showSubTasks, setShowSubTasks] = useState(false);

    const { name, plannerType } = task;

    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery(['subTasks', task.id], fetchSubTasks);

    const invalidateSubTasks = useCallback(() => {
        queryClient.invalidateQueries(['subTasks', task.id]);
    }, [queryClient, task]);

    if (error) {
        let errMessage = error instanceof Error ? error.message : 'Fetching has errors.';
        console.log(errMessage);
    }

    let subTasks: SubTask[] = !error && data ? data.subTasks : [];

    return (
        <WrapperModal onClose={onClose} className={`z-30 ${classes.modal}`}>
            <h2>
                {getItemIcon(CalendarItemType.TASK, '!mr-1 text-blue-500')} {name}
            </h2>
            <ExitIcon onClose={onClose} className={'!bg-white !px-2 !top-4 !right-2'} />
            <div className={'flex-1 flex flex-col gap-3 px-2 lg:px-3'}>
                <TaskDetailNav
                    taskType={getTaskType(plannerType || PlannerMode.WEEKLY)}
                    onShowSubTasks={(showSub) => setShowSubTasks(showSub)}
                    showSubTasks={showSubTasks}
                />
                {showSubTasks && (
                    <SubTaskList
                        onInvalidate={invalidateSubTasks}
                        subTasks={subTasks}
                        isLoading={isLoading}
                        parentTaskId={task.id}
                    />
                )}
                {!showSubTasks && (
                    <TaskDetailInfo
                        onClose={onClose}
                        task={task}
                        onInvalidate={onInvalidate}
                    />
                )}
            </div>
        </WrapperModal>
    );
};

export default TaskDetail;
