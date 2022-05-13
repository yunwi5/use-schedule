import React, { useEffect } from 'react';

import useDateTime, { ResetPeriod } from '../../../hooks/useDateTime';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import { Task } from '../../../models/task-models/Task';
import { useAppDispatch } from '../../../store/redux';
import { plannerActions } from '../../../store/redux/planner-slice';
import { getCurrentMonthBeginning } from '../../../utilities/date-utils/date-get';
import AnalysisMain from './AnalysisMain';

interface Props {
    allTasks: Task[];
    periodicTasks: Task[]; // Either weekly, montly or yearly tasks specific
    beginningDate: Date;
}

const MontlyAnalysis: React.FC<Props> = (props) => {
    const { beginningDate } = props;

    const dispatch = useAppDispatch();
    const currentMonthBeginning = getCurrentMonthBeginning(); // current timestemp -> DateTime now.
    const {
        currentTimeStamp: currentPeriod,
        addMonths,
        setCurrentTimeStamp,
    } = useDateTime(beginningDate, ResetPeriod.MONTH);

    // If the week beginning changes, the planner also has to change to load new tasks according to
    // the changed week beginning.
    const monthNavigateHandler = (direction?: number) => {
        if (typeof direction !== 'number') {
            setCurrentTimeStamp(currentMonthBeginning);
            return;
        }
        if (direction !== 1 && direction !== -1) {
            console.error('Direction parameter is wrong!');
            return;
        }
        addMonths(direction);
    };

    useEffect(() => {
        dispatch(plannerActions.setPlannerMode(PlannerMode.MONTLY));
    }, [dispatch]);

    return (
        <AnalysisMain {...props} onNavigate={monthNavigateHandler} currentPeriod={currentPeriod} />
    );
};

export default MontlyAnalysis;
