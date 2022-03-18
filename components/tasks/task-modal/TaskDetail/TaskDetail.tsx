import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-duotone-svg-icons";

import { PlannerTask } from "../../../../models/task-models/Task";
import { PlannerMode } from "../../../../models/planner-models/PlannerMode";
import { getTaskType } from "../../../../utilities/tasks-utils/task-label";
import { SubTask } from "../../../../models/task-models/SubTask";
import Modal from "../../../ui/modal/Modal";
import SubTaskList from "../../sub-tasks/SubTaskList";
import TaskDetailInfo from "./TaskDetailInfo";
import TaskDetailNav from "./TaskDetailNav";
import classes from "./TaskDetail.module.scss";

interface Props {
	onClose: () => void;
	onEdit: () => void;
	onDelete: () => void;
	task: PlannerTask;
}

const API_DOMAIN = `${process.env.API_DOMIN_RELATIVE}/planners/sub-tasks`;

async function fetchSubTasks (context: any) {
	const [ name, parentTaskId ] = context.queryKey;
	const url = `${API_DOMAIN}/${parentTaskId}`;
	const res = await fetch(url);
	return await res.json();
}

const TaskDetail: React.FC<Props> = (props) => {
	const { onClose, onEdit, task } = props;
	const [ showSubTasks, setShowSubTasks ] = useState(false);
	const { name, plannerType } = task;

	// testing QueryClient
	const queryClient = useQueryClient();
	const { isLoading, error, data } = useQuery([ "subTasks", task.id ], fetchSubTasks);

	const invalidateSubTasks = () => {
		queryClient.invalidateQueries([ "subTasks", task.id ]);
	};

	if (error) {
		let errMessage = error instanceof Error ? error.message : "Fetching has errors.";
		console.log(errMessage);
	}

	let subTasks: SubTask[] = [];
	if (!error && data) {
		subTasks = data.subTasks;
	}

	return (
		<Modal onClose={onClose} classes={`${classes.modal} text-semibold`}>
			<h2>{name}</h2>
			<FontAwesomeIcon icon={faXmark} className={classes.exit} onClick={onClose} />
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
			{!showSubTasks && <TaskDetailInfo onEdit={onEdit} onClose={onClose} task={task} />}
		</Modal>
	);
};

export default TaskDetail;
