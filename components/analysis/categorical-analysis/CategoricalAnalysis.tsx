import { AnalysisMode } from '../../../models/analyzer-models/helper-models';
import { useAnalysisContext } from '../../../store/context/analysis-context';
import AnalysisSectionContainer from '../containers/AnalysisSectionContainer';
import CategoryAnalysis from './CategoryAnalysis';
import ImportanceAnalysis from './ImportanceAnalysis';
import StatusAnalysis from './StatusAnalysis';

const CategoricalAnalysis: React.FC = () => {
    const { analyzer, analysisMode } = useAnalysisContext();
    if (!analyzer) return <div></div>;

    return (
        <AnalysisSectionContainer title="Categorical Data Analysis">
            <div className="flex flex-col gap-2">
                <StatusAnalysis />
                <ImportanceAnalysis />
                {analysisMode === AnalysisMode.TASKS && <CategoryAnalysis />}
            </div>
        </AnalysisSectionContainer>
    );
};

export default CategoricalAnalysis;
