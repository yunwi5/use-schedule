import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPenToSquare } from "@fortawesome/pro-duotone-svg-icons";

import { SubTask } from "../../../models/task-models/SubTask";
import { deleteSubTask, postSubtask } from "../../../lib/planners/subtasks-api";
import { SubTaskSort as SortingStandard, SortingDirection } from "../../../models/sorting-models";
import SubTaskCard from "./SubTaskCard";
import SubTaskForm from "./SubTaskForm";
import SubTaskSorter from "./SubTaskSorter";
import { sortSubTasks } from "../../../utilities/tasks-utils/subtask-sort";
import LoadingSpinner from "../../ui/design-elements/LoadingSpinner";

interface Props {
	subTasks: SubTask[];
	isLoading: boolean;
	parentTaskId: string;
	onInvalidate: () => void;
}

const SubTaskList: React.FC<Props> = (props) => {
	const { subTasks, parentTaskId, isLoading, onInvalidate } = props;

	const [ isEditMode, setIsEditMode ] = useState(false);
	const [ currentSubTasks, setCurrentSubTasks ] = useState(subTasks); // apply CRUD and sorting

	const addSubTaskHandler = async (name: string) => {
		const newSubTask: SubTask = {
			id: uuidv4(),
			name,
			isCompleted: false,
			isImportant: false,
			order: currentSubTasks.length + 1,
			parentTaskId
		};
		setCurrentSubTasks([ ...currentSubTasks, newSubTask ]);

		// Send http request to add subtask.
		await postSubtask(newSubTask, parentTaskId);
		onInvalidate();
	};

	const deleteSubTaskHandler = async (id: string) => {
		if (!id) {
			console.log("SubTask Id is not set. Therefore, cannot delete!");
			return;
		}
		setCurrentSubTasks(currentSubTasks.filter((sub) => sub.id !== id));

		// Send http delete request.
		await deleteSubTask(id);
		onInvalidate();
	};

	const sortingHandler = (sortingStand: SortingStandard, direction?: SortingDirection) => {
		const sortedSubTasks = sortSubTasks([ ...currentSubTasks ], sortingStand, direction);
		setCurrentSubTasks(sortedSubTasks);
	};

	useEffect(
		() => {
			setCurrentSubTasks(subTasks);
		},
		[ subTasks ]
	);

	return (
		<div className="mb-3">
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
				<SubTaskSorter onSort={sortingHandler} />
			</div>
			{isLoading && <LoadingSpinner />}
			{!isLoading && (
				<ul className="mb-9 max-h-[25rem] overflow-y-scroll">
					{currentSubTasks.map((subTask) => (
						<SubTaskCard
							key={subTask.id}
							subTask={subTask}
							isEditMode={isEditMode}
							onDelete={deleteSubTaskHandler}
							onInvalidate={onInvalidate}
						/>
					))}
				</ul>
			)}
			<SubTaskForm onAdd={addSubTaskHandler} />
		</div>
	);
};

export default SubTaskList;
