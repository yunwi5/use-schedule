import React, { useState } from "react";
import PlannerTaskAdd from "../planner-modal/PlannerTaskAdd";
import Searchbar from "../../ui/Searchbar";
import Button from "../../ui/Button";
import { Theme, Size } from "../../../models/design-models";
import classes from "./PlannerHeader.module.scss";
import PlannerFilter from "../planner-support/PlannerFilter";
import GroupSelect from "../planner-support/GroupSelect";
import { Task } from "../../../models/task-models/Task";

const PlannerHeader: React.FC = () => {
	const [ isAdding, setIsAdding ] = useState(false);

	const taskAddHandler = (newTask: Task) => {
		console.log("new task:", newTask);
	};

	return (
		<nav className={`${classes.header} flex items-center justify-between p-4 w-full`}>
			{/* Task Add Modal */}
			{isAdding && (
				<PlannerTaskAdd onClose={() => setIsAdding(false)} onAddTask={taskAddHandler} />
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
