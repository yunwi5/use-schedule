import { useEffect } from 'react';

import useDateTime, { ResetPeriod } from '../../../hooks/useDateTime';
import { IEvent } from '../../../models/Event';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import { Task } from '../../../models/task-models/Task';
import { AnalysisContextProvider } from '../../../store/context/analysis-context';
import { useAppDispatch } from '../../../store/redux';
import { plannerActions } from '../../../store/redux/planner-slice';
import { getCurrentMonthBeginning } from '../../../utilities/date-utils/date-get';
import AnalysisMain from './AnalysisMain';

interface Props {
    tasks: Task[];
    events: IEvent[];
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
        <AnalysisContextProvider>
            <AnalysisMain
                {...props}
                onNavigate={monthNavigateHandler}
                currentPeriod={currentPeriod}
            />
        </AnalysisContextProvider>
    );
};

export default MontlyAnalysis;
