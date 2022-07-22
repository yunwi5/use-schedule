import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPenToSquare } from '@fortawesome/pro-duotone-svg-icons';

import { SubTask } from '../../../models/task-models/SubTask';
import {
    deleteSubTask,
    patchSubTaskProps,
    postSubtask,
} from '../../../lib/planners/subtasks-api';
import {
    SubItemSort as SortingStandard,
    SortingDirection,
} from '../../../models/sorting-models';
import { sortSubItems } from '../../../utilities/sort-utils/sub-item-sort';
import { SubItemForm, SubItemCard, SubItemSorter } from '../../sub-items';
import LoadingSpinner from '../../ui/design-elements/LoadingSpinner';
import { SubTaskProperties } from '../../../models/task-models/TaskProperties';

interface Props {
    subTasks: SubTask[];
    isLoading: boolean;
    parentTaskId: string;
    onInvalidate: () => void;
}

const SubTaskList: React.FC<Props> = (props) => {
    const { subTasks, parentTaskId, isLoading, onInvalidate } = props;

    const [isEditMode, setIsEditMode] = useState(false);
    const [currentSubTasks, setCurrentSubTasks] = useState(subTasks); // apply CRUD and sorting

    const addSubTaskHandler = async (name: string) => {
        const newSubTask: SubTask = {
            id: uuidv4(),
            name,
            isCompleted: false,
            isImportant: false,
            order: currentSubTasks.length + 1,
            parentTaskId,
        };
        setCurrentSubTasks([...currentSubTasks, newSubTask]);

        // Send http request to add subtask.
        await postSubtask(newSubTask, parentTaskId);
        onInvalidate();
    };

    const deleteSubTaskHandler = async (id: string) => {
        if (!id) return console.log('SubTask Id is not set. Therefore, cannot delete!');
        setCurrentSubTasks(currentSubTasks.filter((sub) => sub.id !== id));

        // Send http delete request.
        await deleteSubTask(id);
        onInvalidate();
    };

    const sortingHandler = useCallback(
        (sortingStand: SortingStandard, direction?: SortingDirection) => {
            const sortedSubTasks = sortSubItems([...currentSubTasks], sortingStand, direction);
            setCurrentSubTasks(sortedSubTasks as SubTask[]);
        },
        [currentSubTasks],
    );

    // Send patch request to modify subtask on the server
    const patchSubTaskHandler = useCallback(
        async (subTaskId: string, subTaskProps: SubTaskProperties) => {
            const { isSuccess } = await patchSubTaskProps(subTaskId, subTaskProps);
            if (isSuccess) onInvalidate();
        },
        [onInvalidate],
    );

    useEffect(() => {
        if (subTasks.length === currentSubTasks.length) {
            setCurrentSubTasks(subTasks);
        }
    }, [currentSubTasks, subTasks]);

    return (
        <div className="mb-3 flex-1 flex flex-col">
            <div className="mb-2 w-[100%] flex items-center justify-between">
                <div className="text-left cursor-pointer text-slate-600 hover:text-blue-600">
                    {isEditMode ? (
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                            onClick={() => setIsEditMode(false)}
                            className="max-w-[2.5rem] text-3xl text-green-400 hover:text-green-500"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="max-w-[2.5rem] text-3xl"
                            onClick={() => setIsEditMode(true)}
                        />
                    )}
                </div>
                {/* Sorting Select */}
                <SubItemSorter onSort={sortingHandler} />
            </div>
            {isLoading && <LoadingSpinner />}
            {!isLoading && (
                <ul className="mb-9 max-h-[25rem] overflow-y-scroll">
                    {currentSubTasks.map((subTask) => (
                        <SubItemCard
                            key={subTask.id}
                            subItem={subTask}
                            isEditMode={isEditMode}
                            onDelete={deleteSubTaskHandler}
                            onPatchNewProps={patchSubTaskHandler}
                            onInvalidate={onInvalidate}
                        />
                    ))}
                </ul>
            )}
            <SubItemForm onAdd={addSubTaskHandler} />
        </div>
    );
};

export default SubTaskList;
