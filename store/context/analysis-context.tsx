import { createContext, useCallback, useContext, useState } from 'react';
import { AbstractAnalyzer } from '../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisMode } from '../../models/analyzer-models/helper-models';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { getPeriodName } from '../../utilities/gen-utils/label-util';
import { useAppSelector } from '../redux';

interface IAnalysisContext {
    analyzer: AbstractAnalyzer | null;
    analysisMode: AnalysisMode;
    updateAnalyzer: (newAnalyzer: AbstractAnalyzer) => void;
    updateAnalysisMode: (newMode: AnalysisMode) => void;
    plannerMode: PlannerMode | null;
    timeFrame: string;
    itemName: string;
}

const AnalysisContext = createContext<IAnalysisContext>({
    analyzer: null,
    analysisMode: AnalysisMode.TASKS,
    updateAnalyzer: (newAnalyzer: AbstractAnalyzer) => {},
    updateAnalysisMode: (newMode: AnalysisMode) => {},
    plannerMode: null,
    timeFrame: '',
    itemName: '',
});

export const useAnalysisContext = () => {
    return useContext(AnalysisContext);
};

export const AnalysisContextProvider: React.FC = ({ children }) => {
    const [analyzer, setAnalyzer] = useState<AbstractAnalyzer | null>(null);
    const [analysisMode, setAnalysisMode] = useState(AnalysisMode.TASKS);
    const plannerMode = useAppSelector((state) => state.planner.plannerMode);

    const analyzerHandler = useCallback((newAnalyzer: AbstractAnalyzer) => {
        setAnalyzer(newAnalyzer);
    }, []);

    const analysisModeHandler = useCallback((newMode: AnalysisMode) => {
        setAnalysisMode(newMode);
    }, []);

    // derivable properties
    const timeFrame = getPeriodName(plannerMode);
    const itemName = getItemName(analysisMode);

    return (
        <AnalysisContext.Provider
            value={{
                analyzer,
                plannerMode,
                analysisMode,
                timeFrame,
                itemName,
                updateAnalyzer: analyzerHandler,
                updateAnalysisMode: analysisModeHandler,
            }}
        >
            {children}
        </AnalysisContext.Provider>
    );
};

function getItemName(analysisMode: AnalysisMode) {
    return analysisMode === AnalysisMode.ALL
        ? 'item'
        : analysisMode === AnalysisMode.TASKS
        ? 'task'
        : 'event';
}
