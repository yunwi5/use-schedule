import MiniCalendar from '../navigation-sections/MiniCalendar';
import CompletionSummary from './CompletionSummary';
import DayPeriodSummary from './DayPeriodSummary';
import WeekdaySummary from './WeekdaySummary';

const DataSummary: React.FC = () => {
    return (
        <div className="xl:max-h-[15rem] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-3">
            <CompletionSummary />
            <WeekdaySummary />
            <DayPeriodSummary />
            <MiniCalendar />
        </div>
    );
};

export default DataSummary;
