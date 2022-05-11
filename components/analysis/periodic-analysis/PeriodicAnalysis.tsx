import React from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { useAppSelector } from '../../../store/redux';
import { getPeriodName } from '../../../utilities/gen-utils/label-util';
import AnalysisSectionContainer from '../containers/AnalysisSectionContainer';
import DayPeriodAnalysis from './DayPeriodAnalysis';
import WeekdayAnalysis from './WeekdayAnalysis';

interface Props {
    analyzer: AbstractAnalyzer;
}

const PeriodicAnalysis: React.FC<Props> = ({ analyzer }) => {
    const plannerMode = useAppSelector((state) => state.planner.plannerMode);
    const timeFrame = getPeriodName(plannerMode);

    return (
        <AnalysisSectionContainer title={'Periodic Data Analysis'}>
            <div className="flex flex-col gap-2">
                <WeekdayAnalysis analyzer={analyzer} timeFrame={timeFrame} />
                <DayPeriodAnalysis analyzer={analyzer} timeFrame={timeFrame} />
            </div>
        </AnalysisSectionContainer>
    );
};

export default PeriodicAnalysis;
