import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-duotone-svg-icons";

import { PlannerTask } from "../../../models/task-models/Task";
import Modal from "../../ui/modal/Modal";
import { PlannerMode } from "../../../models/planner-models/PlannerMode";
import { getTaskType } from "../../../utilities/tasks-utils/task-label";
import SubTaskList from "../sub-tasks/SubTaskList";
import TaskDetailInfo from "./TaskDetailInfo";
import classes from "./TaskDetail.module.scss";
import TaskDetailNav from "./TaskDetailNav";

interface Props {
	onClose: () => void;
	onEdit: () => void;
	onDelete: () => void;
	task: PlannerTask;
}

const TaskDetail: React.FC<Props> = (props) => {
	const { onClose, onEdit, task } = props;
	const [ showSubTasks, setShowSubTasks ] = useState(false);
	const { name, plannerType } = task;

	const taskType = getTaskType(plannerType || PlannerMode.WEEKLY);

	return (
		<Modal onClose={onClose} classes={`${classes.modal} text-semibold`}>
			<h2>{name}</h2>
			<FontAwesomeIcon icon={faXmark} className={classes.exit} onClick={onClose} />
			<TaskDetailNav
				taskType={taskType}
				onShowSubTasks={(showSub) => setShowSubTasks(showSub)}
				showSubTasks={showSubTasks}
			/>
			{showSubTasks && <SubTaskList subTasks={task.subTasks || []} parentTaskId={task.id} />}
			{!showSubTasks && <TaskDetailInfo onEdit={onEdit} onClose={onClose} task={task} />}
		</Modal>
	);
};

export default TaskDetail;
