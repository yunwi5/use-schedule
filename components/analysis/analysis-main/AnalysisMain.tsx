import React, { useState, useEffect, useMemo } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisMode } from '../../../models/analyzer-models/helper-models';
import { WeeklyAnalyzer } from '../../../models/analyzer-models/WeeklyAnalyzer';
import { YearlyAnalyzer } from '../../../models/analyzer-models/YearlyAnalyzer';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import { AbstractTask } from '../../../models/task-models/AbstractTask';
import { PlannerTask, Task } from '../../../models/task-models/Task';
import { useAppSelector } from '../../../store/redux';
import { getPeriodName } from '../../../utilities/gen-utils/label-util';
import { processTasks } from '../../../utilities/tasks-utils/task-util';
import LoadingSpinner from '../../ui/design-elements/LoadingSpinner';
import AnalysisHeader from '../navigation/AnalysisHeader';
import CategoricalDataAnalysis from '../categorical-analysis/CategoricalAnalysis';
import PeriodicAnalysis from '../periodic-analysis/PeriodicAnalysis';
import TrendAnalysis from '../trend-analysis/TrendAnalysis';
import { MontlyAnalyzer } from '../../../models/analyzer-models/MontlyAnalyzer';

interface Props {
    allTasks: Task[];
    periodicTasks: Task[]; // Either weekly, montly or yearly tasks specific
    currentPeriod: Date;
    onNavigate(dir?: number): void; // Can handle both navigate back & forwards as well as to current period
}

function populateAnalyzer(plannerMode: PlannerMode, currentPeriod: Date, tasks: AbstractTask[]) {
    let analyzer: AbstractAnalyzer;
    if (plannerMode === PlannerMode.WEEKLY) {
        analyzer = new WeeklyAnalyzer(currentPeriod);
    } else if (plannerMode === PlannerMode.MONTLY) {
        analyzer = new MontlyAnalyzer(currentPeriod);
    } else {
        analyzer = new YearlyAnalyzer(currentPeriod);
    }
    for (const task of tasks) {
        analyzer.addTask(task);
    }
    return analyzer;
}

const AnalysisMain: React.FC<Props> = (props) => {
    const { allTasks, periodicTasks, currentPeriod, onNavigate } = props;
    const [analysisMode, setAnalysisMode] = useState(AnalysisMode.ALL_PLANNERS);
    const [analyzer, setAnalyzer] = useState<AbstractAnalyzer | null>(null);

    const processedAllTasks = useMemo(() => processTasks(allTasks), [allTasks]);
    const processedPeriodicTasks = useMemo(() => processTasks(periodicTasks), [periodicTasks]);
    const tasksToAnalyze: PlannerTask[] =
        analysisMode === AnalysisMode.ALL_PLANNERS ? processedAllTasks : processedPeriodicTasks;

    const plannerMode = useAppSelector((state) => state.planner.plannerMode);
    const timeFrame = getPeriodName(plannerMode);

    useEffect(() => {
        if (!plannerMode) return;
        const newAnalyzer = populateAnalyzer(plannerMode, currentPeriod, tasksToAnalyze);
        setAnalyzer(newAnalyzer);
    }, [plannerMode, currentPeriod, tasksToAnalyze]);

    return (
        <main className="py-6 md:pl-4 text-slate-600">
            <div className="mt-3 mb-10 flex pl-3 flex-col gap-4">
                <AnalysisHeader
                    currentPeriod={currentPeriod}
                    onNavigate={onNavigate}
                    currentMode={analysisMode}
                    onChangeMode={(newMode: AnalysisMode) => setAnalysisMode(newMode)}
                    onNavigateCurrent={onNavigate}
                />
            </div>
            {!analyzer && (
                <div className="flex justify-center items-center">
                    <LoadingSpinner />
                </div>
            )}
            {analyzer && (
                <div className="pl-6 flex flex-col gap-20">
                    <TrendAnalysis analyzer={analyzer} timeFrame={timeFrame} />
                    <PeriodicAnalysis analyzer={analyzer} timeFrame={timeFrame} />
                    <CategoricalDataAnalysis analyzer={analyzer} timeFrame={timeFrame} />
                </div>
            )}
        </main>
    );
};

export default AnalysisMain;
