import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPenToSquare } from "@fortawesome/pro-duotone-svg-icons";

import { SubTask } from "../../../models/task-models/SubTask";
import SubTaskCard from "./SubTaskCard";
import SubTaskForm from "./SubTaskForm";
import { getSubTasks, postSubtask } from "../../../lib/planners/subtasks-api";

interface Props {
	subTasks: SubTask[];
	parentTaskId: string;
}

const SubTaskList: React.FC<Props> = (props) => {
	const { subTasks, parentTaskId } = props;

	const [ isEditMode, setIsEditMode ] = useState(false);
	const [ currentSubTasks, setCurrentSubTasks ] = useState(subTasks);

	const addSubTaskHandler = (name: string) => {
		console.log(`Add subtask ${name}`);
		const newSubTask: SubTask = {
			id: uuidv4(),
			name,
			isCompleted: false,
			isImportant: false,
			order: subTasks.length + 1,
			parentTaskId
		};
		// Returns new array without modifying existing array.
		setCurrentSubTasks(currentSubTasks.concat(newSubTask));

		// Send http request to add subtask.
		postSubtask(newSubTask, parentTaskId);
	};

	const editSubTaskHandler = (subTask: SubTask) => {
		subTask.parentTaskId = parentTaskId; // Just in case
		console.log("Updated Task:");
		// Send http request to update subtask.
	};

	const deleteSubTaskHandler = (id: string) => {
		console.log(`Delete id: ${id}`);
		const filtered = currentSubTasks.filter((sub) => sub.id !== id);
		setCurrentSubTasks(filtered);
		// Send http delete request.
	};

	useEffect(
		() => {
			setCurrentSubTasks(subTasks);
		},
		[ subTasks ]
	);

	// Not the best approach so far.
	// Fetching should be done in TaskDetail component, with ReactQuery library help.
	useEffect(
		() => {
			const getInitial = async () => {
				const { data } = await getSubTasks(parentTaskId);
				console.log(data);
				if (data && Array.isArray(data)) {
					data.sort((subA, subB) => subA.order - subB.order);
					setCurrentSubTasks(data);
				}
			};
			getInitial();
		},
		[ parentTaskId ]
	);

	return (
		<div className="mb-3">
			<div className="text-left md:max-w-[99%] lg:max-w-[95%] cursor-pointer text-slate-600 hover:text-blue-600">
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
			<ul className="mb-9">
				{currentSubTasks.map((subTask) => (
					<SubTaskCard
						key={subTask.id}
						subTask={subTask}
						isEditMode={isEditMode}
						onEdit={editSubTaskHandler}
						onDelete={deleteSubTaskHandler}
					/>
				))}
			</ul>
			<SubTaskForm onAdd={addSubTaskHandler} />
		</div>
	);
};

export default SubTaskList;
