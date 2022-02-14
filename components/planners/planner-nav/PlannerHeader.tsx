import React, { useState } from "react";

import PlannerTaskAdd from "../planner-modal/PlannerTaskAdd";
import Searchbar from "../../ui/Searchbar";
import Button from "../../ui/Button";
import { Theme, Size } from "../../../models/design-models";
import classes from "./PlannerHeader.module.scss";
import PlannerFilter from "../planner-support/PlannerFilter";
import GroupSelect from "../planner-support/GroupSelect";
import { PlannerTask, Task } from "../../../models/task-models/Task";

interface Props {
	beginningPeriod: Date;
	onAddTask: (newTask: PlannerTask) => void;
}

const PlannerHeader: React.FC<Props> = (props) => {
	const { beginningPeriod, onAddTask } = props;
	const [ isAdding, setIsAdding ] = useState(false);

	return (
		<nav className={`${classes.header} flex items-center justify-between p-4 w-full`}>
			{/* Task Add Modal */}
			{isAdding && (
				<PlannerTaskAdd
					onClose={() => setIsAdding(false)}
					onAddTask={onAddTask}
					beginningPeriod={beginningPeriod}
				/>
			)}

			<GroupSelect />
			<PlannerFilter />
			<Searchbar
				className="mr-6"
				placeholder="Search Task"
				onSearch={(text: string) => console.log(text)}
			/>
			<Button
				theme={Theme.PRIMARY}
				size={Size.MEDIUM}
				onClick={() => setIsAdding((prev) => !prev)}
			>
				+ Add Task
			</Button>
		</nav>
	);
};

export default PlannerHeader;
