import React from 'react';
import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import AnalysisSectionContainer from '../containers/AnalysisSectionContainer';
import CategoryAnalysis from './CategoryAnalysis';
import ImportanceAnalysis from './ImportanceAnalysis';
import StatusAnalysis from './StatusAnalysis';

interface Props {
    analyzer: AbstractAnalyzer;
    timeFrame: string;
}

const CategoricalDataAnalysis: React.FC<Props> = ({ analyzer, timeFrame }) => {
    return (
        <AnalysisSectionContainer title="Categorical Data Analysis">
            <div className="flex flex-col gap-2">
                <StatusAnalysis analyzer={analyzer} timeFrame={timeFrame} />
                <ImportanceAnalysis analyzer={analyzer} timeFrame={timeFrame} />
                <CategoryAnalysis analyzer={analyzer} timeFrame={timeFrame} />
            </div>
        </AnalysisSectionContainer>
    );
};

export default CategoricalDataAnalysis;
