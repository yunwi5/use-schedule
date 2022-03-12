import React, { useCallback, useEffect, useMemo, useState } from "react";

import { PlannerTask } from "../../models/task-models/Task";
import PageNav from "../ui/PageNav";
import SearchTaskList from "./SearchTaskList";
import TaskSort from "./TaskSort";
import { SortingDirection, TaskSort as SortingStandard } from "../../models/sorting-models";
import { sortTasks } from "../../utilities/tasks-utils/task-sort-util";
import { shuffleList } from "../../utilities/gen-utils/list-util";
import classes from "./TaskSearch.module.scss";

interface Props {
	searchWord: string;
	searchedTasks: PlannerTask[];
}

const TaskSearch: React.FC<Props> = (props) => {
	const { searchWord, searchedTasks } = props;
	const [ currentTasks, setCurrentTasks ] = useState(searchedTasks);

	const [ page, setPage ] = useState(1);
	const [ pageTasks, setPageTasks ] = useState<PlannerTask[]>([]);

	const [ sortingStandard, setSortingStandard ] = useState<SortingStandard | null>(null);

	// onMutate function may be needed to update the task when the user edits it.
	// TaskCard component has TaskEdit componenet/functionality attached.

	const taskLength = useMemo(() => searchedTasks.length, [ searchedTasks ]);
	const itemsPerPage = 7;

	const pageNavHandler = useCallback((newPage: number) => {
		setPage(newPage);
	}, []);

	const sortingHandler = useCallback(
		(standard: SortingStandard, direction: SortingDirection) => {
			setSortingStandard(standard);
			if (!standard || !direction) return;

			const newSortedTasks = sortTasks([ ...searchedTasks ], standard, direction);
			setCurrentTasks(newSortedTasks as PlannerTask[]);
		},
		[ searchedTasks ]
	);

	const randomizeHandler = useCallback(
		() => {
			const shuffledList = shuffleList([ ...searchedTasks ]);
			setCurrentTasks(shuffledList);
		},
		[ searchedTasks ]
	);

	useEffect(
		() => {
			const pageIndex = page - 1;
			const startingIndex = pageIndex * itemsPerPage;
			const newPageTasks = currentTasks.slice(startingIndex, startingIndex + itemsPerPage);
			setPageTasks(newPageTasks);
		},
		[ page, currentTasks ]
	);

	useEffect(
		() => {
			setCurrentTasks(searchedTasks);
		},
		[ searchedTasks ]
	);

	console.log("sortedTasks:");
	console.table(currentTasks);

	return (
		<main className={`mx-auto mt-[130px] mb-[70px] ${classes.search}`}>
			<h2 className="text-4xl text-slate-600 mb-5">
				Tasks that match your search{" "}
				<span className="text-slate-400">&quot;{searchWord}&quot;</span>
			</h2>
			<div className="flex justify-between mt-11">
				<TaskSort onSort={sortingHandler} onRandomize={randomizeHandler} />
				{/* self-end h-[0px] max-w-xl text-right text-xl font-semibold text-slate-500 translate-y-[1.5rem] pr-2 */}
				<h5 className="self-end max-w-xl text-right text-xl font-semibold text-slate-500 pr-2">
					{taskLength} Tasks Found
				</h5>
			</div>
			<SearchTaskList tasks={pageTasks} sortingStandard={sortingStandard} />
			<PageNav
				onChangePage={pageNavHandler}
				itemsPerPage={itemsPerPage}
				numberOfItems={taskLength}
			/>
		</main>
	);
};

export default TaskSearch;
