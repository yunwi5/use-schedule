import { isSameDate, isSameWeek } from '../../../utilities/date-utils/date-check';

interface Props {
    cellDate: Date;
    currentPeriod: Date;
    onChangeDate(day: Date): void;
}

const MiniCalendarCell: React.FC<Props> = ({ cellDate, currentPeriod, onChangeDate }) => {
    return (
        <div
            className={`py-1 md:py-0 flex-center cursor-pointer transition-all hover:bg-gray-100 hover:scale-110 hover:shadow-md ${
                isSameWeek(currentPeriod, cellDate) ? 'bg-blue-100 hover:!bg-blue-200' : ''
            }`}
            onClick={() => onChangeDate(cellDate)}
        >
            {isSameDate(currentPeriod, cellDate) ? (
                <span
                    className={`flex-center w-6 h-6 rounded-full bg-blue-600/90 text-blue-50`}
                >
                    {cellDate.getDate()}
                </span>
            ) : (
                `${cellDate.getDate()}`
            )}
        </div>
    );
};

export default MiniCalendarCell;
