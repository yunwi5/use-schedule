import React, { useState } from 'react';
import useDateTime, { ResetPeriod } from '../../hooks/useDateTime';
import { AnalysisMode } from '../../models/analyzer-models/helper-models';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { Task } from '../../models/task-models/Task';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import { plannerActions } from '../../store/redux/planner-slice';
import { getCurrentWeekBeginning } from '../../utilities/date-utils/date-get';
import { getTaskType } from '../../utilities/tasks-utils/task-label';
import AnalysisHeader from './navigation/AnalysisHeader';

interface Props {
    allTasks: Task[];
    periodicTasks: Task[]; // Either weekly, montly or yearly tasks specific
}

const AnalysisMain: React.FC<Props> = (props) => {
    const { allTasks, periodicTasks } = props;
    const [analysisMode, setAnalysisMode] = useState(AnalysisMode.ONLY_CURRENT_PLANNER);

    const dispatch = useAppDispatch();

    const weekBeginning = getCurrentWeekBeginning();
    dispatch(plannerActions.setBeginningPeriod(weekBeginning.toString()));
    const { currentTimeStamp, addWeeks: addLocalWeeks } = useDateTime(
        weekBeginning,
        ResetPeriod.WEEK,
    );

    const plannerMode: PlannerMode | null = useAppSelector((state) => state.planner.plannerMode);

    const taskType: string = getTaskType(plannerMode || PlannerMode.WEEKLY);

    // If the week beginning changes, the planner also has to change to load new tasks according to
    // Changed week beginning.
    const weekNavigateHandler = (direction: number) => {
        if (direction !== 1 && direction !== -1) throw new Error('Direction parameter is wrong!');
        // Hook call
        addLocalWeeks(direction);
    };

    return (
        <main>
            AnalysisMain
            <div>
                <h1 className="text-4xl">{taskType} Analysis (2022)</h1>
                <AnalysisHeader
                    currentPeriod={currentTimeStamp.toDateString()}
                    onNavigate={weekNavigateHandler}
                    currentMode={analysisMode}
                    onChangeMode={(newMode: AnalysisMode) => setAnalysisMode(newMode)}
                />
            </div>
        </main>
    );
};

export default AnalysisMain;
