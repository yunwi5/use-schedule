import { faInfoCircle } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import useWindowInnerWidth from '../../../hooks/useWindowInnerWidth';
import { AnalysisMode } from '../../../models/analyzer-models/helper-models';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import { useAppSelector } from '../../../store/redux';
import { getPlannerPeriodEnding } from '../../../utilities/date-utils/date-get';
import { getNavigationPeriod } from '../../../utilities/gen-utils/format-util';
import ActiveButton from '../../ui/buttons/ActiveButton';
import Button from '../../ui/buttons/Button';
import DropDownToggler from '../../ui/icons/DropDownToggler';
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

function getNavigationPeriodFormat(currentPeriod: Date, plannerMode: PlannerMode | null) {
    const endingPeriod = getPlannerPeriodEnding(plannerMode, currentPeriod);
    const navPeriod = getNavigationPeriod(currentPeriod, plannerMode);
    switch (plannerMode) {
        case PlannerMode.WEEKLY:
            return (
                <>
                    {navPeriod}
                    <span className="hidden ml-3 lg:inline">({endingPeriod.getFullYear()})</span>
                </>
            );
        case PlannerMode.MONTLY:
        case PlannerMode.YEARLY:
            return navPeriod;
        default:
            return 'Mode is null';
    }
}

const AnalysisHeader: React.FC<Props> = (props) => {
    const { currentPeriod, onNavigate, currentMode, onChangeMode } = props;
    // Show dropdown navigation for mobile screen (< 768px)
    const [showDropDown, setShowDropDown] = useState(true);
    useWindowInnerWidth({ breakPoint: 768, breakPointCallback: () => setShowDropDown(true) });

    const plannerMode = useAppSelector((state) => state.planner.plannerMode);
    // For writing label to indicate to the user.
    const navPeriodFormat = getNavigationPeriodFormat(currentPeriod, plannerMode);

    return (
        <nav className="ml-3 md:-ml-2 flex flex-col md:flex-row justify-between pr-5 xl:pr-10 gap-3 lg:gap-[5.5rem] md:items-center text-xl">
            <div className="flex gap-2 items-center">
                <PeriodNavigator onNavigate={onNavigate}>{navPeriodFormat}</PeriodNavigator>
                <Button
                    onClick={onNavigate}
                    className={`!ml-auto max-h-[2.7rem] !py-2 flex justify-center items-center`}
                >
                    {getCurrentPeriodLabel(plannerMode)}
                </Button>
                <DropDownToggler
                    onToggle={() => setShowDropDown((prev) => !prev)}
                    showDropDown={showDropDown}
                    className={`md:hidden !text-3xl !ml-1`}
                />
            </div>
            {showDropDown && (
                <div className="flex gap-2 items-center pt-3 md:pt-0 border-t-2 md:border-0 border-slate-300">
                    <ActiveButton
                        className="!min-w-[8.9rem] max-h-[2.7rem] !py-2 flex justify-center items-center"
                        isActive={
                            currentMode === AnalysisMode.EVENTS || currentMode === AnalysisMode.ALL
                        }
                        onClick={onChangeMode.bind(null, AnalysisMode.EVENTS)}
                    >
                        Events
                    </ActiveButton>
                    <ActiveButton
                        className="mr-auto !min-w-[8.9rem] max-h-[2.7rem] !py-2 flex justify-center items-center"
                        isActive={
                            currentMode === AnalysisMode.TASKS || currentMode === AnalysisMode.ALL
                        }
                        onClick={onChangeMode.bind(null, AnalysisMode.TASKS)}
                    >
                        Tasks
                    </ActiveButton>
                    <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="ml-1 lg:ml-3 max-w-[2rem] max-h-[2rem] text-3xl text-sky-600/80 shadow-sm cursor-pointer transition-all hover:scale-125 hover:text-blue-500"
                    />
                </div>
            )}
        </nav>
    );
};

export default AnalysisHeader;
