import {
    CalendarItemType,
    getItemIcon,
} from '../../../../models/calendar-models/CalendarItemType';
import { getISOTimeFormat } from '../../../../utilities/date-utils/date-format';

interface Props {
    bgClass: string;
    textClass: string;
    hoverBgClass: string;
    hoverTextClass: string;
    dateTime: Date | null;
    overdue: boolean;
    itemType: CalendarItemType;
    borderClass?: string;
    isCompleted?: boolean;
    onClick: () => void;
}

const CalendarItemCard: React.FC<Props> = (props) => {
    const {
        bgClass,
        textClass,
        hoverBgClass,
        hoverTextClass,
        borderClass,
        isCompleted,
        dateTime,
        overdue,
        itemType,
        onClick,
    } = props;

    if (!dateTime) {
        return <span />;
    }

    const timeFormat = getISOTimeFormat(dateTime);

    const clickHandler = (e: React.MouseEvent | React.TouchEvent) => {
        // e.stopPropagation();
        onClick();
    };

    return (
        <div
            onClick={clickHandler}
            className={`flex items-center gap-1 max-w-[20rem] h-[33px] px-1 py-1 rounded-md cursor-pointer border-[.9px] ${
                '' || ''
            } ${isCompleted ? 'line-through opacity-80' : ''} ${
                overdue
                    ? 'bg-rose-50 opacity-80 text-rose-500 hover:opacity-100 hover:bg-rose-500/80 hover:text-rose-50'
                    : `${bgClass} ${textClass} ${hoverBgClass} ${hoverTextClass}`
            } text-md`}
        >
            {getItemIcon(itemType, 'mr-0')}
            <time className="inline-block font-semibold cursor-pointer">{timeFormat}</time>
            <span className="inline-block whitespace-nowrap max-w-[90%] overflow-hidden cursor-pointer">
                {props.children}
            </span>
        </div>
    );
};

export default CalendarItemCard;
