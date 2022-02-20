import React, { useState, useEffect } from "react";
import { RootStateOrAny, useSelector } from "react-redux";

import PlannerTaskCard from "./PlannerTaskCard";
import { PlannerTask, Task } from "../../models/task-models/Task";
import { applyTaskFilter } from "../../utilities/tasks-utils/filter-util";

interface Props {
	beginningPeriod: Date;
	onMutate: () => void;
	onShrink: (shrink: boolean) => void;
	taskList: Task[];
}

const TaskList: React.FC<Props> = (props) => {
	const { beginningPeriod, onMutate, taskList, onShrink } = props;
	const { searchWord, filterTarget, mainFilter, subFilter } = useSelector(
		(state: RootStateOrAny) => state.filter
	);

	const isFolded = useSelector((state: RootStateOrAny) => state.fold.isFolded);

	const [ filteredTaskList, setFilteredTaskList ] = useState<Task[]>(taskList);

	useEffect(
		() => {
			const searchedList = taskList.filter((task) =>
				task.name.toLowerCase().includes(searchWord.toLowerCase())
			);
			// console.log(
			// 	`filterTarget: ${filterTarget}, mainFilter: ${mainFilter}, subFilter: ${subFilter}`
			// );
			const newFiltered = applyTaskFilter(searchedList, filterTarget, mainFilter, subFilter);
			setFilteredTaskList(newFiltered);
		},
		[ searchWord, filterTarget, mainFilter, subFilter, taskList ]
	);

	useEffect(
		() => {
			onShrink(isFolded);
		},
		[ isFolded ]
	);

	return (
		<ul className="flex flex-col items-center gap-4 pl-10">
			{filteredTaskList.map((task) => (
				<PlannerTaskCard
					key={task.id}
					task={task as PlannerTask}
					beginningPeriod={beginningPeriod}
					onMutate={onMutate}
				/>
			))}
		</ul>
	);
};

export default TaskList;
