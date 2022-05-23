import React, { useContext, useEffect, useState } from 'react';
import useDateTime from '../../hooks/useDateTime';
import { AbstractAnalyzer } from '../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisMode } from '../../models/analyzer-models/helper-models';
import { IEvent } from '../../models/Event';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import { populateAnalyzer } from '../../utilities/analysis-utils';
import { getCurrentWeekBeginning, getWeekBeginning } from '../../utilities/date-utils/date-get';

interface IDashboardContext {
    analyzer: AbstractAnalyzer | null;
    tasks: AbstractTask[];
    events: IEvent[];
    currentPeriod: Date;
}

const DashboardContext = React.createContext<IDashboardContext>({
    analyzer: null,
    tasks: [],
    events: [],
    currentPeriod: new Date(),
});

// custom hook for dashboard
export const useDashboardContext = () => useContext(DashboardContext);

interface Props {
    events: IEvent[];
    tasks: AbstractTask[];
}
export const DashboardContextProvider: React.FC<Props> = (props) => {
    const { events, tasks, children } = props;
    const [analyzer, setAnalyzer] = useState<AbstractAnalyzer | null>(null);

    // const currentWeekBegining = getCurrentWeekBeginning();
    const today = new Date();
    const { currentTimeStamp, setCurrentTimeStamp } = useDateTime(today);

    // Dashboard is week based.
    useEffect(() => {
        const weekBeginning = getWeekBeginning(currentTimeStamp);
        const newAnalyzer = populateAnalyzer(
            PlannerMode.WEEKLY,
            AnalysisMode.ALL,
            weekBeginning,
            tasks,
            events,
        );
        setAnalyzer(newAnalyzer);
    }, [currentTimeStamp, events, tasks]);

    const contextValue = {
        currentPeriod: currentTimeStamp,
        analyzer,
        events,
        tasks,
    };

    return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
};
