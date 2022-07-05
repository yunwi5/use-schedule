import MiniCalendar from '../navigation-sections/MiniCalendar';
import CompletionSummary from './CompletionSummary';
import DayPeriodSummary from './DayPeriodSummary';
import WeekdaySummary from './WeekdaySummary';
import classes from './DataSummary.module.scss';

const DataSummary: React.FC = () => {
    return (
        <div className={`grid gap-x-3 gap-y-3 ${classes.grid}`}>
            <CompletionSummary />
            <WeekdaySummary />
            <DayPeriodSummary />
            <MiniCalendar />
        </div>
    );
};

export default DataSummary;
