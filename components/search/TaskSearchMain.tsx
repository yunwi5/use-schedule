import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { PlannerTask } from '../../models/task-models/Task';
import {
    SortingDirection,
    TaskSort as SortingStandard,
    TaskSortList,
} from '../../models/sorting-models';
import { sortTasks } from '../../utilities/sort-utils/task-sort-util';
import { shuffleList } from '../../utilities/gen-utils/list-util';
import { adjustOverdueTasks } from '../../utilities/tasks-utils/task-util';
import SearchTaskList from './list/TaskSearchList';
import TaskSort from './ItemSorter';
import PageNav from '../ui/navigation/PageNav';
import classes from './SearchMain.module.scss';

interface Props {
    searchWord: string;
    searchedTasks: PlannerTask[];
    onInvalidate(): void;
}

const TaskSearch: React.FC<Props> = (props) => {
    const { searchWord, searchedTasks, onInvalidate } = props;
    const [currentTasks, setCurrentTasks] = useState(searchedTasks);

    const [page, setPage] = useState(1);
    const [pageTasks, setPageTasks] = useState<PlannerTask[]>([]);

    const [sortingStandard, setSortingStandard] = useState<SortingStandard | null>(null);

    // onMutate function may be needed to update the task when the user edits it.
    // TaskCard component has TaskEdit componenet/functionality attached.

    const taskLength = useMemo(() => searchedTasks.length, [searchedTasks]);
    const itemsPerPage = 7;

    const pageNavHandler = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    const sortingHandler = useCallback(
        (standard: string, direction: SortingDirection) => {
            const validStandard = standard as SortingStandard;
            setSortingStandard(validStandard);
            if (!standard || !direction) return;

            const newSortedTasks = sortTasks([...searchedTasks], validStandard, direction);
            setCurrentTasks(newSortedTasks as PlannerTask[]);
        },
        [searchedTasks],
    );

    const randomizeHandler = useCallback(() => {
        const shuffledList = shuffleList([...searchedTasks]);
        setCurrentTasks(shuffledList);
    }, [searchedTasks]);

    useEffect(() => {
        const pageIndex = page - 1;
        const startingIndex = pageIndex * itemsPerPage;
        const newPageTasks = currentTasks.slice(startingIndex, startingIndex + itemsPerPage);
        setPageTasks(newPageTasks);
    }, [page, currentTasks]);

    useEffect(() => {
        adjustOverdueTasks(searchedTasks);
        setCurrentTasks(searchedTasks);
    }, [searchedTasks]);

    return (
        <main className={`mx-auto py-[50px] ${classes.search}`}>
            <h2 className="text-4xl text-slate-600 mb-5">
                Tasks that match your search{' '}
                <span className="text-slate-400">&quot;{searchWord}&quot;</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-between gap-5 mt-9">
                <TaskSort
                    onSort={sortingHandler}
                    sortList={TaskSortList}
                    onRandomize={randomizeHandler}
                />
                <h5 className="self-start sm:self-center max-w-xl text-right text-xl font-semibold text-slate-500 pr-2">
                    {taskLength} Tasks Found
                </h5>
            </div>
            <SearchTaskList
                tasks={pageTasks}
                sortingStandard={sortingStandard}
                onInvalidate={onInvalidate}
            />
            <PageNav
                onChangePage={pageNavHandler}
                itemsPerPage={itemsPerPage}
                numberOfItems={taskLength}
            />
        </main>
    );
};

export default TaskSearch;
