import { useEffect } from 'react';

import useDateTime, { ResetPeriod } from '../../../hooks/useDateTime';
import { IEvent } from '../../../models/Event';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import { Task } from '../../../models/task-models/Task';
import { useAppDispatch } from '../../../store/redux';
import { plannerActions } from '../../../store/redux/planner-slice';
import { getCurrentYearBeginning } from '../../../utilities/date-utils/date-get';
import AnalysisMain from './AnalysisMain';
import { AnalysisContextProvider } from '../../../store/context/analysis-context';

interface Props {
    tasks: Task[];
    events: IEvent[];
    beginningDate: Date;
}

const YearlyAnalysis: React.FC<Props> = (props) => {
    const { beginningDate } = props;

    const dispatch = useAppDispatch();
    const currentYearBeginning = getCurrentYearBeginning();
    const {
        currentTimeStamp: currentPeriod,
        addYears,
        setCurrentTimeStamp,
    } = useDateTime(beginningDate, ResetPeriod.YEAR);

    // If the year beginning changes, the planner also has to change to load new tasks according to
    // the changed week beginning.
    const yearNavigateHandler = (direction?: number) => {
        if (typeof direction !== 'number') {
            setCurrentTimeStamp(currentYearBeginning);
            return;
        }
        if (direction !== 1 && direction !== -1) {
            console.error('Direction parameter is wrong!');
            return;
        }
        addYears(direction);
    };

    useEffect(() => {
        dispatch(plannerActions.setPlannerMode(PlannerMode.YEARLY));
    }, [dispatch]);

    return (
        <AnalysisContextProvider>
            <AnalysisMain
                {...props}
                onNavigate={yearNavigateHandler}
                currentPeriod={currentPeriod}
            />
        </AnalysisContextProvider>
    );
};

export default YearlyAnalysis;
