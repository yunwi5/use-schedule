import React from 'react';
import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import AnalysisSectionContainer from '../containers/AnalysisSectionContainer';
import CategoryAnalysis from './CategoryAnalysis';
import ImportanceAnalysis from './ImportanceAnalysis';
import StatusAnalysis from './StatusAnalysis';

interface Props {
    analyzer: AbstractAnalyzer;
}

const CategoricalDataAnalysis: React.FC<Props> = ({ analyzer }) => {
    return (
        <>
            <AnalysisSectionContainer title="Categorical Data Analysis">
                <div className="flex flex-col gap-2">
                    <StatusAnalysis analyzer={analyzer} />
                    <ImportanceAnalysis analyzer={analyzer} />
                    <CategoryAnalysis analyzer={analyzer} />
                </div>
            </AnalysisSectionContainer>
        </>
    );
};

export default CategoricalDataAnalysis;
