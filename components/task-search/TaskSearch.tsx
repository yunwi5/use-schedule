import React, { useCallback, useMemo, useState } from "react";

import { PlannerTask } from "../../models/task-models/Task";
import PageNav from "../ui/PageNav";
import SearchTaskList from "./SearchTaskList";
import classes from "./TaskSearch.module.scss";

interface Props {
	searchWord: string;
	searchedTasks: PlannerTask[];
}

const TaskSearch: React.FC<Props> = (props) => {
	const { searchWord, searchedTasks } = props;
	// Page navigation required.
	const [ pageTasks, setPageTasks ] = useState<PlannerTask[]>([]);

	// onMutate function may be needed to update the task when the user edits it.
	// TaskCard component has TaskEdit componenet/functionality attached.

	const taskLength = useMemo(() => searchedTasks.length, [ searchedTasks ]);
	const itemsPerPage = 7;

	const pageNavHandler = useCallback(
		(newPage: number) => {
			const pageIndex = newPage - 1;
			const startingIndex = pageIndex * itemsPerPage;
			const newPageTasks = searchedTasks.slice(startingIndex, startingIndex + itemsPerPage);
			setPageTasks(newPageTasks);
		},
		[ searchedTasks ]
	);

	console.log("pageTasks:");
	console.table(pageTasks);

	return (
		<main className={`mx-auto mt-[130px] mb-[70px] ${classes.search}`}>
			<h2 className="text-4xl text-slate-600 mb-5">
				Tasks that match your search{" "}
				<span className="text-slate-400">&quot;{searchWord}&quot;</span>
			</h2>
			<div className="flex justify-between">
				<div />
				<h5 className="self-end h-[0px] max-w-xl text-right text-xl font-semibold text-slate-500 translate-y-[1.5rem] pr-2">
					{taskLength} Tasks Found
				</h5>
			</div>
			<SearchTaskList tasks={pageTasks} />
			<PageNav
				onChangePage={pageNavHandler}
				itemsPerPage={itemsPerPage}
				numberOfItems={taskLength}
			/>
		</main>
	);
};

export default TaskSearch;
