import React, { useState, useEffect, useMemo } from 'react';

import useDateTime, { ResetPeriod } from '../../hooks/useDateTime';
import { AnalysisMode } from '../../models/analyzer-models/helper-models';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { PlannerTask, Task } from '../../models/task-models/Task';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import { plannerActions } from '../../store/redux/planner-slice';
import { getCurrentWeekBeginning } from '../../utilities/date-utils/date-get';
import { getTaskType } from '../../utilities/tasks-utils/task-label';
import { processTasks } from '../../utilities/tasks-utils/task-util';
import PageHeading from '../ui/typography/PageHeading';
import AnalysisHeader from './navigation/AnalysisHeader';

interface Props {
    allTasks: Task[];
    periodicTasks: Task[]; // Either weekly, montly or yearly tasks specific
}

const AnalysisMain: React.FC<Props> = (props) => {
    const { allTasks, periodicTasks } = props;
    const [analysisMode, setAnalysisMode] = useState(AnalysisMode.ONLY_CURRENT_PLANNER);

    const processedAllTasks = useMemo(() => processTasks(allTasks), [allTasks]);
    const processedPeriodicTasks = useMemo(() => processTasks(periodicTasks), [periodicTasks]);
    const tasksToAnalyze: PlannerTask[] =
        analysisMode === AnalysisMode.ONLY_CURRENT_PLANNER
            ? processedPeriodicTasks
            : processedAllTasks;

    const dispatch = useAppDispatch();

    const weekBeginning = getCurrentWeekBeginning();
    dispatch(plannerActions.setBeginningPeriod(weekBeginning.toString()));
    const {
        currentTimeStamp: currentPeriod,
        addWeeks: addLocalWeeks,
        setCurrentTimeStamp,
    } = useDateTime(weekBeginning, ResetPeriod.WEEK);

    const plannerMode: PlannerMode | null = useAppSelector((state) => state.planner.plannerMode);

    const taskType: string = getTaskType(plannerMode || PlannerMode.WEEKLY);

    // If the week beginning changes, the planner also has to change to load new tasks according to
    // Changed week beginning.
    const weekNavigateHandler = (direction: number) => {
        if (direction !== 1 && direction !== -1) throw new Error('Direction parameter is wrong!');
        // Hook call
        addLocalWeeks(direction);
    };

    useEffect(() => {
        dispatch(plannerActions.setPlannerMode(PlannerMode.WEEKLY));
    }, [dispatch]);

    return (
        <main className="py-6 pl-1 md:pl-4 text-slate-600">
            <div className="flex flex-col gap-4">
                <PageHeading title={`${taskType} Analysis (${currentPeriod.getFullYear()})`} />
                <AnalysisHeader
                    currentPeriod={currentPeriod}
                    onNavigate={weekNavigateHandler}
                    currentMode={analysisMode}
                    onChangeMode={(newMode: AnalysisMode) => setAnalysisMode(newMode)}
                    onNavigateCurrent={() => setCurrentTimeStamp(weekBeginning)}
                />
            </div>
        </main>
    );
};

export default AnalysisMain;
