import React, { useState } from 'react';
import {
    faAlarmClock,
    faAlarmExclamation,
    faHourglass,
    faListTree,
    faMemoPad,
    faStarExclamation,
} from '@fortawesome/pro-duotone-svg-icons';

import ExitIcon from '../../ui/icons/ExitIcon';
import RecurringItemDeleteModal from '../../ui/modal/modal-variation/RecurringItemDeleteModal';
import WrapperModal from '../../ui/modal/wrapper/WrapperModal';
import OperationList from '../../ui/OperationList';
import { RecurringItemInterval, RecurringDateInfo } from './item-parts';
import { TaskHeading, TaskSection } from '../../tasks/task-modal/task-detail/task-parts';
import { RecurringTask } from '../../../models/recurring-models/RecurringTask';
import RecurringTaskEdit from '../crud-operations/RecurringTaskEdit';
import RecurringTaskDuplicate from '../crud-operations/RecurringTaskDuplicate';
import {
    getDurationFormat,
    getFullDateFormat,
} from '../../../utilities/date-utils/date-format';
import useRecurringTaskQuery from '../../../hooks/recurring-item-hooks/useRecurringTaskQuery';

interface Props {
    onClose(): void;
    onInvalidate(): void;
    recTask: RecurringTask;
}

const RecurringTaskDetail: React.FC<Props> = (props) => {
    const { onClose, onInvalidate, recTask } = props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { deleteRecTask } = useRecurringTaskQuery({
        onInvalidate: () => {
            onInvalidate();
            onClose();
        },
    });

    const duplicateModalHandler = (show: boolean) => () => setShowDuplicateModal(show);

    const editActionHandler = () => {
        setShowEditModal(false);
        onInvalidate();
    };

    const editModalHandler = (show: boolean) => () => setShowEditModal(show);

    const duplicateActionHandler = () => {
        setShowDuplicateModal(false);
        onInvalidate();
    };

    const deleteModalHandler = (show: boolean) => () => setShowDeleteModal(show);

    const deleteActionHandler = (deleteGenerated: boolean) => {
        deleteRecTask(recTask.id, deleteGenerated, recTask.plannerType);
    };

    return (
        <>
            <WrapperModal onClose={onClose}>
                <article className="min-h-[27rem] relative flex flex-col gap-3 justify-between text-slate-600">
                    <TaskHeading task={recTask} />
                    <ExitIcon onClose={onClose} className={'!-translate-y-[2px]'} />
                    <div className="hide-scrollbar overflow-y-scroll overflow-x-hidden flex-1 flex flex-col gap-3 lg:px-3 text-lg">
                        <RecurringItemInterval recItem={recTask} />
                        <div
                            className={`grid grid-cols-2 grid-rows-3 justify-between gap-4 gap-x-2 sm:gap-x-4`}
                        >
                            <TaskSection
                                label={'Start Date'}
                                value={getFullDateFormat(recTask.startDate)}
                                icon={faAlarmClock}
                            />
                            <TaskSection
                                label={' End Date'}
                                value={getFullDateFormat(recTask.endDate)}
                                icon={faAlarmExclamation}
                            />
                            <TaskSection
                                label="Duration"
                                value={getDurationFormat(recTask.duration)}
                                icon={faHourglass}
                            />
                            <TaskSection
                                label="Importance"
                                value={recTask.importance}
                                icon={faStarExclamation}
                            />
                            <TaskSection
                                label={'Category'}
                                value={recTask.category}
                                icon={faListTree}
                            />
                            <TaskSection
                                label={'Sub Category'}
                                value={recTask.subCategory}
                                icon={faListTree}
                            />
                        </div>
                        <TaskSection
                            label={'Description'}
                            value={recTask.description}
                            icon={faMemoPad}
                        />
                        <RecurringDateInfo item={recTask} />
                    </div>
                    <div className="mt-3 lg:px-3">
                        <OperationList
                            onEdit={editModalHandler(true)}
                            onDelete={deleteModalHandler(true)}
                            hoverColorClass={'hover:text-blue-500/90'}
                            onDuplicate={duplicateModalHandler(true)}
                        />
                    </div>
                </article>
            </WrapperModal>
            {showEditModal && (
                <RecurringTaskEdit
                    onClose={editModalHandler(false)}
                    onEdit={editActionHandler}
                    initialRecTask={recTask}
                />
            )}
            {showDuplicateModal && (
                <RecurringTaskDuplicate
                    onClose={duplicateModalHandler(false)}
                    initialTask={recTask}
                    onDuplicate={duplicateActionHandler}
                />
            )}
            {showDeleteModal && (
                <RecurringItemDeleteModal
                    targetName={recTask.name}
                    onAction={deleteActionHandler}
                    onClose={deleteModalHandler(false)}
                />
            )}
        </>
    );
};

export default RecurringTaskDetail;
