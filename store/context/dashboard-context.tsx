import React, { useCallback, useContext, useEffect, useState } from 'react';

import useDateTime from '../../hooks/useDateTime';
import useEventQuery from '../../hooks/useEventQuery';
import useTaskQuery from '../../hooks/useTaskQuery';
import { AbstractAnalyzer } from '../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisMode } from '../../models/analyzer-models/helper-models';
import { IEvent } from '../../models/Event';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import { useAppDispatch } from '../redux';
import { plannerActions } from '../redux/planner-slice';
import { populateAnalyzer } from '../../utilities/analysis-utils';
import { getWeekBeginning } from '../../utilities/date-utils/date-get';

interface IDashboardContext {
    analyzer: AbstractAnalyzer | null;
    tasks: AbstractTask[];
    events: IEvent[];
    currentPeriod: Date;
    onInvalidate(): void;
    onChangeDate(date: Date): void;
}

const DashboardContext = React.createContext<IDashboardContext>({
    analyzer: null,
    tasks: [],
    events: [],
    currentPeriod: new Date(),
    onInvalidate: () => {},
    onChangeDate: () => {},
});

// custom hook for dashboard
export const useDashboardContext = () => useContext(DashboardContext);

interface Props {
    events: IEvent[];
    tasks: AbstractTask[];
}
export const DashboardContextProvider: React.FC<Props> = (props) => {
    const { events: initialEvents, tasks: initialTasks, children } = props;
    const [analyzer, setAnalyzer] = useState<AbstractAnalyzer | null>(null);

    const dispatch = useAppDispatch();
    const { allTasks: tasks, invalidateAllTasks: invalidateTasks } = useTaskQuery(initialTasks);
    const { events, invalidateEvents } = useEventQuery(initialEvents);

    const invalidateAll = () => {
        invalidateTasks();
        invalidateEvents();
    };

    const today = new Date();
    const { currentTimeStamp, setCurrentTimeStamp } = useDateTime(today);

    const dateHandler = useCallback(
        (newDate: Date) => {
            setCurrentTimeStamp(newDate);
        },
        [setCurrentTimeStamp],
    );

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

    // dashboard overview is week based.
    useEffect(() => {
        dispatch(plannerActions.setPlannerMode(PlannerMode.WEEKLY));
    }, [dispatch]);

    const contextValue = {
        currentPeriod: currentTimeStamp,
        analyzer,
        events,
        tasks,
        onInvalidate: invalidateAll,
        onChangeDate: dateHandler,
    };

    return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
};
