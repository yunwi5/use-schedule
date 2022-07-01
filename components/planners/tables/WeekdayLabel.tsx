import { getWeekDay } from '../../../models/date-models/WeekDay';
import { useWTableContext } from '../../../store/context/weekday-table-context';

const WeekdayLabel: React.FC<{ date: Date }> = ({ date }) => {
    const { minCellWidth } = useWTableContext();
    const dayMember = getWeekDay(date).substring(0, 3); // e.g. Monday

    return (
        <div
            className={`min-w-[8.375rem] ${`min-w-[${minCellWidth}rem]`} flex-1 h-[5rem] py-1 flex flex-col justify-center items-center`}
        >
            <h3 className={`capitalize text-3xl font-normal text-slate-500/90`}>
                {dayMember}
            </h3>
            <p className={`text-slate-600 font-semibold`}>{date.getDate()}</p>
        </div>
    );
};

export default WeekdayLabel;
