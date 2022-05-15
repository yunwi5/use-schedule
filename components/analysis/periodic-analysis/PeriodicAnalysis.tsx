import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { YearlyAnalyzer } from '../../../models/analyzer-models/YearlyAnalyzer';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import { useAnalysisContext } from '../../../store/context/analysis-context';
import AnalysisSectionContainer from '../containers/AnalysisSectionContainer';
import DayPeriodAnalysis from './DayPeriodAnalysis';
import MonthAnalysis from './MonthAnalysis';
import WeekdayAnalysis from './WeekdayAnalysis';

const PeriodicAnalysis: React.FC = () => {
    const { analyzer } = useAnalysisContext();
    if (!analyzer) return <div>No analyzer found.</div>;

    return (
        <AnalysisSectionContainer title={'Periodic Data Analysis'}>
            <div className="flex flex-col gap-2">
                {analyzer.plannerMode === PlannerMode.YEARLY && (
                    <MonthAnalysis analyzer={analyzer as YearlyAnalyzer} />
                )}
                <WeekdayAnalysis />
                <DayPeriodAnalysis />
            </div>
        </AnalysisSectionContainer>
    );
};

export default PeriodicAnalysis;
