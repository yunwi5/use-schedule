import React, { useCallback, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import TaskForm from './task-form/TaskForm';
import PlannerModal from '../planner-modal/PlannerModal';
import useTemplate from '../../../hooks/useTemplate';
import { FormTaskObject, PlannerTask, Task } from '../../../models/task-models/Task';
import { replaceTask } from '../../../lib/planners/tasks-api';
import { NotifStatus } from '../../ui/Notification';
import useNotification from '../../../hooks/useNotification';
import DeleteModal from '../../ui/modal/modal-variation/DeleteModal';
import DiscardModal from '../../ui/modal/modal-variation/DiscardModal';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import { TemplateTask } from '../../../models/template-models/TemplateTask';
import { AbstractTask } from '../../../models/task-models/AbstractTask';
import useTaskDelete from '../../../hooks/task-hooks/useTaskDelete';

interface Props {
    onClose: () => void;
    onUpdate: (updateTask?: PlannerTask) => void;
    beginningPeriod?: Date;
    initialTask: AbstractTask;
}

const TaskEdit: React.FC<Props> = (props) => {
    const { onClose, onUpdate, beginningPeriod, initialTask } = props;
    const { user } = useUser();
    const userId = user ? user.sub : null;

    const { setNotification } = useNotification();
    const { deleteTask } = useTaskDelete({ task: initialTask, onDelete: onUpdate });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDiscardModal, setShowDiscardModal] = useState(false);

    const { currentTemplate } = useTemplate();

    const taskEditHandler = async (newFormTask: FormTaskObject) => {
        if (!userId) {
            alert('User is not logged in!');
            return;
        }
        const newTask: Task = {
            ...newFormTask,
            id: initialTask.id,
            comment: initialTask.comment,
            status: initialTask.status,
            plannerType: initialTask.plannerType,
            userId,
        };

        let updatedTask: AbstractTask;
        if (currentTemplate) {
            updatedTask = new TemplateTask(newTask, currentTemplate.id);
        } else {
            updatedTask = new PlannerTask(newTask);
        }

        setNotification(NotifStatus.PENDING, `Currently editing task ${updatedTask.name}`);
        const { isSuccess } = await replaceTask(
            initialTask.id,
            updatedTask,
            initialTask.plannerType || PlannerMode.WEEKLY,
        );
        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS, `Editing task was successful!`);
        } else {
            setNotification(NotifStatus.ERROR, 'Sorry, editing task went wrong...');
        }
        onUpdate(updatedTask);
        onClose();
    };

    return (
        <PlannerModal onClose={onClose} title={'Edit Task'}>
            {showDeleteModal && (
                <DeleteModal
                    targetName={initialTask.name}
                    onAction={deleteTask}
                    onClose={setShowDeleteModal.bind(null, false)}
                />
            )}
            {showDiscardModal && (
                <DiscardModal
                    onAction={onClose}
                    onClose={setShowDiscardModal.bind(null, false)}
                />
            )}
            <TaskForm
                onSubmit={taskEditHandler}
                beginningPeriod={beginningPeriod ?? initialTask.dateTime}
                isEdit={true}
                initialTask={initialTask}
                onDelete={setShowDeleteModal.bind(null, true)}
            />
        </PlannerModal>
    );
};

export default TaskEdit;
