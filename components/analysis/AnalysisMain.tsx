import React, { useState, useEffect, useMemo } from 'react';

import useDateTime, { ResetPeriod } from '../../hooks/useDateTime';
import { AbstractAnalyzer } from '../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisMode } from '../../models/analyzer-models/helper-models';
import { WeeklyAnalyzer } from '../../models/analyzer-models/WeeklyAnalyzer';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import { PlannerTask, Task } from '../../models/task-models/Task';
import { useAppDispatch } from '../../store/redux';
import { plannerActions } from '../../store/redux/planner-slice';
import { getCurrentWeekBeginning } from '../../utilities/date-utils/date-get';
import { processTasks } from '../../utilities/tasks-utils/task-util';
import LoadingSpinner from '../ui/design-elements/LoadingSpinner';
import CategoricalDataAnalysis from './categorical-analysis/CategoricalDataAnalysis';
import AnalysisHeader from './navigation/AnalysisHeader';
import PeriodicAnalysis from './periodic-analysis/PeriodicAnalysis';
import TrendAnalysis from './trend-analysis/TrendAnalysis';

interface Props {
    allTasks: Task[];
    periodicTasks: Task[]; // Either weekly, montly or yearly tasks specific
    beginningDate: Date;
}

function populateAnalyzer(analyzer: AbstractAnalyzer, tasks: AbstractTask[]) {
    for (const task of tasks) {
        analyzer.addTask(task);
    }
    return analyzer;
}

const AnalysisMain: React.FC<Props> = (props) => {
    const { allTasks, periodicTasks, beginningDate } = props;
    const [analysisMode, setAnalysisMode] = useState(AnalysisMode.ONLY_CURRENT_PLANNER);
    const [analyzer, setAnalyzer] = useState<AbstractAnalyzer | null>(null);

    const processedAllTasks = useMemo(() => processTasks(allTasks), [allTasks]);
    const processedPeriodicTasks = useMemo(() => processTasks(periodicTasks), [periodicTasks]);
    const tasksToAnalyze: PlannerTask[] =
        analysisMode === AnalysisMode.ONLY_CURRENT_PLANNER
            ? processedPeriodicTasks
            : processedAllTasks;

    const dispatch = useAppDispatch();

    const currentWeekBeginning = getCurrentWeekBeginning(); // current timestemp -> DateTime now.
    const {
        currentTimeStamp: currentPeriod,
        addWeeks: addLocalWeeks,
        setCurrentTimeStamp,
    } = useDateTime(beginningDate, ResetPeriod.WEEK);

    // If the week beginning changes, the planner also has to change to load new tasks according to
    // Changed week beginning.
    const weekNavigateHandler = (direction: number) => {
        if (direction !== 1 && direction !== -1) throw new Error('Direction parameter is wrong!');
        // Hook call
        addLocalWeeks(direction);
    };

    useEffect(() => {
        const newAnalyzer = populateAnalyzer(new WeeklyAnalyzer(currentPeriod), tasksToAnalyze);
        setAnalyzer(newAnalyzer);
    }, [currentPeriod, tasksToAnalyze]);

    useEffect(() => {
        dispatch(plannerActions.setPlannerMode(PlannerMode.WEEKLY));
    }, [dispatch]);

    // console.log('beginningDate:', beginningDate);
    // console.log('currentPeriod:', currentPeriod);

    return (
        <main className="py-6 md:pl-4 text-slate-600">
            <div className="mt-3 flex pl-3 flex-col gap-4">
                <AnalysisHeader
                    currentPeriod={currentPeriod}
                    onNavigate={weekNavigateHandler}
                    currentMode={analysisMode}
                    onChangeMode={(newMode: AnalysisMode) => setAnalysisMode(newMode)}
                    onNavigateCurrent={() => setCurrentTimeStamp(currentWeekBeginning)}
                />
            </div>
            {!analyzer && <LoadingSpinner />}
            {analyzer && (
                <div className="mt-10 pl-6 flex flex-col gap-16">
                    <TrendAnalysis analyzer={analyzer} />
                    <PeriodicAnalysis analyzer={analyzer} />
                    <CategoricalDataAnalysis analyzer={analyzer} />
                </div>
            )}
        </main>
    );
};

export default AnalysisMain;
