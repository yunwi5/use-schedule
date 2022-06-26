import React, { useEffect, useMemo } from 'react';

import { AnalysisMode } from '../../../models/analyzer-models/helper-models';
import { Task } from '../../../models/task-models/Task';
import { processTasks } from '../../../utilities/tasks-utils/task-util';
import LoadingSpinner from '../../ui/design-elements/LoadingSpinner';
import AnalysisHeader from '../navigation/AnalysisHeader';
import CategoricalDataAnalysis from '../categorical-analysis/CategoricalAnalysis';
import PeriodicAnalysis from '../periodic-analysis/PeriodicAnalysis';
import TrendAnalysis from '../trend-analysis/TrendAnalysis';
import { IEvent } from '../../../models/Event';
import { processEvents } from '../../../utilities/event-utils/event-util';
import { useAnalysisContext } from '../../../store/context/analysis-context';
import { populateAnalyzer } from '../../../utilities/analysis-utils';
import BackgroundImage from '../../ui/design-elements/BackgroundImage';

interface Props {
    tasks: Task[];
    periodicTasks?: Task[]; // Either weekly, montly or yearly tasks specific
    events: IEvent[];
    currentPeriod: Date;
    onNavigate(dir?: number): void; // Can handle both navigate back & forwards as well as to current period
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
    }, [
        plannerMode,
        analysisMode,
        currentPeriod,
        processedTasks,
        processedEvents,
        updateAnalyzer,
    ]);

    const analysisModeHandler = (targetMode: AnalysisMode) => {
        // should be either tasks, events or all (should not be neither).
        if (targetMode === AnalysisMode.EVENTS) {
            if (analysisMode === AnalysisMode.TASKS) updateAnalysisMode(AnalysisMode.ALL);
            else if (analysisMode === AnalysisMode.ALL) updateAnalysisMode(AnalysisMode.TASKS);
        } else if (targetMode === AnalysisMode.TASKS) {
            if (analysisMode === AnalysisMode.EVENTS) updateAnalysisMode(AnalysisMode.ALL);
            else if (analysisMode === AnalysisMode.ALL)
                updateAnalysisMode(AnalysisMode.EVENTS);
        }
    };

    return (
        <div>
            <BackgroundImage
                src="/bg-images/bg-analysis2.jpg"
                alt="Analysis background"
                opacity={0.2}
            />
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
                    <div className="pl-3 sm:pl-6 flex flex-col gap-20">
                        <TrendAnalysis />
                        <PeriodicAnalysis />
                        <CategoricalDataAnalysis />
                    </div>
                )}
            </main>
        </div>
    );
};

export default AnalysisMain;
