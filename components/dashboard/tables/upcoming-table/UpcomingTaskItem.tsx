import React, { useCallback, useState } from 'react';
import { CalendarItemType } from '../../../../models/calendar-models/CalendarItemType';
import { AbstractTask } from '../../../../models/task-models/AbstractTask';
import TaskDetail from '../../../tasks/task-modal/task-detail/TaskDetail';
import UpcomingItemCard from '../../cards/UpcomingItemCard';
import { useDashboardContext } from '../../../../store/context/dashboard-context';
import TaskEdit from '../../../planners/planner-crud/TaskEdit';

interface Props {
    task: AbstractTask;
}

const UpcomingTaskItem: React.FC<Props> = ({ task }) => {
    const { onInvalidate } = useDashboardContext();
    const [showDetail, setShowDetail] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const editHandler = useCallback(() => {
        setShowEditForm(true);
        setShowDetail(false);
    }, []);
    const updateHandler = (updateTask?: AbstractTask) => {
        onInvalidate();
    };

    return (
        <>
            <UpcomingItemCard
                item={task}
                itemType={CalendarItemType.TASK}
                onShowDetail={setShowDetail.bind(null, true)}
            />
            {showDetail && (
                <TaskDetail
                    task={task}
                    onClose={setShowDetail.bind(null, false)}
                    onEdit={editHandler}
                    onInvalidate={onInvalidate}
                />
            )}
            {showEditForm && (
                <TaskEdit
                    initialTask={task}
                    onClose={setShowEditForm.bind(null, false)}
                    beginningPeriod={task.dateTime}
                    onUpdate={updateHandler}
                />
            )}
        </>
    );
};

export default UpcomingTaskItem;
