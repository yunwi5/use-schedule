import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/pro-solid-svg-icons';

import { AnalysisItem } from '../../../models/analyzer-models/AnalysisItem';
import {
    CalendarItemType,
    getItemIcon,
    getItemTextColorClass,
} from '../../../models/calendar-models/CalendarItemType';
import { getMonthMember } from '../../../models/date-models/Month';
import { getWeekDay } from '../../../models/date-models/WeekDay';
import { Importance, Status } from '../../../models/task-models/Status';
import { getShortDurationFormat } from '../../../utilities/date-utils/date-format';

function getTimeFormat(date: Date) {
    let hours = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
    const minutes = date.getMinutes();
    const format = `${hours}${minutes > 0 ? `:${minutes}` : ''}${ampm}`;
    return format;
}

function upcomingItemDateTimeFormat(date: Date) {
    const timeFormat = getTimeFormat(date);
    const weekday = getWeekDay(date).slice(0, 3);
    const dateOfMonth = date.getDate();
    const month = getMonthMember(date).slice(0, 3);
    return `${timeFormat} ${month} ${dateOfMonth} (${weekday})`;
}

function isImportant(item: AnalysisItem) {
    return item.importance === Importance.CRUCIAL || item.importance === Importance.IMPORTANT;
}

interface Props {
    item: AnalysisItem;
    itemType: CalendarItemType;
    onShowDetail: () => void;
}

const UpcomingItemCard: React.FC<Props> = ({ item, itemType, onShowDetail }) => {
    const isCompleted = item.status === Status.COMPLETED;

    const importanceIcon = isImportant(item) ? (
        <FontAwesomeIcon icon={faStar} className={`icon-medium`} />
    ) : (
        ''
    );
    return (
        <li
            key={item.id}
            className={`py-2 px-3 flex gap-2 items-center border-b-2 border-slate-200 cursor-pointer transition-all hover:bg-slate-100 hover:shadow-lg hover:-translate-y-2 ${
                isCompleted ? 'opacity-75' : ''
            }`}
            onClick={onShowDetail}
        >
            <div className={`${getItemTextColorClass(itemType)}`}>{getItemIcon(itemType)}</div>
            <span
                className={`inline-block w-[38%] overflow-hidden text-lg text-slate-600/90 font-semibold cursor-pointer ${
                    isCompleted ? 'line-through' : ''
                }`}
            >
                {item.name}
            </span>
            <span className={`w-[15%]`}>{getShortDurationFormat(item.duration)}</span>
            {/* <time>{getTimeFormat(item.dateTime)}</time> */}
            <time className={`w-[35%]`}>{upcomingItemDateTimeFormat(item.dateTime)}</time>
            <span
                className={`inline-block mr-2 text-2xl text-amber-300/90 hover:text-amber-500/90`}
            >
                {importanceIcon}
            </span>
        </li>
    );
};

export default UpcomingItemCard;
