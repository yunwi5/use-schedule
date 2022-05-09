import React, { useState, useEffect, useMemo } from 'react';

import useDateTime, { ResetPeriod } from '../../hooks/useDateTime';
import { AbstractAnalyzer } from '../../models/analyzer-models/AbstractAnalyzer';
import {
    AnalysisMode,
    AnalysisOption,
    TrendOption,
} from '../../models/analyzer-models/helper-models';
import { WeeklyAnalyzer } from '../../models/analyzer-models/WeeklyAnalyzer';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { AbstractTask } from '../../models/task-models/AbstractTask';
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

function populateAnalyzer(analyzer: AbstractAnalyzer, tasks: AbstractTask[]) {
    for (const task of tasks) {
        analyzer.addTask(task);
    }
    return analyzer;
}

const AnalysisMain: React.FC<Props> = (props) => {
    const { allTasks, periodicTasks } = props;
    const [analysisMode, setAnalysisMode] = useState(AnalysisMode.ONLY_CURRENT_PLANNER);
    const [analyzer, setAnalyzer] = useState<AbstractAnalyzer | null>(null);

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
        const newAnalyzer = populateAnalyzer(new WeeklyAnalyzer(currentPeriod), tasksToAnalyze);
        setAnalyzer(newAnalyzer);
    }, [currentPeriod, tasksToAnalyze]);

    useEffect(() => {
        dispatch(plannerActions.setPlannerMode(PlannerMode.WEEKLY));
    }, [dispatch]);

    if (analyzer) console.table(analyzer.generateRecentPeriodCountData(10));
    if (analyzer) console.table(analyzer.generateRecentPeriodDurationData(10));

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
            {/* Some testing */}
            <h3>Status Data:</h3>
            <ul>
                {analyzer &&
                    analyzer.generateStatusData().map((chartData) => (
                        <li
                            key={chartData.label}
                            style={{ backgroundColor: `#${chartData.backgroundColor}` }}
                        >
                            <span>{chartData.label}: </span>
                            <span>{chartData.value}</span>
                        </li>
                    ))}
            </ul>
            <br />
            <br />
            <h3>Importance Data:</h3>
            <ul>
                {analyzer &&
                    analyzer.generateImportanceData(AnalysisOption.PREVIOUS).map((chartData) => {
                        return (
                            <li
                                key={chartData.label}
                                // className="bg-slate-300"
                                style={{ backgroundColor: `#${chartData.backgroundColor}` }}
                            >
                                <span>{chartData.label}: </span>
                                <span>{chartData.value}</span>
                            </li>
                        );
                    })}
            </ul>
            <br />
            <br />
            <h3>Category Data:</h3>
            <ul>
                {analyzer &&
                    analyzer.generateCategoryData().map((chartData) => {
                        return (
                            <li
                                key={chartData.label}
                                style={{ backgroundColor: `#${chartData.backgroundColor}` }}
                            >
                                <span>{chartData.label}: </span>
                                <span>{chartData.value}</span>
                            </li>
                        );
                    })}
            </ul>
            <br />
            <br />
            <h3>WeekDay Data:</h3>
            <ul>
                {analyzer &&
                    analyzer.generateWeekDayData().map((chartData) => {
                        return (
                            <li
                                key={chartData.label}
                                style={{ backgroundColor: `#${chartData.backgroundColor}` }}
                            >
                                <span>{chartData.label}: </span>
                                <span>{chartData.value}</span>
                            </li>
                        );
                    })}
            </ul>
            <br />
            <br />
            <h3>DayPeriod Data:</h3>
            <ul>
                {analyzer &&
                    analyzer.generateDayPeriodData().map((chartData) => {
                        return (
                            <li
                                key={chartData.label}
                                style={{ backgroundColor: `#${chartData.backgroundColor}` }}
                            >
                                <span>{chartData.label}: </span>
                                <span>{chartData.value}</span>
                            </li>
                        );
                    })}
            </ul>
        </main>
    );
};

export default AnalysisMain;
