import React from 'react';

import useDateTime, { ResetPeriod } from '../../../hooks/useDateTime';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import { Task } from '../../../models/task-models/Task';
import { useAppDispatch } from '../../../store/redux';
import { plannerActions } from '../../../store/redux/planner-slice';
import { getCurrentWeekBeginning } from '../../../utilities/date-utils/date-get';
import AnalysisMain from './AnalysisMain';

interface Props {
    allTasks: Task[];
    periodicTasks: Task[]; // Either weekly, montly or yearly tasks specific
    beginningDate: Date;
}

const YearlyAnalysis: React.FC<Props> = () => {
    return <div>YearlyAnalysis</div>;
};

export default YearlyAnalysis;
