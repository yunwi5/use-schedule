import { faInfoCircle } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { AnalysisMode } from '../../../models/analyzer-models/helper-models';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import { useAppSelector } from '../../../store/redux';
import { getTaskType } from '../../../utilities/tasks-utils/task-label';
import Button from '../../ui/Button';
import PeriodNavigator from '../../ui/navigation/PeriodNavigator';

interface Props {
    currentPeriod: string;
    onNavigate(dir: number): void;
    currentMode: AnalysisMode;
    onChangeMode(newMode: AnalysisMode): void;
}

const AnalysisHeader: React.FC<Props> = (props) => {
    const { currentPeriod, onNavigate, currentMode, onChangeMode } = props;

    const plannerMode = useAppSelector((state) => state.planner.plannerMode);

    // For writing label to indicate to the user.
    const taskType: string = getTaskType(plannerMode || PlannerMode.WEEKLY);

    return (
        <nav className="-ml-2 flex gap-4 items-center">
            <PeriodNavigator currentPeriod={currentPeriod} onNavigate={onNavigate} />
            <div className="flex gap-2">
                <Button className="">{taskType + 's'}</Button>
                <Button className="">All Tasks</Button>
            </div>
            <FontAwesomeIcon
                icon={faInfoCircle}
                className="max-w-[2rem] max-h-[2rem] text-3xl text-sky-600/80"
            />
        </nav>
    );
};

export default AnalysisHeader;
