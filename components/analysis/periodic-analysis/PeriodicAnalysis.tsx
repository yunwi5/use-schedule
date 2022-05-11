import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import AnalysisSectionContainer from '../containers/AnalysisSectionContainer';
import DayPeriodAnalysis from './DayPeriodAnalysis';
import WeekdayAnalysis from './WeekdayAnalysis';

interface Props {
    analyzer: AbstractAnalyzer;
    timeFrame: string;
}

const PeriodicAnalysis: React.FC<Props> = ({ analyzer, timeFrame }) => (
    <AnalysisSectionContainer title={'Periodic Data Analysis'}>
        <div className="flex flex-col gap-2">
            <WeekdayAnalysis analyzer={analyzer} timeFrame={timeFrame} />
            <DayPeriodAnalysis analyzer={analyzer} timeFrame={timeFrame} />
        </div>
    </AnalysisSectionContainer>
);

export default PeriodicAnalysis;
