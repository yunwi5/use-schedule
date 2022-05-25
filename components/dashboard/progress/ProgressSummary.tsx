import React, { useEffect, useMemo, useState } from 'react';

import {
    AnalysisMode,
    AnalysisModeList,
    ChartData,
    ProgressMode,
    ProgressModeList,
} from '../../../models/analyzer-models/helper-models';
import { ProgressAnalyzer } from '../../../models/analyzer-models/ProgressAnalyzer';
import AppSelect from '../../ui/input/AppSelect';
import { useDashboardContext } from '../dashboard-context';
import ProgressBar from './ProgressBar';

const ProgressSummary: React.FC = () => {
    // currentPeriod is not necessarily week, month or year beginning (need to adjust it)
    const { events, tasks, currentPeriod } = useDashboardContext();
    const [progressMode, setProgressMode] = useState<ProgressMode>(ProgressMode.WEEK); // week by default
    const [analysisMode, setAnalysisMode] = useState(AnalysisMode.ALL);
    const [progressAnalyzer, setProgressAnalyzer] = useState<ProgressAnalyzer | null>(null);

    const statusProgressArray: ChartData[] = useMemo(() => {
        return progressAnalyzer?.getProgressData(progressMode) || [];
    }, [progressAnalyzer, progressMode]);

    useEffect(() => {
        const newAnalyzer = new ProgressAnalyzer(currentPeriod);
        const items =
            analysisMode === AnalysisMode.ALL
                ? [...events, ...tasks]
                : analysisMode === AnalysisMode.EVENTS
                ? events
                : tasks;
        items.forEach((item) => {
            newAnalyzer.addItem(item);
        });
        setProgressAnalyzer(newAnalyzer);
    }, [events, tasks, currentPeriod, analysisMode]);

    // Create analyzer
    return (
        <section className={`px-3 py-2 w-full shadow-md rounded-md border-2 border-slate-200`}>
            <div
                className={`mb-3 px-0 sm:px-1 md:px-3 flex flex-col gap-3 sm:flex-row justify-start sm:justify-between items-start sm:items-center`}
            >
                <h3 className="text-2xl">Progress Summary</h3>
                <div className={`pr-3 flex gap-3`}>
                    <AppSelect
                        label={'Item'}
                        value={analysisMode}
                        onChange={(newVal: string) => setAnalysisMode(newVal as AnalysisMode)}
                        options={AnalysisModeList}
                        id={`analysis-mode-select`}
                        labelId={`analysis-mode-select-label`}
                    />
                    <AppSelect
                        label={'This'}
                        value={progressMode}
                        onChange={(newVal: string) => setProgressMode(newVal as ProgressMode)}
                        options={ProgressModeList}
                        id={`progress-type-select`}
                        labelId={`progress-type-select-label`}
                    />
                </div>
            </div>
            <ProgressBar progressArray={statusProgressArray} />
        </section>
    );
};

export default ProgressSummary;
