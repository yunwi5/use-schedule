import { faInfoCircle } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { AnalysisMode } from '../../../models/analyzer-models/helper-models';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import { useAppSelector } from '../../../store/redux';
import {
    getMonthEnding,
    getWeekEnding,
    getYearEnding,
} from '../../../utilities/date-utils/date-get';
import { getNavigationPeriod } from '../../../utilities/gen-utils/format-util';
import { getTaskType } from '../../../utilities/tasks-utils/task-label';
import ActiveButton from '../../ui/buttons/ActiveButton';
import Button from '../../ui/buttons/Button';
import PeriodNavigator from '../../ui/navigation/PeriodNavigator';

interface Props {
    currentPeriod: Date;
    onNavigate(dir?: number): void;
    onNavigateCurrent(): void;
    currentMode: AnalysisMode;
    onChangeMode(newMode: AnalysisMode): void;
}

function getCurrentPeriodLabel(plannerMode: PlannerMode | null): string {
    switch (plannerMode) {
        case PlannerMode.WEEKLY:
            return 'This Week';
        case PlannerMode.MONTLY:
            return 'This Month';
        case PlannerMode.YEARLY:
            return 'This Year';
        default:
            return 'This Week';
    }
}

function getPeriodEnding(plannerMode: PlannerMode | null, period: Date) {
    switch (plannerMode) {
        case PlannerMode.WEEKLY:
            return getWeekEnding(period);
        case PlannerMode.MONTLY:
            return getMonthEnding(period);
        case PlannerMode.YEARLY:
            return getYearEnding(period);
        default:
            return period;
    }
}

const AnalysisHeader: React.FC<Props> = (props) => {
    const { currentPeriod, onNavigate, currentMode, onChangeMode } = props;

    const plannerMode = useAppSelector((state) => state.planner.plannerMode);
    const endingPeriod = getPeriodEnding(plannerMode, currentPeriod);

    // For writing label to indicate to the user.
    const taskType: string = getTaskType(plannerMode || PlannerMode.WEEKLY);

    return (
        <nav className="-ml-2 flex justify-between pr-10 gap-[5.5rem] items-center text-xl">
            <div className="flex gap-2">
                <PeriodNavigator onNavigate={onNavigate}>
                    {`${getNavigationPeriod(
                        currentPeriod,
                        plannerMode,
                    )}  (${endingPeriod.getFullYear()})`}
                </PeriodNavigator>
                <Button
                    onClick={onNavigate}
                    className={`max-h-[2.7rem] !py-2 flex justify-center items-center`}
                >
                    {getCurrentPeriodLabel(plannerMode)}
                </Button>
            </div>
            <div className="flex gap-2 items-center">
                <ActiveButton
                    className="!min-w-[8.9rem] max-h-[2.7rem] !py-2 flex justify-center items-center"
                    isActive={currentMode === AnalysisMode.ONLY_CURRENT_PLANNER}
                    onClick={onChangeMode.bind(null, AnalysisMode.ONLY_CURRENT_PLANNER)}
                >
                    {taskType + 's'}
                </ActiveButton>
                <ActiveButton
                    className="!min-w-[8.9rem] max-h-[2.7rem] !py-2 flex justify-center items-center"
                    isActive={currentMode === AnalysisMode.ALL_PLANNERS}
                    onClick={onChangeMode.bind(null, AnalysisMode.ALL_PLANNERS)}
                >
                    All Tasks
                </ActiveButton>
                <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="ml-3 max-w-[2rem] max-h-[2rem] text-3xl text-sky-600/80 shadow-sm cursor-pointer transition-all hover:scale-125 hover:text-blue-500"
                />
            </div>
        </nav>
    );
};

export default AnalysisHeader;
