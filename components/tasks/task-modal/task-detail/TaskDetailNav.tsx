import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/pro-duotone-svg-icons";

import classes from "./TaskDetail.module.scss";

interface Props {
	onShowSubTasks: (showSub: boolean) => void;
	showSubTasks: boolean;
	taskType: string;
}

const TaskDetailNav: React.FC<Props> = (props) => {
	const { onShowSubTasks, taskType, showSubTasks } = props;

	return (
		<div className={classes.navbar}>
			<h5>
				<FontAwesomeIcon icon={faCalendarDay} className={classes.icon} />
				{taskType}
			</h5>
			<div className={classes.navigation}>
				<button
					onClick={onShowSubTasks.bind(null, false)}
					className={`${classes.navbtn} ${!showSubTasks ? classes["navbtn-active"] : ""}`}
				>
					Information
				</button>
				<button
					onClick={onShowSubTasks.bind(null, true)}
					className={`${classes.navbtn} ${showSubTasks ? classes["navbtn-active"] : ""}`}
				>
					Subtasks
				</button>
			</div>
		</div>
	);
};

export default TaskDetailNav;
