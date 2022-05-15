import React, { useEffect, useMemo } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisMode } from '../../../models/analyzer-models/helper-models';
import { WeeklyAnalyzer } from '../../../models/analyzer-models/WeeklyAnalyzer';
import { YearlyAnalyzer } from '../../../models/analyzer-models/YearlyAnalyzer';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import { AbstractTask } from '../../../models/task-models/AbstractTask';
import { Task } from '../../../models/task-models/Task';
import { processTasks } from '../../../utilities/tasks-utils/task-util';
import LoadingSpinner from '../../ui/design-elements/LoadingSpinner';
import AnalysisHeader from '../navigation/AnalysisHeader';
import CategoricalDataAnalysis from '../categorical-analysis/CategoricalAnalysis';
import PeriodicAnalysis from '../periodic-analysis/PeriodicAnalysis';
import TrendAnalysis from '../trend-analysis/TrendAnalysis';
import { MontlyAnalyzer } from '../../../models/analyzer-models/MontlyAnalyzer';
import { IEvent } from '../../../models/Event';
import { processEvents } from '../../../utilities/event-utils/event-util';
import { useAnalysisContext } from '../../../store/context/analysis-context';

interface Props {
    tasks: Task[];
    periodicTasks?: Task[]; // Either weekly, montly or yearly tasks specific
    events: IEvent[];
    currentPeriod: Date;
    onNavigate(dir?: number): void; // Can handle both navigate back & forwards as well as to current period
}

function populateAnalyzer(
    plannerMode: PlannerMode,
    analysisMode: AnalysisMode,
    currentPeriod: Date,
    tasks: AbstractTask[],
    events: IEvent[],
) {
    let analyzer: AbstractAnalyzer;
    if (plannerMode === PlannerMode.WEEKLY) {
        analyzer = new WeeklyAnalyzer(currentPeriod, analysisMode);
    } else if (plannerMode === PlannerMode.MONTLY) {
        analyzer = new MontlyAnalyzer(currentPeriod, analysisMode);
    } else {
        analyzer = new YearlyAnalyzer(currentPeriod, analysisMode);
    }
    if (analysisMode === AnalysisMode.EVENTS || analysisMode === AnalysisMode.ALL) {
        for (const event of events) analyzer.addItem(event);
    }
    if (analysisMode === AnalysisMode.TASKS || analysisMode === AnalysisMode.ALL) {
        for (const task of tasks) analyzer.addItem(task);
    }
    return analyzer;
}

const AnalysisMain: React.FC<Props> = (props) => {
    const { tasks: allTasks, currentPeriod, events, onNavigate } = props;
    const { analyzer, plannerMode, analysisMode, updateAnalyzer, updateAnalysisMode } =
        useAnalysisContext();

    const processedTasks = useMemo(() => processTasks(allTasks), [allTasks]);
    const processedEvents = useMemo(() => processEvents(events), [events]);

    useEffect(() => {
        if (!plannerMode) return;
        const newAnalyzer = populateAnalyzer(
            plannerMode,
            analysisMode,
            currentPeriod,
            processedTasks,
            processedEvents,
        );
        updateAnalyzer(newAnalyzer);
    }, [plannerMode, analysisMode, currentPeriod, processedTasks, processedEvents, updateAnalyzer]);

    const analysisModeHandler = (targetMode: AnalysisMode) => {
        // should be either tasks, events or all (should not be neither).
        if (targetMode === AnalysisMode.EVENTS) {
            if (analysisMode === AnalysisMode.TASKS) updateAnalysisMode(AnalysisMode.ALL);
            else if (analysisMode === AnalysisMode.ALL) updateAnalysisMode(AnalysisMode.TASKS);
        } else if (targetMode === AnalysisMode.TASKS) {
            if (analysisMode === AnalysisMode.EVENTS) updateAnalysisMode(AnalysisMode.ALL);
            else if (analysisMode === AnalysisMode.ALL) updateAnalysisMode(AnalysisMode.EVENTS);
        }
    };

    return (
        <main className="py-6 md:pl-4 text-slate-600">
            <div className="mt-3 mb-10 flex pl-3 flex-col gap-4">
                <AnalysisHeader
                    currentPeriod={currentPeriod}
                    onNavigate={onNavigate}
                    currentMode={analysisMode}
                    onChangeMode={analysisModeHandler}
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
                    <TrendAnalysis />
                    <PeriodicAnalysis />
                    <CategoricalDataAnalysis />
                </div>
            )}
        </main>
    );
};

export default AnalysisMain;
