import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { YearlyAnalyzer } from '../../../models/analyzer-models/YearlyAnalyzer';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import AnalysisSectionContainer from '../containers/AnalysisSectionContainer';
import DayPeriodAnalysis from './DayPeriodAnalysis';
import MonthAnalysis from './MonthAnalysis';
import WeekdayAnalysis from './WeekdayAnalysis';

interface Props {
    analyzer: AbstractAnalyzer;
    timeFrame: string;
}

const PeriodicAnalysis: React.FC<Props> = ({ analyzer, timeFrame }) => (
    <AnalysisSectionContainer title={'Periodic Data Analysis'}>
        <div className="flex flex-col gap-2">
            {analyzer.plannerMode === PlannerMode.YEARLY && (
                <MonthAnalysis analyzer={analyzer as YearlyAnalyzer} />
            )}
            <WeekdayAnalysis analyzer={analyzer} timeFrame={timeFrame} />
            <DayPeriodAnalysis analyzer={analyzer} timeFrame={timeFrame} />
        </div>
    </AnalysisSectionContainer>
);

export default PeriodicAnalysis;
