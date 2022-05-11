import React from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import AnalysisSectionContainer from '../containers/AnalysisSectionContainer';
import DayPeriodAnalysis from './DayPeriodAnalysis';
import WeekdayAnalysis from './WeekdayAnalysis';

interface Props {
    analyzer: AbstractAnalyzer;
}

const PeriodicAnalysis: React.FC<Props> = ({ analyzer }) => {
    return (
        <AnalysisSectionContainer title={'Periodic Data Analysis'}>
            <div className="flex flex-col gap-2">
                <WeekdayAnalysis analyzer={analyzer} />
                <DayPeriodAnalysis analyzer={analyzer} />
            </div>
        </AnalysisSectionContainer>
    );
};

export default PeriodicAnalysis;
